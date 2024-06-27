import { FC } from "react";
import { Card } from "react-bootstrap"
import CIcon from "@coreui/icons-react";
import { cilPlus } from "@coreui/icons";

interface IPropsEmptyCard{
    create: () => void;
    item: string;
}

export const EmptyCard : FC<IPropsEmptyCard> = ({create, item}) => {
  return (
    <Card className="empty-card" onClick={create}>
        <Card.Body className="empty-card-body">
            <CIcon icon={cilPlus} size="9xl" ></CIcon>
            <Card.Img variant="top"></Card.Img>
            <Card.Title>Crear nueva</Card.Title>
            <Card.Text>
                Cree una nueva {item} haciendo clic aquí
            </Card.Text>
        </Card.Body>
    </Card>
  )
}
