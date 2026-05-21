export interface Marca {
  id: string;
  name: string;
  logo: string;
}

export interface Modelo {
  id: string;
  name: string;
  year?: number;
  brandId: string;
}
