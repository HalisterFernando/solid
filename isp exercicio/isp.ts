class Passenger {
    constructor(public nome: string, public cpf: number) { }
  }
  
  class ShippedItem {
    constructor(
      public nome: string, 
      public id: number, 
      public customerID: string,
    ) { }
  }
  
  class Flight {
    constructor(public num: number, public payload: (Passenger | ShippedItem)[]) { }
  
    add(newPayload: Passenger | ShippedItem): void {
      this.payload.push(newPayload); 
    }
  
    remove(removedPayload: Passenger | ShippedItem): void {
      const index = this.payload.indexOf(removedPayload, 0);
      if (index > -1) {
        this.payload.splice(index, 1);
      }
    }
  }
  
  class Company {
    constructor(public nome: string, public flights: Flight[]) { }
    newFlight(flightNum: number): void { }
    addToFlight(flightNum: number, passenger: Passenger): void { }
    removeFromFlight(flightNum: number, passenger: Passenger): void { }
  }
  
  class TravelingCompany extends Company {
    newFlight(flightNum: number): void {
      const newFlight = new Flight(flightNum, []);
      this.flights.push(newFlight);
    }
  
    addToFlight(flightNum: number, passenger: Passenger): void {
      const currentFlight = this.flights.find((f) => f.num === flightNum);
      if (currentFlight) {
        currentFlight.add(passenger);
      }
    }
  
    removeFromFlight(flightNum: number, passenger: Passenger): void {
      const currentFlight = this.flights.find((f) => f.num === flightNum);
      if (currentFlight) {
        currentFlight.remove(passenger);
      }
    }
  }
  
  class ShippingCompany extends Company {
    newFlight(flightNum: number): void {
      const newFlight = new Flight(flightNum, []);
      this.flights.push(newFlight);
    }
  
    addToFlight(flightNum: number, item: ShippedItem | Passenger): void {
      const currentFlight = this.flights.find((f) => f.num === flightNum);
      if (currentFlight) {
        currentFlight.add(item);
      }
    }
  }