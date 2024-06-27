import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useAppSelector } from "../../../../hooks/redux";
import { EstadisticasService } from "../../../../services/EstadisticasService"
import { FC, useEffect, useState } from "react";
import { CostoGanancia } from "../../../../types/Estadisticas";
import Chart from "react-google-charts";


interface IPropsRankingProductos {
    business: string
}

export const CostosGanancias : FC<IPropsRankingProductos> = ({business}) => {
  const service = new EstadisticasService();
  const empresa = useAppSelector((state)=> (state.empresaReducer.empresa));
  const idSucursal = useAppSelector((state) => (state.sucursalReducer.sucursal?.id));

  const [data, setData] = useState<any[]>();
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
            let array: CostoGanancia = await service.getCostosGananciasSucursal(idSucursal, dateFrom, dateTo);
            let newArray=[['resultados',array.resultado],['costos',array.costos],['ganancias',array.ganancias]]
           
console.log(array);
           
            setData(newArray);
        }
    } else {
        console.log("anda el boton empresa")
        if(empresa) {
            console.log("anda el boton")
            let array: CostoGanancia = await service.getCostosGananciasEmpresa(empresa.id, dateFrom, dateTo);
            
            let newArray=[['resultados',array.resultado],['costos',array.costos],['ganancias',array.ganancias]]
           
            setData(newArray);
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
                { data &&
                     <Chart 
                         chartType="PieChart"
                         width={"100%"}
                         height={"400px"}
                         data={[
                            ['Estado', 'Valor'],
                            ...data.map(({ variable, valor }) => [variable, valor]),
                        ]}
                          options = {{
                             title: 'Distribución de Costos, Ganancias y Resultado'
                           }}
                       
                     />
               }
        </div>
    </div>
  )
}
