import { Outlet } from "react-router-dom";
//import { Navbar } from "../../components/NavBar/Navbar";
import "../../styles/Navbar.css"
import { Container } from "@mui/material";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const RootLayout = () => {
  const navigate = useNavigate();
  /*useEffect(() => {
    navigate("/admin-console");
  },[]);*/

  return (
      <Container component="main" sx={{ flexGrow: 1, pl: 9, pt: 4}}>
        

        <main className="w-100 d-flex justify-content-center align-items-center" >
          <Outlet/>
        </main>
      </Container>
  )
}

export default RootLayout;