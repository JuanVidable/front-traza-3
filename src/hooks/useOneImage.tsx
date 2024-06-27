import { useContext } from "react";
import { ImageContext } from "../context/ImagenContext";

export const useOneImage = () => {
  const context = useContext(ImageContext);

  if(context == undefined) {
    throw new Error("useImages debe ser usado dentro del ámbito de un ImageProvider");
  }

  return context;
}
