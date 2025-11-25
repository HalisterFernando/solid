import { IPlant, IPlantsMetadata } from "../services/PlantService";
import { IModel } from "./database/interfaces/IModel";
import fs from 'fs/promises';
import path from 'path';

export default class PlantModel implements IModel<IPlant> {
    private readonly plantsFile = path.join(__dirname, '..', 'models', 'database', 'plantsData.json');
    private readonly plantsMetadataFile = path.join(__dirname, '..', 'models', 'database', 'plantsMetadata.json');

    private async getNextPlantId(incrementAmount = 1): Promise<number> {
        const dataRaw = await this.readFile(this.plantsMetadataFile);
        const plantsMetadata: IPlantsMetadata = JSON.parse(dataRaw);
        plantsMetadata.lastPlantId += incrementAmount;
    
        await fs.writeFile(this.plantsMetadataFile, JSON.stringify(plantsMetadata, null, 2));
    
        return plantsMetadata.lastPlantId;
      }

    async getAll(): Promise<IPlant[]> {
        const dataRaw = await this.readFile(this.plantsFile);
        const plants: IPlant[] = JSON.parse(dataRaw);
        return plants;
    }
    async getById(id: string): Promise<IPlant | null> {
        const dataRaw = await this.readFile(this.plantsFile);
        const plants: IPlant[] = JSON.parse(dataRaw);
        console.log(plants)
        const plant = plants.find((plant) => plant.id === Number(id))

        return plant ?? null
        
    }
    async create(plant: Omit<IPlant, "id">): Promise<IPlant> {        

        const dataRaw = await this.readFile(this.plantsFile);
        const plants: IPlant[] = JSON.parse(dataRaw);
    
        const newPlantId = await this.getNextPlantId(1);
        const newPlant = { id: newPlantId, ...plant };
        plants.push(newPlant);

    
        await this.writeFile(plants, this.plantsFile);
        return newPlant;
    }
    async update(plant: IPlant): Promise<IPlant| null> {
        const { id, breed, size, needsSun, origin, waterFrequency } = plant

        const existingPlant = this.getById(id.toString())
        if (!existingPlant) return null
        
        const dataRaw = await this.readFile(this.plantsFile);
        const plants: IPlant[] = JSON.parse(dataRaw);

        const updatedPlants = plants.map((plantObject) =>
            plantObject.id === id ? {...plant, breed, size, needsSun, origin, waterFrequency } 
            : plantObject
        )

        await this.writeFile(updatedPlants, this.plantsFile)

        return plant
    }
    async removeById(id: string): Promise<boolean> {
       const plantToBeRemoved = this.getById(id);
       if (!plantToBeRemoved) return false

       const dataRaw = await this.readFile(this.plantsFile);
       const plants: IPlant[] = JSON.parse(dataRaw);
       console.log('plants', plants)
       const updatedPlants = plants.filter((plant) => plant.id !== Number(id))


       await this.writeFile(updatedPlants, this.plantsFile)
       return true
    }

    async readFile(file: string): Promise<string> {
        const dataRaw = await fs.readFile(file, { encoding: 'utf8' });
        return dataRaw
    }

    async writeFile(file: IPlant[],fileToBeUpdated: string): Promise<void> {
        await fs.writeFile(fileToBeUpdated, JSON.stringify(file, null, 2));        
    }

}

