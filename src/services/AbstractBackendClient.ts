// Clase abstracta que define métodos para operaciones CRUD en un servicio genérico
export abstract class AbstractBackendClient<T> {
  protected baseUrl: string = "";

  abstract getAll(): Promise<T[]>;

  abstract getById(id: number): Promise<T | undefined>;

  abstract post(data: T): Promise<T>;
  
  abstract put(id: number, data: T): Promise<T>;

  abstract delete(id: number): Promise<void>;
}
