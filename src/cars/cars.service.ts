import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {

  private cars = [
    { id: 1, brand: "Toyota", model: "Corolla" },
    { id: 2, brand: "Honda", model: "Civic" },
    { id: 3, brand: "Ford", model: "Mustang" },
  ]

  findAll() {
    return this.cars;
  }

  findOneById(id: number) {
    const car = this.cars.find(car => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    return car;
  }

  createCar(payload: any) {
    this.cars.push(payload);
    return {
      message: `Car with id ${payload.id} created`,
      payload
    };
  }

  updateCar(id: number, payload: any) {
    let carDB = this.findOneById(id);
    this.cars = this.cars.map(car => {
      if (car.id === id) car = payload;
      return car;
    });
    return {
      message: `Car with id ${id} updated`,
      payload
    };
  }

  deleteCar(id: number) {
    this.findOneById(id);
    this.cars = this.cars.filter(car => car.id !== id);
    return {
      message: `Car with id ${id} deleted`,
    }
  }

}
