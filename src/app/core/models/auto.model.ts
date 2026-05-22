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

export interface Generation {
  id: string;
  name: string;
  yearFrom: number;
  yearTo: number;
}

export interface Trim {
  id: number;
  series: string;
  generation: string;
  trim: string;
  bodyType: string;
}

export interface TrimSpecs {
  id: number;
  make: string;
  model: string;
  generation: string;
  series: string;
  trim: string;
  bodyType: string;
  engineHp?: string;
  capacityCm3?: string;
  transmission?: string;
  driveWheels?: string;
  acceleration0To100KmPerHS?: string;
  cityFuelPer100KmL?: string;
  highwayFuelPer100KmL?: string;
  lengthMm?: string;
  widthMm?: string;
  heightMm?: string;
  curbWeightKg?: string;
}
