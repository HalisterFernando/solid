import fs from 'fs/promises';
import path from 'path';
import HttpException from '../exceptions/HttpException';
import PlantModel from '../models/PlantModel';

export interface IPlant {
  id: number,
  breed: string,
  needsSun: boolean,
  origin: string,
  size: number,
  waterFrequency: number,
}

type INewPlant = Omit<IPlant, 'id' | 'waterFrequency'>;

export interface IPlantsMetadata {
  lastPlantId: number
}


class PlantService {
 
  constructor(private model = new PlantModel()) {

  }
  

  public async getAll(): Promise<IPlant[]> {
    return this.model.getAll()
  }

  public async create(plant: INewPlant): Promise<IPlant> {
    const validatedPlant = this.validatePlant(plant)
    const waterFrequency = plant.needsSun
    ? plant.size * 0.77 + (plant.origin === 'Brazil' ? 8 : 7)
    : (plant.size / 2) * 1.33 + (plant.origin === 'Brazil' ? 8 : 7);

    return this.model.create({...validatedPlant, waterFrequency})
  
  }

  public async getById(id: string): Promise<IPlant | null> {
    return this.model.getById(id)
  }

  validatePlant(plant: INewPlant): INewPlant {
    const {
      breed,
      needsSun,
      origin,
      size,
    } = plant

    if (typeof breed !== 'string') {
      throw new HttpException(400, 'Attribute "breed" must be string.');
    }

    if (typeof needsSun !== 'boolean') {
      throw new HttpException(400, 'Attribute "needsSun" must be boolean.');
    }

    if (typeof origin !== 'string') {
      throw new HttpException(400, 'Attribute "origin" must be string.');
    }

    if (typeof size !== 'number') {
      throw new HttpException(400, 'Attribute "size" must be number.');
    }

    return plant
  }
}

export default PlantService;