import { ICar } from "./interfaces";

class Car implements ICar {
    drive(): void {
        throw new Error("Method not implemented.");
    }

}