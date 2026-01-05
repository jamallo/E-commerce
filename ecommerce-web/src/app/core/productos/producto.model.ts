export interface Producto {
  id: number;
  nombre: String;
  descripcion: String;
  precio: number;
  activo: boolean;
  imagenUrl?: string;
}
