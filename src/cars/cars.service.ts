import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {

  private cars: Car[] = [
    { id: uuid(), brand: "Toyota", model: "Corolla" },
    { id: uuid(), brand: "Honda", model: "Civic" },
    { id: uuid(), brand: "Ford", model: "Mustang" },
  ]

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find(car => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    return car;
  }

  createCar(createCarDto: CreateCarDto) {
    const newCar = { id: uuid(), ...createCarDto };
    this.cars.push(newCar);
    return {
      message: `Car with id ${newCar.id} created`,
      newCar
    };
  }

  updateCar(id: string, updateCarDto: UpdateCarDto) {

    let carDB = this.findOneById(id);

    if (updateCarDto.id && updateCarDto.id !== id) {
      throw new BadRequestException(`Car id is not valid inside body`);
    }

    this.cars = this.cars.map(car => {

      if (car.id === id) {
        carDB.brand = updateCarDto.brand || carDB.brand;
        carDB.model = updateCarDto.model || carDB.model;

        // carDB = { ...carDB, ...updateCarDto, id };
        // return carDB;
      }
      return car;

    });

    return {
      message: `Car with id ${id} updated`,
      carDB
    };
  }

  deleteCar(id: string) {
    this.findOneById(id);
    this.cars = this.cars.filter(car => car.id !== id);
    return {
      message: `Car with id ${id} deleted`,
    }
  }

}
