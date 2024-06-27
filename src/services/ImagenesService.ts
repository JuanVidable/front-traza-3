import { base } from "./BackendClient";

export class ImagenesService {
    baseUrl: string;

    constructor(objUrl: string) {
        this.baseUrl = base + objUrl;
    }
    
    async delete(image: {id: number, publicId: string}) {
        var url: string = this.baseUrl + "/deleteImg" + `?publicId=${image.publicId}&id=${image.id}` ;
        const response = await fetch(url, {
            "method": "POST"
        })
        if (!response.ok) {
            throw new Error("Error al eliminar la imagen");
        }
    }

    async upload(idArticulo: number, formData: FormData) {
        const url: string = `${this.baseUrl}/uploads?id=${idArticulo}`;
        try {
            const response = await fetch(url, {
                method: "POST",
                
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error("Error al cargar las imágenes");
            }
    
            console.log(response)
            // Si la respuesta es exitosa, puedes retornar cualquier dato que necesites procesar en el frontend
            // Por ejemplo, si el backend devuelve un mensaje de confirmación o datos adicionales
            return response // O response.text(), dependiendo del tipo de respuesta esperada
    
        } catch (error) {
            // Manejo de errores
            console.error("Error al cargar las imágenes:", error);
            throw new Error("Error al cargar las imágenes. Por favor, inténtalo de nuevo.");
        }
    }
    
    async uploadOne(formData: FormData) {
        const url: string = `${this.baseUrl}/uploads`;
        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error("Error al cargar las imágenes");
            }
    
            console.log(response)
            // Si la respuesta es exitosa, puedes retornar cualquier dato que necesites procesar en el frontend
            // Por ejemplo, si el backend devuelve un mensaje de confirmación o datos adicionales
            return response // O response.text(), dependiendo del tipo de respuesta esperada
    
        } catch (error) {
            // Manejo de errores
            console.error("Error al cargar las imágenes:", error);
            throw new Error("Error al cargar las imágenes. Por favor, inténtalo de nuevo.");
        }
    }
}