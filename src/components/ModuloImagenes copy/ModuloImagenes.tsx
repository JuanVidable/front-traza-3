import { Button, Form, Card } from "react-bootstrap";
import styles from "../../styles/ModuloImagenes.module.css"
import { IconButton } from "@mui/material";
import CIcon from "@coreui/icons-react";
import { cilTrash } from "@coreui/icons";
import { ImageFile } from "../../types/Articulos/ImagenArticulo";
import { useImage } from "../../hooks/useImage";

export const ModuloImagenes = () => {
  const img = useImage();
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    img.setSelectedFiles(event.target.files);
  };

  const handleAdd = () => {
    img.addImages();
  };

  const handleDelete = (image: ImageFile) => {
    img.deleteImage(image);
  };

  return (
    <div className="mb-3">
        <div className={styles.uploadContainer}>
            <Form.Control 
                type="file"
                multiple
                onChange={handleFileChange}
            />
            <Button className={styles.btnUpload} type="button" onClick={handleAdd}>AÑADIR</Button>
        </div>
            { img.toShowImages.length != 0 ? (<div className={styles.galleryContainer} > 
                {
                img.toShowImages?.map((image: ImageFile, index: number) => (
                    <Card key={index} className={styles.card}>
                        <div className={styles.containerImg}>
                            <Card.Img className={styles.img2} variant="top" src={image.imagen.url}></Card.Img>
                        </div>
                        <Card.Body>
                            <IconButton className={styles.btn + " text-success"} onClick={() => handleDelete(image)} >
                                <CIcon icon={cilTrash} size="xl"></CIcon>
                            </IconButton>
                        </Card.Body>
                    </Card>
                )) 
                }
            </div>
            )
            : null}
    </div>
  )
}
