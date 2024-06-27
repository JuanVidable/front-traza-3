import { AbstractBackendClient } from "./AbstractBackendClient";

 //export const base = import.meta.env.VITE_BASE_URL;
  export const base: string = "http://localhost:8092/";

export abstract class BackendClient<T> extends AbstractBackendClient<T> {

  async getAll(): Promise<T[]> {
    const response = await fetch(`${this.baseUrl}`);
    const data = await response.json();
    return data as T[];
  }

  async getById(id: number): Promise<T | undefined> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      return undefined;
    }
    const data = await response.json();
    return data as T;
  }

  async post(data: T): Promise<T> {
    const response = await fetch(`${this.baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newData = await response.json();
    return newData as T;
  }

  async put(id: number, data: T): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newData = await response.json();
    return newData as T;
  }

  async delete(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar el elemento con ID ${id}`);
    }
  }
}
