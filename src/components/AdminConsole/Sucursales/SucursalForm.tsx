import { FC, useEffect, useState } from "react";
import { Sucursal } from "../../../types/Empresas/Sucursal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Typography } from "@mui/material";
import { Pais } from "../../../types/Domicilio/Pais";
import { PaisService } from "../../../services/PaisService";
import { Provincia } from "../../../types/Domicilio/Provincia";
import { ProvinciaService } from "../../../services/ProvinciaService";
import { Localidad } from "../../../types/Domicilio/Localidad";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Empresa } from "../../../types/Empresas/Empresa";
import { LocalidadService } from "../../../services/LocalidadService";


interface IPropsSucursalForm {
    saveChanges: (suc: Sucursal) => void;
    sucursal: Sucursal;
    tieneCasaMatriz: boolean
}

const domicilioSchema = Yup.object().shape({
    calle: Yup.string().required('La calle es obligatoria'),
    numero: Yup.number().required('El número es obligatorio').positive('El número debe ser positivo'),
    cp: Yup.number().required('El código postal es obligatorio').positive('El código postal debe ser positivo'),
    piso: Yup.number().min(0, 'El piso debe ser positivo'),
    nroDpto: Yup.number().min(0, 'El número de departamento debe ser positivo'),
    localidad: Yup.object().shape({
        id: Yup.string().required('Debe seleccionar una localidad'),
        provincia: Yup.object().shape({
            id: Yup.string().required('Debe seleccionar una provincia'),
            pais: Yup.object().shape({
                id: Yup.string().required('Debe seleccionar un país'),
            })
        })
    })
});

const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre de la sucursal es obligatorio'),
    horarioApertura: Yup.string().required('El horario de apertura es obligatorio'),
    horarioCierre: Yup.string().required('El horario de cierre es obligatorio'),
    domicilio: domicilioSchema
});





export const SucursalForm: FC<IPropsSucursalForm> = ({ saveChanges, sucursal, tieneCasaMatriz }) => {

    const [empresa, setEmpresa] = useState<Empresa>();

    const emp = useSelector((state: RootState) => state.empresaReducer.empresa);

    const formik = useFormik({
        initialValues: sucursal,
        validationSchema: validationSchema,

        onSubmit: (values) => {
            //manejar valores y armar objetos internos
            const paisEncontrado = paises.find((p) => p.id === parseInt(paisSelected));
            const provinciaEncontrada = provincias.find((pr) => pr.id === parseInt(provinciaSelected));
            const localidadEncontrada = localidades.find((l) => l.id === parseInt(localidadSelected));

            if (paisEncontrado && provinciaEncontrada && localidadEncontrada) {
                values.domicilio.localidad.provincia.pais = paisEncontrado;
                values.domicilio.localidad.provincia = provinciaEncontrada;
                values.domicilio.localidad = localidadEncontrada;
            } else {
                alert("Debes completar la dirección.");
                return;
            }

            //agregar empresa
            if (empresa) values.empresa = empresa;

            saveChanges(values);
        }
    });

    const [paises, setPaises] = useState<Pais[]>([]);
    const [paisSelected, setPaisSelected] = useState('');

    const [provincias, setProvincias] = useState<Provincia[]>([]);
    const [provinciaSelected, setProvinciaSelected] = useState('');


    const [localidades, setLocalidades] = useState<Localidad[]>([]);
    const [localidadSelected, setLocalidadSelected] = useState('');

    const paisesLoader = async () => {
        const service: PaisService = new PaisService();
        return service.getAll();
    }      

    const getProvinciasPorPaisId = async (idPais: number) => {
        const service: ProvinciaService = new ProvinciaService();
        return service.findByPaisId(idPais);
    };

    const getLocalidadesPorProvinciaId = async (idProvincia: number) => {
        const service: LocalidadService = new LocalidadService();
        return service.findByProvinciaId(idProvincia);
    };

    useEffect(() => {
        if (emp) {
            setEmpresa(emp);
        }
    }, [emp]);

    useEffect(() => {
        const loadPaises = async () => {
            const paises = await paisesLoader();
            setPaises(paises);
        };
        loadPaises();

        setPaisSelected(sucursal.domicilio.localidad.provincia.pais.id.toString());

    }, [sucursal]);


    useEffect(() => {
        if (paisSelected) {
            const loadProvincias = async () => {
                const provincias = await getProvinciasPorPaisId(parseInt(paisSelected));
                setProvincias(provincias);
            };
            loadProvincias();

            setProvinciaSelected(sucursal.domicilio.localidad.provincia.id.toString());
        }
    }, [paisSelected, sucursal]);


    useEffect(() => {
        if (provinciaSelected) {

            const loadLocalidades = async () => {
                const localidades = await getLocalidadesPorProvinciaId(parseInt(provinciaSelected));
                setLocalidades(localidades);
            };
            loadLocalidades();

            setLocalidadSelected(sucursal.domicilio.localidad.id.toString());
        }
    }, [provinciaSelected, sucursal]);

    const handlePaisChange = async (event: { target: { value: any; }; }) => {
        const selectedPaisId = event.target.value;
        const selectedPais = paises.find((p) => p.id == selectedPaisId);
        if (selectedPais && selectedPais.nombre) {
            sucursal.domicilio.localidad.provincia.pais = selectedPais;

            setPaisSelected(sucursal.domicilio.localidad.provincia.pais.id.toString());
            const prov: Provincia[] = await getProvinciasPorPaisId(selectedPais.id);
            setProvincias(prov);

        }
    }


    const handleProvinciaChange = async (event: { target: { value: any; }; }) => {
        const selectedProvinciaId = event.target.value;
        const selectedProvincia = provincias.find((p) => p.id == selectedProvinciaId);
        if (selectedProvincia && selectedProvincia.nombre) {
            sucursal.domicilio.localidad.provincia = selectedProvincia;

            setProvinciaSelected(sucursal.domicilio.localidad.provincia.id.toString());
            const loc = await getLocalidadesPorProvinciaId(selectedProvincia.id);
            setLocalidades(loc);

        }
    }

    const handleLocalidadChange = async (event: { target: { value: any; }; }) => {
        const selectedLocalidadId = event.target.value;
        const selectedLocalidad = localidades.find((l) => l.id == selectedLocalidadId);
        if (selectedLocalidad && selectedLocalidad.nombre) {
            sucursal.domicilio.localidad = selectedLocalidad;

            setLocalidadSelected(sucursal.domicilio.localidad.id.toString());
        }
    }

    return (
        <div>
            <Form onSubmit={formik.handleSubmit} className="empresa-form">
                <Form.Group as={Row} className="mb-2" controlId="nombre">
                    <Form.Label column sm={2}>Nombre: </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="nombre"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            defaultValue={formik.values.nombre}
                        />
                        {formik.touched.nombre && formik.errors.nombre ?
                            (<div className="text-danger"> {formik.errors.nombre} </div>)
                            : null
                        }
                    </Col>
                </Form.Group>

                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="horarioApertura">
                        <Form.Label>Horario Apertura: </Form.Label>
                        <Form.Control
                            type="time"
                            name="horarioApertura"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            defaultValue={formik.values.horarioApertura}
                        />
                    </Form.Group>
                    {formik.touched.horarioApertura && formik.errors.horarioApertura ?
                        (<div className="text-danger"> {formik.errors.horarioApertura} </div>)
                        : null
                    }
                    <Form.Group as={Col} className="mb-3" controlId="horarioCierre">
                        <Form.Label>Horario Cierre: </Form.Label>
                        <Form.Control
                            type="time"
                            name="horarioCierre"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            defaultValue={String(formik.values.horarioCierre)}
                        />
                        {formik.touched.horarioCierre && formik.errors.horarioCierre ?
                            (<div className="text-danger"> {formik.errors.horarioCierre} </div>)
                            : null
                        }
                    </Form.Group>
                </Row>

                {
                    !tieneCasaMatriz || (tieneCasaMatriz && sucursal.esCasaMatriz) ? (
                        <Row>
                            <Form.Group as={Col} controlId="esCasaMatriz">
                                <Form.Check
                                    type="checkbox"
                                    label="Es Casa Matriz"
                                    name="esCasaMatriz"
                                    checked={formik.values.esCasaMatriz}
                                    onChange={formik.handleChange}
                                //onChange={handleCasaMatrizChange}
                                />
                            </Form.Group>
                        </Row>
                    ) : null
                }

                <Typography variant="h6" gutterBottom>
                    Domicilio
                </Typography>
                <Form.Group as={Row} className="mb-2" controlId="domicilio.calle">
                    <Form.Label column sx={2}>Calle: </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="domicilio.calle"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            defaultValue={formik.values.domicilio.calle}
                        />
                    </Col>
                    {formik.touched.domicilio?.calle && formik.errors.domicilio?.calle ?
                        (<div className="text-danger"> {formik.errors.domicilio?.calle} </div>)
                        : null
                    }
                </Form.Group>

                <Row>
                    <Form.Group as={Col} className="mb-2" controlId="domicilio.numero">
                        <Form.Label>Número: </Form.Label>
                        <Form.Control
                            type="text"
                            name="domicilio.numero"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            defaultValue={formik.values.domicilio.numero}
                        />
                    </Form.Group>
                    {formik.touched.domicilio?.numero && formik.errors.domicilio?.numero ?
                        (<div className="text-danger"> {formik.errors.domicilio.numero} </div>)
                        : null
                    }
                    <Form.Group as={Col} className="mb-2" controlId="domicilio.cp">
                        <Form.Label>Código Postal: </Form.Label>
                        <Form.Control
                            type="text"
                            name="domicilio.cp"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            defaultValue={String(formik.values.domicilio.cp)}
                        />
                        {formik.touched.domicilio?.cp && formik.errors.domicilio?.cp ?
                            (<div className="text-danger"> {formik.errors.domicilio.cp} </div>)
                            : null
                        }
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} className="mb-2" controlId="domicilio.piso">
                        <Form.Label>Piso: </Form.Label>
                        <Form.Control
                            type="text"
                            name="domicilio.piso"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            defaultValue={String(formik.values.domicilio.piso)}
                        />
                        {formik.touched.domicilio?.piso && formik.errors.domicilio?.piso ?
                            (<div className="text-danger"> {formik.errors.domicilio.piso} </div>)
                            : null
                        }
                    </Form.Group>
                    <Form.Group as={Col} className="mb-2" controlId="domicilio.nroDpto">
                        <Form.Label>Número de dpto: </Form.Label>
                        <Form.Control
                            type="text"
                            name="domicilio.nroDpto"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            defaultValue={formik.values.domicilio.nroDpto}
                        />
                    </Form.Group>
                    {formik.touched.domicilio?.nroDpto && formik.errors.domicilio?.nroDpto ?
                        (<div className="text-danger"> {formik.errors.domicilio.nroDpto} </div>)
                        : null
                    }
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="domicilio.localidad.provincia.pais.id">
                        <Form.Label>País</Form.Label>
                        <Form.Select name="domicilio.localidad.provincia.pais.id" value={paisSelected} onChange={handlePaisChange}>
                            <option value="0">Elija un país</option>
                            {paises.map((pais) => (
                                <option key={pais.id} value={pais.id}>
                                    {pais.nombre}
                                </option>
                            ))}
                        </Form.Select>
                        {formik.touched.domicilio?.localidad?.provincia?.pais?.id && formik.errors.domicilio?.localidad?.provincia?.pais?.id ?
                            (<div className="text-danger"> {formik.errors.domicilio?.localidad?.provincia?.pais?.id} </div>)
                            : null
                        }

                    </Form.Group>
                    <Form.Group as={Col} controlId="domicilio.localidad.provincia.id">
                        <Form.Label>Provincia</Form.Label>
                        <Form.Select name="domicilio.localidad.provincia.id" value={provinciaSelected} onChange={handleProvinciaChange}>
                            <option value="0">Elija una provincia</option>
                            {provincias.map((provincia) => (
                                <option key={provincia.id} value={provincia.id}>
                                    {provincia.nombre}
                                </option>
                            ))}
                        </Form.Select>
                        {formik.touched.domicilio?.localidad?.provincia?.id && formik.errors.domicilio?.localidad?.provincia?.id ?
                            (<div className="text-danger"> {formik.errors.domicilio?.localidad?.provincia?.id} </div>)
                            : null
                        }
                    </Form.Group>
                    <Form.Group as={Col} controlId="domicilio.localidad.id">
                        <Form.Label name="localidad">Localidad</Form.Label>
                        <Form.Select name="domicilio.localidad.id" value={localidadSelected} onChange={handleLocalidadChange}>
                            <option value="0">Elija una localidad</option>
                            {localidades.map((localidad) => (
                                <option key={localidad.id} value={localidad.id}>
                                    {localidad.nombre}
                                </option>
                            ))}
                        </Form.Select>
                        {formik.touched.domicilio?.localidad?.id && formik.errors.domicilio?.localidad?.id ?
                            (<div className="text-danger"> {formik.errors.domicilio?.localidad?.id} </div>)
                            : null
                        }
                    </Form.Group>
                </Row>
                <Button type="submit" className="save-button" >GUARDAR</Button>
            </Form>
        </div>
    )
}