import { ReactNode, createElement } from "react";

const formatImage = (url: string): ReactNode => {
    var image = createElement(
        'img',
        { 
            src: url,
            alt: "Imagem",
            width: "50",
            height: "50"
         }
      );
    return image
}
        
export default formatImage;