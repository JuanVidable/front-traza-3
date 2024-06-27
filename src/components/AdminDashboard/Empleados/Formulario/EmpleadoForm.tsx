import { Typography } from "@mui/material"
import { Button, Form, Row, Col } from "react-bootstrap"
import { LoaderFunction, useLoaderData, useNavigate } from "react-router"
import { EmpleadoService } from "../../../../services/EmpleadoService"
import { Empleado, EmpleadoCreate } from "../../../../types/Empresas/Empleado";
import { Rol } from "../../../../types/Usuario";
import { useFormik } from "formik";
import * as Yup from "yup"
import Swal from "sweetalert2";
import styles from "../../../../styles/ProductForm.module.css"
import { empleadoVacio, imagenVacia } from "../../../../types/TiposVacios";
import { BotonVolver } from "../../../Botones/BotonVolver";
import { useAppSelector } from "../../../../hooks/redux";
import { Sucursal } from "../../../../types/Empresas/Sucursal";
import { useEffect } from "react";
import { ModuloUnaImagen } from "../../../ModuloImagenes copy/ModuloUnaImagen";
import { useOneImage } from "../../../../hooks/useOneImage";
import { IImagen } from "../../../../types/Articulos/ImagenArticulo";

export const EmpleadoForm = () => {
  const navigate = useNavigate();   //hook para navegar entre rutas
  const img = useOneImage();

  const service: EmpleadoService = new EmpleadoService();   //servicio para interactuar con la api
  const empleadoSeleccionado = useLoaderData() as Empleado;   //datos elegidos de la tabla para rellenar el form
  //sucursal actual
  const sucursal: Sucursal | null = useAppSelector((state) => (state.sucursalReducer.sucursal));

  useEffect(() => {
    setImagesConfig();
  }, [])

  const setImagesConfig = async () => {
    img.setObjUrl("images");
    if(empleadoSeleccionado.imagenPersona) img.addToShowImage(empleadoSeleccionado.imagenPersona);
    else img.addToShowImage(imagenVacia);
  };

  //Esquemas de validacion para formik
  const EMAIL_REGX: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
  const usuarioValidationSchema = Yup.object().shape({
    auth0Id: Yup.string().required("Ingrese la id de auth0 del usuario"),
    username: Yup.string().required("Ingrese un nombre de usuario"),
    email: Yup.string().required("Ingrese una dirección de correo electrónico").matches(EMAIL_REGX, "Dirección de correo inválida"),
    rol: Yup.mixed<Rol>().oneOf(Object.values(Rol)).required("Seleccione un rol")
  });

  const today: Date = new Date();
  today.setHours(0,0,0,0);
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("Ingrese el nombre"),
    apellido: Yup.string().required("Ingrese el apellido"),
    telefono: Yup.number().required("Ingrese el telefono").moreThan(0, "Telefono no válido"),
    fechaNacimiento: Yup.date().required("Ingrese la fecha de nacimiento")
      .max(today, "Ingrese una fecha de nacimiento válida"),
    usuario: usuarioValidationSchema
    //sucursal
  });

  //configuracion de formik
  const formik: any = useFormik({
    initialValues: empleadoSeleccionado,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let newEmpleado = values;
      let newImage: IImagen = imagenVacia;

      try {
        let newUrl: string = "";
        img.uploadOneImage().then((data) => {
          if(data) newUrl = data;
        });

        newImage.url = newUrl;
        newImage.name = `${values.id}-${values.apellido}`;
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
      let imagen: IImagen = imagenVacia;
      if(newImage) {
        imagen = newImage;
      } else {
        if(values.imagenPersona) imagen = values.imagenPersona;
      }
      
      if(sucursal!=null) {
        let empleadoCreate: EmpleadoCreate = {
          id: values.id,
          eliminado: values.eliminado,
          nombre: values.nombre,
          apellido: values.apellido,
          telefono: values.telefono,
          imagenPersona: imagen,
          fechaNacimiento: values.fechaNacimiento,
          usuario: values.usuario,
          idSucursal: sucursal.id
        }
        newEmpleado = await service.create(empleadoCreate);
      }

      navigate(-1);
    }
  });

  return (
    <div className={styles.mainBox}>
      <div className={styles.headerBox + " mb-3"}>
        <Typography variant="h5" gutterBottom>
            {`${empleadoSeleccionado.id!=0 ? "Editar" : "Crear"} un empleado`}
        </Typography>
        <BotonVolver/>
      </div>
      <div className={styles.formBox}>
        <Form onSubmit={formik.handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Datos Personales
          </Typography>
          <Form.Group as={Row} className="mb-2" controlId="nombre">
            <Form.Label column sm={2}>Nombre: </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="nombre"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.nombre && formik.errors.nombre ?
            (<div className="text-danger"> {formik.errors.nombre} </div>) : null
          }

          <Form.Group as={Row} className="mb-2" controlId="apellido">
            <Form.Label column sm={2}>Apellido: </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="apellido"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.apellido}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.apellido && formik.errors.apellido ?
            (<div className="text-danger"> {formik.errors.apellido} </div>) : null
          }

          <Form.Group as={Row} className="mb-2" controlId="telefono">
            <Form.Label column sm={2}>Teléfono: </Form.Label>
            <Col sm={10}>
              <Form.Control 
                type="number"
                name="telefono"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.telefono}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.telefono && formik.errors.telefono ?
            (<p className="text-danger"> {formik.errors.telefono} </p>) : null
          }

          <Form.Group as={Row} className="mb-3" controlId="fechaNacimiento">
            <Form.Label column sm={2}>Fecha de Nacimiento: </Form.Label>
            <Col sm={10}>
            <Form.Control
                type="date"
                name="fechaNacimiento"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.fechaNacimiento}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.fechaNacimiento && formik.errors.fechaNacimiento ?
            (<p className="text-danger"> {formik.errors.fechaNacimiento} </p>) : null
          }

          <Typography variant="h6" gutterBottom>
            Imagen
          </Typography>

          <ModuloUnaImagen/>

          <Typography variant="h6" gutterBottom>
            Datos de Usuario
          </Typography>
          <Form.Group as={Row} className="mb-2" controlId="usuario.username">
            <Form.Label column sm={2}>Nombre de usuario:</Form.Label>
            <Col>
              <Form.Control 
                type="text"
                name="usuario.username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.usuario.username}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.usuario && formik.errors.usuario ?
            (<p className="text-danger"> {formik.errors.usuario.username} </p>) : null
          }

          <Form.Group as={Row} className="mb-2" controlId="usuario.email">
            <Form.Label column sm={2}>Dirección de correo electrónico:</Form.Label>
            <Col>
              <Form.Control 
                type="email"
                name="usuario.email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.usuario.email}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.usuario && formik.errors.usuario ?
            (<p className="text-danger"> {formik.errors.usuario.email} </p>) : null
          }

          <Form.Group as={Row} className="mb-2" controlId="usuario.auth0Id">
            <Form.Label column sm={2}>ID de Auth0:</Form.Label>
            <Col>
              <Form.Control 
                type="text"
                name="usuario.auth0Id"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.usuario.auth0Id}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.usuario && formik.errors.usuario ?
            (<p className="text-danger"> {formik.errors.usuario.auth0Id} </p>) : null
          }

          <Form.Group as={Row} className="mb-2" controlId="usuario.rol">
            <Form.Label column sm={2}>Rol:</Form.Label>
            <Col>
              <Form.Select
                name="usuario.rol"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.usuario.rol}
              >
                <option value="NO_ROL">Seleccione un rol</option>
                <option value={Rol.GERENTE}>Gerente</option>
                <option value={Rol.COCINERO}>Cocinero</option>
                <option value={Rol.CAJERO}>Cajero</option>
                <option value={Rol.DELIVERY}>Delivery</option>
              </Form.Select>
            </Col>
          </Form.Group>
          {
            formik.touched.usuario && formik.errors.usuario ?
            (<p className="text-danger"> {formik.errors.usuario.rol} </p>) : null
          }

          <Button type="submit">GUARDAR</Button>
        </Form>
      </div>
    </div>
  )
}

type ReferralParams = {
    id?: string;
  };
  
export const empleadoLoader: LoaderFunction = async ({params}) => {
    const { id } = params as ReferralParams;
    const service = new EmpleadoService();
  
    if(id) {  //si recibo una id de la url, cargo desde la api
      var res = await service.getById(Number(id));
      if(res!=undefined) return res;
      else return empleadoVacio;
    } else {  //sino devuelvo el empleado vacio
      return empleadoVacio;
    }
};
