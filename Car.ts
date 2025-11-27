import { IVehicle, LandVehicle } from "./interfaces";

class Car implements LandVehicle {
    drive(): void {
        throw new Error("Method not implemented.");
    }

}