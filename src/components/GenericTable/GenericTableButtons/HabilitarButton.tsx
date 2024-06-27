import { Form } from "react-bootstrap";
import styles from "../../../styles/HabilitarButton.module.css"

interface IPropsHabilitarButton {
    item: any;
    handleHabilitar: (id: number) => void;
}

export const HabilitarButton = ({
    item,
    handleHabilitar
} : IPropsHabilitarButton ) => {
  return (
    <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        gap: 2,
      }}>
        <Form.Check 
            type="switch"
            id="habilitado" 
            defaultChecked={item.habilitado} 
            onChange={() => handleHabilitar(item.id)}
            className={styles.toggleHabilitado}
        ></Form.Check>
    </div>
  )
}
