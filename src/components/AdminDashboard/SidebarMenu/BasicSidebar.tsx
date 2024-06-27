import React from 'react';
import { Link } from 'react-router-dom';
import { cilBarChart, cilBuilding, cilCart, cilFastfood, cilMinus, cilNotes, cilPeople } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CNavGroup, CNavItem, CNavTitle, CSidebar, CSidebarNav } from "@coreui/react";
import '@coreui/coreui/dist/css/coreui.min.css';
import { cilDollar } from "@coreui/icons";

const BasicSidebar: React.FC = () => {
    return (
            <CSidebar className="border-end d-flex flex-column" style={{ height: '100vh' }}>
                <CSidebarNav>
                    <CNavTitle>
                    </CNavTitle>
                    <CNavItem>
                        <Link to="/dashboard" className="nav-link" >
                            <CIcon customClassName="nav-icon" icon={cilBarChart} />
                            Inicio
                        </Link>
                    </CNavItem>

                    <CNavItem>
                        <Link to="sucursales" className="nav-link">
                            <CIcon customClassName="nav-icon" icon={cilBuilding} />
                            Sucursales
                        </Link>
                    </CNavItem>
                    <CNavGroup
                        toggler={
                            <>
                                <CIcon customClassName="nav-icon" icon={cilFastfood} />
                                Productos
                            </>
                        }
                    >
                        <CNavItem>
                            <Link to="productos" className="nav-link" >
                                <CIcon customClassName="nav-icon" icon={cilMinus} />
                                Lista de Productos
                            </Link>
                        </CNavItem>
                        <CNavItem>
                            <Link to="categorias" className="nav-link">
                                <CIcon customClassName="nav-icon" icon={cilMinus} />
                                Categorías
                            </Link>
                        </CNavItem>
                        <CNavItem>
                            <Link to="unidadesmedida" className="nav-link">
                                <CIcon customClassName="nav-icon" icon={cilMinus} />
                                Unidades de Medida
                            </Link>
                        </CNavItem>
                    </CNavGroup>

                    <CNavItem>
                        <Link to="promociones" className="nav-link">
                            <CIcon customClassName="nav-icon" icon={cilDollar} />
                            Promociones
                        </Link>
                    </CNavItem>

                    <CNavItem>
                        <Link to="empleados" className="nav-link" >
                            <CIcon customClassName="nav-icon" icon={cilPeople} />
                            Empleados
                        </Link>
                    </CNavItem>

                    <CNavGroup
                        toggler= {
                            <>
                                <CIcon customClassName="nav-icon" icon={cilCart} />
                                Insumos
                            </>
                        }
                    >
                        <CNavItem>
                            <Link to="insumos" className="nav-link">
                                <CIcon customClassName="nav-icon" icon={cilMinus} />
                                Lista de Insumos
                            </Link>
                        </CNavItem>
                        <CNavItem>
                            <Link to="stock" className="nav-link">
                                <CIcon customClassName="nav-icon" icon={cilMinus} />
                                Stock
                            </Link>
                        </CNavItem>
                    </CNavGroup>
                    <CNavGroup
                        toggler= {
                            <>
                                <CIcon customClassName="nav-icon" icon={cilBarChart} />
                                Estadísticas
                            </>
                        }
                    >
                        <CNavItem>
                            <Link to="estadisticas" className="nav-link">
                                <CIcon customClassName="nav-icon" icon={cilMinus} />
                                Empresa
                            </Link>
                        </CNavItem>
                        <CNavItem>
                            <Link to="estadisticas/sucursal" className="nav-link">
                                <CIcon customClassName="nav-icon" icon={cilMinus} />
                                Sucursal
                            </Link>
                        </CNavItem>
                    </CNavGroup>

                    <CNavItem>
                        <Link to="pedidos" className="nav-link" >
                            <CIcon customClassName="nav-icon" icon={cilNotes} />
                            Pedidos
                        </Link>
                    </CNavItem>
                </CSidebarNav>
            </CSidebar>
    );
}

export default BasicSidebar;
