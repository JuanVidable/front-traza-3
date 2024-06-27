import { Button } from "@mui/material"
import CIcon from "@coreui/icons-react"
import { cilArrowLeft } from "@coreui/icons"
import { useNavigate } from "react-router"

export const BotonVolver = () => {
  const navigate = useNavigate();

  return (
    <Button type="button" onClick={() => { navigate(-1) }} style={{ color: "black", backgroundColor: "var(--itemsColor)", border: "var(--itemsColor)" }}>
        <CIcon icon={cilArrowLeft} size="lg"></CIcon>&nbsp;VOLVER
    </Button>
  )
}
