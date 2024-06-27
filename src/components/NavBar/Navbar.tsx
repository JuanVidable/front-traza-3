import { Box, AppBar, Toolbar, Typography } from "@mui/material"
import { useAppSelector } from "../../hooks/redux";

export const Navbar = () => {
  const empresaSelected = useAppSelector((state) => state.empresaReducer.empresa);

  return (
    <Box className="navbar border-bottom d-flex flex-row">
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ justifyContent: 'center' }}
          >
            {empresaSelected?.nombre}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
