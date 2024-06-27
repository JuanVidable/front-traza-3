import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useAppSelector } from "../../../../hooks/redux";
import { EstadisticasService } from "../../../../services/EstadisticasService"
import { FC, useEffect, useState } from "react";
import { IngresosDiarios } from "../../../../types/Estadisticas";
import Chart from "react-google-charts";

interface IPropsRankingProductos {
    business: string
}

export const RecaudacionDiaria : FC<IPropsRankingProductos> = ({business}) => {
  const service = new EstadisticasService();
  const empresa = useAppSelector((state)=> (state.empresaReducer.empresa));
  const idSucursal = useAppSelector((state) => (state.sucursalReducer.sucursal?.id));

  const [data, setData] = useState<any[]>([]);
  const intialDateFrom = new Date();
  intialDateFrom.setMonth(0);
  intialDateFrom.setDate(1);
  const initialDateTo = new Date();
  initialDateTo.setMonth(11);
  initialDateTo.setDate(31);
  const [dateFrom, setDateFrom] = useState<Date>(intialDateFrom);
  const [dateTo, setDateTo] = useState<Date>(initialDateTo);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    console.log("anda el boton antes")
    if(business=="sucursal"){
        console.log(idSucursal)
        if(idSucursal) {
            console.log("anda el boton sucursal"+ idSucursal+" "+dateFrom+" "+dateTo)
            let array: IngresosDiarios[] = await service.getIngresosDiariosSucursal(idSucursal, dateFrom, dateTo);
            let auxArray: any[] = [];

            array.forEach((ranking: IngresosDiarios) => {
                auxArray.push([ranking.fecha, ranking.ingresos])
            });
            console.log(auxArray);
            auxArray.unshift(["Producto", "Ventas"]);
            setData(auxArray);
        }
    } else {
        console.log("anda el boton empresa")
        if(empresa) {
            console.log("anda el boton")
            let array: IngresosDiarios[] = await service.getIngresosDiariosEmpresa(empresa.id, dateFrom, dateTo);
            let auxArray: any[] = [];

            array.forEach((ranking: IngresosDiarios) => {
                auxArray.push([ranking.fecha, ranking.ingresos])
            });

            auxArray.unshift(["Producto", "Ventas"]);
            setData(auxArray);
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
    <div className="mb-5">
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
        <div>
                { data.length>1 &&
                    <Chart 
                        chartType="ColumnChart"
                        width={"100%"}
                        height={"400px"}
                        data={data}
                        options={{
                            chartArea: { width: "50%" },
                            hAxis: {
                                title: "Cantidad Vendida",
                                minValue: 0,
                            },
                            vAxis: {
                                title: "Producto",
                            }
                        }}
                    />
                }
        </div>
    </div>
  )
}
