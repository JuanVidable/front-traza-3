import { Carousel, CarouselCaption } from "react-bootstrap"
import { IImagen } from "../../types/Articulos/ImagenArticulo"
import { FC } from "react";
import styles from "../../styles/GenericGallery.module.css"
 
interface IPropsGenericGallery {
    imagenes: IImagen[] | IImagen;
}

export const GenericGallery : FC<IPropsGenericGallery> = ({imagenes}) => {
  return (
    <Carousel>
      {imagenes? (Array.isArray(imagenes) ? 
          (imagenes.map((imagen: IImagen, i: number) => 
            <Carousel.Item key={i} className={styles.carouselItem} >
              <img src={imagen.url}/>
            </Carousel.Item>)
          ) :
          (
            <Carousel.Item className={styles.carouselItem} >
              <img src={imagenes.url}/>
            </Carousel.Item>
          )
        ) : (
          <Carousel.Item>
            <CarouselCaption>
              No hay imágenes para mostrar
            </CarouselCaption>
          </Carousel.Item>
        )
      }
    </Carousel>
  )
}
