import { useNavigate } from "react-router";
import { Base } from "../../../types/Base";
import { IconButton } from "@mui/material";
import CIcon from "@coreui/icons-react";
import { cilPencil, cilTrash, } from "@coreui/icons";

interface IPropsButtonTable<T extends Base> {
    item: T;
    handleDelete: (id: number) => void;
}

export const GenericTableButtons = <T extends Base>({
    item,
    handleDelete
}: IPropsButtonTable<T>) => {
    const navigate = useNavigate();

    const handleDeleteItem = () => {
      handleDelete(item.id);
    };

    const handleEdit = () => {
      navigate(`form/${item.id}`);
    };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      gap: 2,
    }}>
      <IconButton aria-label="editar" style={{backgroundColor: "var(--itemsColor)"}} onClick={handleEdit}>
        <CIcon icon={cilPencil} size="lg" />
      </IconButton>
      <IconButton aria-label="eliminar" style={{backgroundColor: "var(--itemsColor)"}} onClick={handleDeleteItem}>
        <CIcon icon={cilTrash} size="lg" />
      </IconButton>
    </div>
  )
}
