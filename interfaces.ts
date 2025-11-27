// ./interfaces.ts
export interface IFooCepAPI {
    getAddressByCEP(cep: string, number: number): Promise<string>
    getCepByAddress(address: string, number: number): Promise<string>
  }

export interface IVehicle {
    drive(): void;
    fly(): void;
  }

export interface LandVehicle {
    drive(): void
}

export interface AirVehicle {
    fly(): void
}