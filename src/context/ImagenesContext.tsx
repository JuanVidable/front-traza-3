import { ReactNode, createContext, useState } from "react";
import { IImagen, ImageFile } from "../types/Articulos/ImagenArticulo";
import Swal from "sweetalert2";
import { ImagenesService } from "../services/ImagenesService";
import { extractPublicId } from "cloudinary-build-url";

interface ImagesContextType {
    setObjUrl: (url: string) => void, 
    toShowImages: ImageFile[],
    addToShowImages: (array: IImagen[]) => void, 
    setSelectedFiles: (files: FileList | null) => void, 
    addImages: () => void, 
    deleteImage: (image: ImageFile) => void, 
    uploadImages: (idObject: number) => void,
    reset: () => void
}

export const ImagesContext = createContext<ImagesContextType>({
    setObjUrl: () => {}, 
    toShowImages: [],
    addToShowImages: () => {}, 
    setSelectedFiles: () => {}, 
    addImages: () => {}, 
    deleteImage: () => {}, 
    uploadImages: () => {},
    reset: () => {}
});

export function ImagesContextProvider({ children } : { children: ReactNode }) {
    const[toShowImages, setToShowImages] = useState<ImageFile[]>([]);
    const [newImages, setNewImages] = useState<FormData>(new FormData());
    const [toDeleteImages, setToDeleteImages] = useState<ImageFile[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [objUrl, setObjUrl] = useState<string>("");
    
    //change the states
    //transform existingImages into ImageFile and add them to toShowImages
    const addToShowImages = (array: IImagen[]) => {
        let auxArray: ImageFile[] = [];
        array.forEach((img: IImagen) => {
            let newImage: ImageFile = {
                imagen: img
            }
            auxArray.push(newImage);
        });
        setToShowImages(auxArray);
    };

    //transform selctedFiles into ImageFile and add it to toShowImages, add files to newImages
    const addImages = () => {
        if(selectedFiles){
            let auxToShow: ImageFile[] = toShowImages.slice();
            let auxNew: FormData = newImages;

            Array.from(selectedFiles).forEach((f: File) => {
                var newName = f.name;
                var newURL = URL.createObjectURL(f);
    
                var newImagen: IImagen = {
                    id: 0,
                    eliminado: false,
                    name: newName,
                    url: newURL
                }
    
                var newImageFile: ImageFile = {
                    imagen: newImagen,
                    file: f
                }
    
                auxToShow.push(newImageFile);
                auxNew.append("uploads", f);
            });
            setToShowImages(auxToShow);
            setNewImages(auxNew);
        }
    };

    //remove from toShowImages, if it has a file we remove it from newImages if not add to toDeleteImages
    const deleteImage = (deleted: ImageFile) => {
        let auxToShow: ImageFile[] = toShowImages.slice();

        auxToShow = auxToShow.filter( (img: ImageFile ) => {
            return img != deleted;
        });

        setToShowImages(auxToShow);

        if(deleted.file){
            if(newImages.has("uploads")){
                let auxNew = newImages;

                for(var [key] of Array.from(newImages.entries())) {
                    if(auxNew.get(key)==deleted.file) {
                        auxNew.delete(key);
                    }
                }
                
                setNewImages(auxNew);
            }
        } else {
            let auxToDelete = toDeleteImages.slice();
            auxToDelete.push(deleted);
            setToDeleteImages(auxToDelete);
        }
    };  

    //change the db
    //save newImages into cloudinary and the db, setNewImages with the full images
     const uploadImages = async (idObject: number) => {
         //Crear un objeto FormData y agregar los archivos seleccionados
         if(newImages.has("uploads")) {
  
             //Mostrar un mensaje de carga mientras se suben los archivos
             Swal.fire({
               title: "Guardando imagénes...",
               text: "Espere mientras se guardan las imágenes",
               allowOutsideClick: false,
               didOpen: () => {
                 Swal.showLoading();
               }
             });
  
             try {
               //Realizar la peticion POST para subir los archivos
               let imgService = new ImagenesService(objUrl);
                
                const response = await imgService.upload(idObject, newImages);
                if (!response.ok) {
                    return;
                }

               //cerrar el mensaje de espera
               Swal.close();
             } catch ( error ) {
               Swal.close();
               throw new Error();
             }
        }
        if(toDeleteImages.length!=0){
            deleteImages();
        }
     };

    //delete toDeleteImages from cloudinary
    const deleteImages = () => {
        let service = new ImagenesService(objUrl);

        toDeleteImages.forEach((img: ImageFile) => {
            console.log(img.imagen.url);
            let regex = /\/([0-9a-f]{32})/;
            let match2 = img.imagen.url.match(regex);
            //extraigo el ID publico de la URL de la imagen
            const match = extractPublicId(img.imagen.url);
            console.log(match[1])
            if(match2) console.log(match2[1])
            if(match){
                const publicId = match[1];
                try {
                    //Realizar la peticion post para eliminar la imagen
                    service.delete({id: img.imagen.id, publicId: publicId});
                } catch (error) {
                    throw new Error();
                }
            }
        });
    };

    //empty the states
    const reset = () => {
        setNewImages(new FormData());
        setToShowImages([]);
        setToDeleteImages([]);
        setSelectedFiles(new FileList());
        setObjUrl("");
    };

    return (
        <ImagesContext.Provider value={{toShowImages, setObjUrl, addToShowImages, setSelectedFiles, addImages, deleteImage, uploadImages, reset}}>
            { children }
        </ImagesContext.Provider>
    );
}