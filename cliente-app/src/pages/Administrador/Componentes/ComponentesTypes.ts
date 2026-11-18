interface LibroVendido {
  titulo: string;
  vendidos: number;
}

export interface CategoriaVenta {
  nombre: string;
  cantidad: number;
}

export interface LibrosMasVendidosProps {
  totalVentas: number;
  librosMasVendidos: LibroVendido[];
  categorias: CategoriaVenta[];
}

export interface ActividadTiendaProps {
  pendientes: number;
  completados: number;
  cancelados: number;
}

export interface LegendProps {
  categoria: CategoriaVenta,
  index: number,
  totalCategorias: number
}

export interface InventarioBajoItem {
  portada_url: string;
  titulo: string;
  cantidad: number;
}

export interface InventarioBajoProps {
  data: InventarioBajoItem[];
}

export interface PedidoReciente {
  num: number;
  usuario: string;
  fecha: string;
  status: string;
}

export interface PedidosRecientesProps {
  data: PedidoReciente[];
}

export interface VerTodoButtonProps {
  page: string;
}