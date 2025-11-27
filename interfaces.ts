// ./interfaces.ts
export interface IFooCepAPI {
    getAddressByCEP(cep: string, number: number): Promise<string>
    getCepByAddress(address: string, number: number): Promise<string>
  }


export interface ICar {
    drive(): void
}

export interface IAirplane {
    fly(): void
}

export interface IVehicle extends ICar, IAirplane {
  
}