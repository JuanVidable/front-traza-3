import React, { FC, useState } from 'react'
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { EstadisticasService } from '../../../../services/EstadisticasService';
import { useFormik } from 'formik';
import * as Yup from "yup"
import { useAppSelector } from '../../../../hooks/redux';

const validationSchema = Yup.object().shape({
    fechaInicio: Yup
      .date()
      .required('La fecha de inicio es requerida'),
    fechaFin: Yup
      .date()
      .required('La fecha de fin es requerida')
      .when('fechaInicio', (fechaInicio, schema) => {
        return fechaInicio
          ? schema.min(fechaInicio, 'La fecha de fin debe ser posterior a la fecha de inicio')
          : schema;
      }),
  });

  
interface IPropsRankingProductos {
    business: string
}

export  const  InformeExcel : FC<IPropsRankingProductos> = ({business}) => {

    const service = new EstadisticasService();
    const empresa = useAppSelector((state)=> (state.empresaReducer.empresa));
  const idSucursal = useAppSelector((state) => (state.sucursalReducer.sucursal?.id));
  const intialDateFrom = new Date();
  intialDateFrom.setMonth(0);
  intialDateFrom.setDate(1);
  const initialDateTo = new Date();
  initialDateTo.setMonth(11);
  initialDateTo.setDate(31);
  const [dateFrom, setDateFrom] = useState<Date>(intialDateFrom);
  const [dateTo, setDateTo] = useState<Date>(initialDateTo);
  const [error, setError] = useState<boolean>(false);

  const getData = async () => {
    console.log("anda el boton antes")
    if(business=="sucursal"){
        console.log(idSucursal)
        if(idSucursal) {
            console.log("anda el boton sucursal"+ idSucursal+" "+dateFrom+" "+dateTo)
             await service.generateExcelSucursal(idSucursal,dateFrom,dateTo);
        
        }
    } else {
       
        if(empresa) {
            console.log("anda el boton sucursal"+ idSucursal+" "+dateFrom+" "+dateTo)
             await service.generateExcelEmpresa(empresa.id,dateFrom,dateTo);
        }
    }
  };

  const handleChangeDateInput = (inputId: string, date: string) => {
    let newDate: Date = new Date(date);
    if(inputId == "dateFrom"){
        setDateFrom(newDate);
    } else {    //dateTo
        setDateTo(newDate);
    }
    console.log(newDate);
  };


  const handleClickButtonVer = () => {
    
    if(dateFrom > dateTo) {
        setError(true);
        return;
    }
    
    getData();
  };
  return (
        <Container>
            <Row className="mb-2">
                Productos más vendidos
            </Row>
            <Row>
                <Col>
                    <Form.Control
                        type="date"
                        id="dateFrom"
                        aria-label="Desde"
                        onChange={(e) => handleChangeDateInput(e.target.id, e.target.value)}
                    />
                </Col>
                <Col>
                    <Form.Control
                        type="date"
                        id="dateTo"
                        aria-label="Hasta"
                        onChange={(e) => handleChangeDateInput(e.target.id, e.target.value)}
                    />
                </Col>
                <Col>
                    <Button type="button" onClick={handleClickButtonVer}>VER</Button>
                </Col>
            </Row>
            <Row>
                { error &&
                    <div className="text-danger">Rango de fechas no válido</div>
                }
            </Row>
        </Container>
  )
}
