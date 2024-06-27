import { Typography } from "@mui/material"
import { BotonVolver } from "../../Botones/BotonVolver"
import styles from "../../../styles/ProductForm.module.css"
import { LoaderFunction, useLoaderData, useNavigate } from "react-router"
import { Form, Row, Col, Button } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import { stockShortVacio } from "../../../types/TiposVacios"
import { StockService } from "../../../services/StockService"
import { Stock, StockShort } from "../../../types/Articulos/Stock"

//esquema de validacion para formik
const validationSchema = Yup.object().shape({
  stockActual: Yup.number().required("Ingrese el stock actual")
    .max(
      Yup.ref("stockMaximo"),
      "El stock actual debe ser menor al stock máximo"
    ),
  stockMaximo: Yup.number().required("Ingrese el stock máximo")
    .moreThan(
      Yup.ref("stockMinimo"),
      "El stock máximo debe ser mayor al stock mínimo"
    ),
  stockMinimo: Yup.number().required("Ingrese el stock mínimo")
    .moreThan(0, "El stock mínimo debe ser mayor a 0")
});

export const StockForm = () => {
  const stockSeleccionado: StockShort = useLoaderData() as StockShort;  //datos seleccionados para editar
  const service: StockService = new StockService(); //servicio para interactuar con la api
  const navigate = useNavigate();   //hook para navegar entre rutas

  //configuracion de formik para el formulario
  const formik: any = useFormik({
    initialValues: stockSeleccionado,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //creo un nuevo stock
      let newStock: Stock = {
        id: values.id,
        eliminado: values.eliminado,
        stockActual: values.stockActual,
        stockMaximo: values.stockMaximo,
        stockMinimo: values.stockMinimo,
        articuloInsumo: values.articuloInsumo,
        sucursal: values.sucursal
      }

      //actualizo el stock, y vuelvo a la ruta anterior
      service.put(values.id, newStock).then(() =>
        navigate(-1)
      )
    }
  });

  return (
    <div className={styles.mainBox}>
      <div className={styles.headerBox + " mb-3"}>
        <Typography variant="h5" gutterBottom>
          Editar Stock de {stockSeleccionado.articuloInsumo.denominacion} de sucursal {stockSeleccionado.sucursal.nombre}
        </Typography>
        <BotonVolver/>
      </div>
      <div className={styles.formBox}>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group as={Row} className="mb-2" controlId="stockActual">
            <Form.Label column sm={2}>Stock Actual: </Form.Label>
            <Col sm={10}>
              <Form.Control 
                type="number"
                name="stockActual"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.stockActual}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.stockActual && formik.errors.stockActual ?
            (<div className="text-danger"> {formik.errors.stockActual} </div>) : null
          }

          <Form.Group as={Row} className="mb-2" controlId="stockMinimo">
            <Form.Label column sm={2}>Stock Mínimo: </Form.Label>
            <Col sm={10}>
              <Form.Control 
                type="number"
                name="stockMinimo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.stockMinimo}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.stockMinimo && formik.errors.stockMinimo ?
            (<div className="text-danger"> {formik.errors.stockMinimo} </div>) : null
          }

          <Form.Group as={Row} className="mb-2" controlId="stockMaximo">
            <Form.Label column sm={2}>Stock Máximo: </Form.Label>
            <Col sm={10}>
              <Form.Control 
                type="number"
                name="stockMaximo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.stockMaximo}
              />
            </Col>
          </Form.Group>
          {
            formik.touched.stockMaximo && formik.errors.stockMaximo ?
            (<div className="text-danger"> {formik.errors.stockMaximo} </div>) : null
          }

          <Button type="submit">GUARDAR</Button>
        </Form>
      </div>
    </div>
  )
}

type ReferralType = {
  id?: string
}

//funcion para obtener los datos a editar
export const stockLoader: LoaderFunction = async ({params}) => {
  const { id } = params as ReferralType;

  if(id) {
    let service: StockService = new StockService();
    let stock: StockShort | undefined = await service.getById(Number(id));
    return stock;
  } else {
    return stockShortVacio;
  }
}