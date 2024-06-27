import { LoaderFunction, useLoaderData, useNavigate } from "react-router";
import { Promocion, PromocionCreate, TipoPromocion } from "../../../../types/Articulos/Promocion";
import { useFormik } from "formik";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { Typography, IconButton } from "@mui/material";
import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import styles from "../../../../styles/ProductForm.module.css"
import * as Yup from "yup"
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { PromocionDetalle, PromocionDetalleCreate } from "../../../../types/Articulos/PromocionDetalle";
import { PromocionService } from "../../../../services/PromocionService";
import { PromocionDetalleClass } from "../../../../types/Articulos/PromocionDetalle";
import { ArticulosModal } from "../ArticulosModal/ArticulosModal";
import { promocionVacia } from "../../../../types/TiposVacios";
import { BotonVolver } from "../../../Botones/BotonVolver";
import { Articulo } from "../../../../types/Articulos/Articulo";
import { ArticuloInsumoService } from "../../../../services/ArticuloInsumoService";
import { ArticuloManufacturadoService } from "../../../../services/ArticuloManufacturadoService";
import { useAppSelector } from "../../../../hooks/redux";
import { Sucursal } from "../../../../types/Empresas/Sucursal";
import { SucursalService } from "../../../../services/SucursalService";
import formatPrice from "../../../../types/formats/priceFormat";
import { ModuloImagenes } from "../../../ModuloImagenes copy/ModuloImagenes";
import { useImage } from "../../../../hooks/useImage";

export const PromocionForm = () => {
  const navigate = useNavigate();
  const img = useImage();

  const service = new PromocionService();
  const idSucursal = useAppSelector((state) => (state.sucursalReducer.sucursal?.id));
  const idEmpresa = useAppSelector((state) => (state.empresaReducer.empresa?.id));
  const promocionSeleccionada = useLoaderData() as Promocion; //promocion seleccionada para editar

  const [promocion, setPromocion] = useState<Promocion>(promocionVacia);
  const [tipoPromo, setTipoPromo] = useState<boolean>(false); //manejar los cambios en tipo de promocion

  //estados para manejar los detalles de promoción
  const [showModal, setShowModal] = useState<boolean>(false);
  const [detalles, setDetalles] = useState<PromocionDetalle[]>(promocionSeleccionada.promocionDetalles);
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [idSucursales, setIdSucursales] = useState<number[]>([]);
  
  //cargo los estados cuando cargo el componente
  useEffect(() => {
    setPromocion(promocionSeleccionada);
    setDetalles(promocionSeleccionada.promocionDetalles);
    if(promocionSeleccionada.tipoPromocion=="HAPPY_HOUR") setTipoPromo(true);
    
    if(promocionSeleccionada.sucursales){ 
      let ids: number[] =[];
      promocionSeleccionada.sucursales?.forEach((existente: Sucursal) => {
        ids.push(existente.id);
      });
      setIdSucursales(ids);
    }

    setImagesConfig();
  }, []);

  //traigo todas las sucursales de la empresa
  useEffect(() => {
    if (idEmpresa){
      let sucursalService = new SucursalService();
      sucursalService.findByEmpresaId(idEmpresa).then((data) => {
        setSucursales(data);
      });
    } 
  }, [idEmpresa]);

  //cargo los articulos según los que ya estén en el producto
  useEffect(() => {
    actualizarArticulos();
  }, [detalles]);

  const setImagesConfig = async () => {
    img.setObjUrl("promociones");
    if(promocionSeleccionada.imagenes) img.addToShowImages(promocionSeleccionada.imagenes);
    else img.addToShowImages([]);
  };

  //funcion para actualizar los articulos que se van a mostrar en la ventana modal
  const actualizarArticulos = async () => {
    if(idSucursal) {
      //con el servicio de Articulo insumo obtengo todos los insumos para elaborar
      let serviceInsumo = new ArticuloInsumoService();
      let listaInsumos = await serviceInsumo.getAllParaVender(idEmpresa) as Articulo[];

      //con el servicio de Articulo manufacturado obtengo los manufactuados
      let serviceManufacturado = new ArticuloManufacturadoService();
      let listaManufacturados = await serviceManufacturado.getAllBySucursalId(idEmpresa) as Articulo[];

      let listaArticulos: Articulo[] = listaInsumos.concat(listaManufacturados);
      
      //si existen detalles elimino los articulos de detalles de la lista
      if(detalles.length != 0) {
        let existentes: Articulo[] = [];

        detalles.forEach((detalle: PromocionDetalle) => {
          listaArticulos.forEach((art: Articulo) => {
            if(detalle.articulo.id == art.id) {
              existentes.push(art);
            }
          });
        });

        listaArticulos = listaArticulos.filter( ( art ) => {
          return existentes.indexOf( art ) < 0;
        } );
      } 

      //seteo articulos con la lista
      setArticulos(listaArticulos);
    }
  };

  //funcion para manejar el cambio en el input de cantidad
  const handleChangeAmount = (amount: any, detalle: PromocionDetalle) => {
    try {
      if (amount > 0) {
        //busco el detalle en el arreglo
        var arrayAux: PromocionDetalle[] = detalles.slice();

        var f: number = 0;
        var found = arrayAux.some(function (element, index) {
          f = index; return element.articulo === detalle.articulo;
        });
        //lo  obtengo del arreglo
        if (found) {
          let aux: PromocionDetalle = detalle;
          let newDetalle = arrayAux.splice(f, 1);

          newDetalle.forEach((item) => {
            aux = PromocionDetalleClass.createFrom(aux, item);
          });
          aux.cantidad = Number(amount);

          arrayAux.splice(f, 0, aux);
          setDetalles(arrayAux);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //funcion para manejar la eliminacion de un articulo
  const handleDeleteArticulo = (detalle: PromocionDetalle) => {
    var arrayAux: PromocionDetalle[] = detalles.slice();
    var f: number = 0;
    var found = arrayAux.some(function (element, index) {
      f = index; return element.articulo === detalle.articulo;
    });
    if (found) {
      arrayAux.splice(f, 1);
      setDetalles(arrayAux);
    }
  };

  //funcion para manejar el cambio del radio button de tipo de promocion
  const handleChangeTipoPromo = (value: string) => {
    if(value=="HAPPY_HOUR"){
      setTipoPromo(true);
    } else {
      setTipoPromo(false);
    }
  };

  const handleChangeSucursales = (value: string, checked: boolean) => {
    if(value=="all"){
      if(checked){
        let idsAux: number[] = [];
        sucursales.forEach((sucursal: Sucursal) => {
          idsAux.push(sucursal.id);
        });
        setIdSucursales(idsAux);
      } else {
        setIdSucursales([]);
      }
    } else {
      if(checked) {
        let idsAux: number[] = idSucursales.slice();
        idsAux.push(Number(value));
        setIdSucursales(idsAux);
      } else {
        let idsAux: number[] = idSucursales.slice();
        const index = idsAux.indexOf(Number(value), 0);
        if (index > -1) {
          idsAux.splice(index, 1);
        }
        setIdSucursales(idsAux);
      }
    }
  };

  const actualDate: Date = new Date();
  actualDate.setHours(0,0,0,0);

  const validationSchema = Yup.object().shape({
    denominacion: Yup.string().required("Ingrese una denominación"),
    descripcionDescuento: Yup.string().required("Ingrese una descripción"),
    fechaDesde: Yup.date().required("Ingrese la fecha de inicio de la promoción")
      .min(actualDate, "La fecha no puede ser anterior al día de hoy.")
		  .max(
	  		Yup.ref("fechaHasta"),
				"La fecha desde debe ser anterior a la fecha de finalización."
			),
    fechaHasta: Yup.date().required("Ingrese la fecha de finalización de la promoción")
      .min(
        Yup.ref("fechaDesde"),
        "La fecha hasta debe ser posterior a la fecha de inicio."
      ),
    horaDesde: Yup.string().required("Ingrese la hora de inicio de la promoción"),
    horaHasta: Yup.string().required("Ingrese la hora de finalización de la promoción"),
    precioPromocional: Yup.number().moreThan(0,"El precio debe ser un valor positivo").required("Ingrese un precio")
  });
  
  //fornmik para manjear el formulario
  const formik: any = useFormik({
    initialValues: promocionSeleccionada,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //validar detalles
      if(detalles.length==0){
        Swal.fire({
          title: "La promoción no tiene detalles",
          text: "Ingrese articulos a la promoción",
          icon: "warning"
        })
        return;
      }

      let newTipoPromocion: TipoPromocion;
      if(tipoPromo){
        newTipoPromocion = TipoPromocion.HAPPY_HOUR;
      } else {
        newTipoPromocion = TipoPromocion.PROMOCION;
      }

      let newDetalles: PromocionDetalleCreate[] = PromocionDetalleClass.transform(detalles);

      let newPromocion: PromocionCreate = {
        id: values.id,
        eliminado: false,
        denominacion: values.denominacion,
        fechaDesde: values.fechaDesde,
        fechaHasta: values.fechaHasta,
        habilitado: true,
        precioPromocional: values.precioPromocional,
        descripcionDescuento: values.descripcionDescuento,
        horaDesde: values.horaDesde,
        horaHasta: values.horaHasta,
        tipoPromocion: newTipoPromocion,
        promocionDetalles: newDetalles,
        idsSucursales: idSucursales
      }

      let response = await service.create(newPromocion);

      try {
        img.uploadImages(response.id);
        //img.reset();
      } catch (error) {
        //Mostrar mensaje de error si ocurre una exepcion
        Swal.fire({
          title: "Error",
          text: "Algo falló al intentar subir las imágenes",
          icon: "error"
        });
        console.log("Error: ", error);
        return;
      }

      navigate(-1)
    }
  });

  return (
    <div className={styles.mainBox + " mt-4"}>

      <div className={styles.headerBox + " mb-3"}>
        <Typography variant="h5" gutterBottom>
          {`${promocion?.id!=0 ? "Editar" : "Crear"} una promoción`}
        </Typography>
        <BotonVolver/>
      </div>

      <div  className={styles.formBox}>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group as={Row} className="mb-2" controlId="denominacion">
            <Form.Label column sm={2}>Denominación: </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="denominacion"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.denominacion}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.denominacion && formik.errors.denominacion ?
            (<div className="text-danger"> {formik.errors.denominacion} </div>) : null
          }

          <Form.Group as={Row} className="mb-2">
            <Form.Label as={Col}>Tipo de Promoción: </Form.Label>
            <Row>
              <Col sm={1}></Col>
              <Col>
                <Form.Check
                  type="radio"
                  name="HAPPY_HOUR"
                  radioGroup="tipoPromocion"
                  value="HAPPY_HOUR"
                  onChange={(e) => handleChangeTipoPromo(e.target.value)}
                  checked={tipoPromo}
                  label="Happy Hour"
                />
              </Col>
            </Row>
            <Row>
              <Col sm={1}></Col>
              <Col>
                <Form.Check
                  type="radio"
                  name="PROMOCION"
                  radioGroup="tipoPromocion"
                  value="PROMOCION"
                  onChange={(e) => handleChangeTipoPromo(e.target.value)}
                  checked={!tipoPromo}
                  label="Promoción"
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group as={Row} className="mb-2" controlId="descripcionDescuento">
            <Form.Label column sm={2}>Descripción: </Form.Label>
            <Col sm={10}>  
              <Form.Control
                as="textarea"
                name="descripcionDescuento"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.descripcionDescuento}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.descripcionDescuento && formik.errors.descripcionDescuento ?
            (<div className="text-danger"> {formik.errors.descripcionDescuento} </div>) : null
          }

          <Form.Group as={Row} className="mb-2" controlId="precioPromocional">
            <Form.Label column sm={2}>Precio Venta: </Form.Label>
              <Col sm={10}>
                <Form.Control 
                  type="number"
                  name="precioPromocional"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.precioPromocional}
                />
              </Col>
          </Form.Group>
          {
            formik.touched.precioPromocional && formik.errors.precioPromocional ?
            (<p className="text-danger"> {formik.errors.precioPromocional} </p>) : null
          }
          <hr/>

          <Typography variant="h6" gutterBottom>
            Inicio de promoción
          </Typography>
          <Row>
            <Form.Group as={Col} className="mb-2" controlId="fechaDesde">
              <Form.Label>Fecha: </Form.Label>
              <Form.Control
                type="date"
                name="fechaDesde"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.fechaDesde}
              />
            </Form.Group>
            {formik.touched.fechaDesde && formik.errors.fechaDesde ?
              (<Col className="text-danger"> {formik.errors.fechaDesde} </Col>)
              : null
            }
            <Form.Group as={Col} className="mb-2" controlId="horaDesde">
              <Form.Label>Hora: </Form.Label>
              <Form.Control
                type="time"
                name="horaDesde"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.horaDesde}
              />
            </Form.Group>
            {formik.touched.horaDesde && formik.errors.horaDesde ?
              (<Col className="text-danger"> {formik.errors.horaDesde} </Col>)
              : null
            }
          </Row>
          <hr/>

          <Typography variant="h6" gutterBottom>
            Fin de promoción
          </Typography>
          <Row>
            <Form.Group as={Col} className="mb-2" controlId="fechaHasta">
              <Form.Label>Fecha: </Form.Label>
              <Form.Control
                type="date"
                name="fechaHasta"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.fechaHasta}
              />
            </Form.Group>
            {formik.touched.fechaHasta && formik.errors.fechaHasta ?
              (<Col className="text-danger"> {formik.errors.fechaHasta} </Col>)
              : null
            }
            <Form.Group as={Col} className="mb-2" controlId="horaHasta">
              <Form.Label>Hora: </Form.Label>
              <Form.Control
                type="time"
                name="horaHasta"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.horaHasta}
              />
            </Form.Group>
            {formik.touched.horaHasta && formik.errors.horaHasta ?
              (<Col className="text-danger"> {formik.errors.horaHasta} </Col>)
              : null
            }
          </Row>
          <hr/>

          <Typography variant="h6" gutterBottom>
            Imágenes
          </Typography>
          <ModuloImagenes></ModuloImagenes>
          <hr/>

          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm={2}>
              <Typography variant="h6" gutterBottom>
                Articulos
              </Typography>
            </Form.Label>
            <Col sm={3}>
              <Button type="button" className={styles.btnAdd} onClick={() => { setShowModal(true) }} >Añadir</Button>
            </Col>
          </Form.Group>

          <Container>
            {
              detalles?.map((detalle: PromocionDetalle, index: number) => 
                <Row key={index} className={styles.detalleRow + " mb-3"}>
                  <Col>
                    {detalle.articulo.denominacion}
                  </Col>
                  <Col>
                    <Form.Control className="mb-3" type="number" onChange={(e) => handleChangeAmount(e.target.value, detalle)}></Form.Control>
                  </Col>
                  <Col>
                    {detalle.cantidad} {detalle.articulo.unidadMedida.denominacion}
                  </Col>
                  <Col>
                    {formatPrice(detalle.articulo.precioVenta*detalle.cantidad)}
                  </Col>
                  <Col>
                    <IconButton className="mb-3" onClick={() => { handleDeleteArticulo(detalle) }}>
                      <CIcon icon={cilTrash} size="lg"></CIcon>
                    </IconButton>
                  </Col>
                </Row>
              )
            }
          </Container>

          <Typography variant="h6" gutterBottom>
            Sucursales
          </Typography>

          <Form.Group as={Row} className="mb-1">
            <Row>
              <Col sm={1}></Col>
              <Col sm={1}>
                <Form.Check 
                  radioGroup="seleccionados"
                  label="Todas"
                  value="all"
                  onChange={(e) => handleChangeSucursales(e.target.value, e.target.checked)}
                />
              </Col>
            </Row>
            {
              sucursales? sucursales.map((sucursal: Sucursal, index: number) =>
                <Row key={index}>
                  <Col sm={1}></Col>
                  <Col>
                    <Form.Check 
                      radioGroup="seleccionados"
                      label={sucursal.nombre}
                      value={String(sucursal.id)}
                      checked={idSucursales.some(id => id === sucursal.id)}
                      onChange={(e) => handleChangeSucursales(e.target.value, e.target.checked)}
                    />
                  </Col>  
                </Row>
              )
              : null
            }
          </Form.Group>

          <Button type="submit">GUARDAR</Button>
        </Form>
        <ArticulosModal
          show={showModal}
          close={() => {setShowModal(false)}}
          add={(array: PromocionDetalle[]) => setDetalles(array)}
          options={articulos}
          array={detalles}
        />
      </div>

    </div>
  )
}

type ReferralType = {
    id?: string
}

export const promocionLoader: LoaderFunction = async ({params}) => {
    const { id } = params as ReferralType;

    if(id) {
      let service = new PromocionService();
      let promocion: Promocion | undefined = await service.getById(Number(id));
      if(promocion) return promocion;
      else return promocionVacia;
    } else {
      return promocionVacia;
    }
}