import CIcon from "@coreui/icons-react"
import { cilPlus } from "@coreui/icons"
import { Button } from "@mui/material"
import { useNavigate } from "react-router"

export const BotonNuevo = () => {
  const navigate = useNavigate();

  return (
    <Button 
      variant="contained"
      onClick={() => navigate("form")}
    >
      <CIcon icon={cilPlus} size="lg"></CIcon>&nbsp;NUEVO
    </Button>
  )
}
