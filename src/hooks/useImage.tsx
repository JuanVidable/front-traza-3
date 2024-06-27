import { useContext } from "react";
import { ImagesContext } from "../context/ImagenesContext";

export const useImage = () => {
  const context = useContext(ImagesContext);

  if(context == undefined) {
    throw new Error("useImages debe ser usado dentro del ámbito de un ImageProvider");
  }

  return context;
}
