import { IPlant, IPlantsMetadata } from "../services/PlantService";
import { IModel } from "./database/interfaces/IModel";
import fs from 'fs/promises';
import path from 'path';

export default class PlantModel implements IModel<IPlant> {
    private readonly plantsFile = path.join(__dirname, '..', 'models', 'database', 'plantsData.json');
    private readonly plantsMetadataFile = path.join(__dirname, '..', 'models', 'database', 'plantsMetadata.json');

    private async getNextPlantId(incrementAmount = 1): Promise<number> {
        const dataRaw = await fs.readFile(this.plantsMetadataFile, { encoding: 'utf8' });
        const plantsMetadata: IPlantsMetadata = JSON.parse(dataRaw);
        plantsMetadata.lastPlantId += incrementAmount;
    
        await fs.writeFile(this.plantsMetadataFile, JSON.stringify(plantsMetadata, null, 2));
    
        return plantsMetadata.lastPlantId;
      }

    async getAll(): Promise<IPlant[]> {
        const dataRaw = await fs.readFile(this.plantsFile, { encoding: 'utf8' });
        const plants: IPlant[] = JSON.parse(dataRaw);
        return plants;
    }
    async getById(id: string): Promise<IPlant | null> {
        const dataRaw = await fs.readFile(this.plantsFile, { encoding: 'utf8' });
        const plants: IPlant[] = JSON.parse(dataRaw);
        const plant = plants.find((plant) => plant.id === Number(id))

        return plant ?? null
        
    }
    async create(plant: Omit<IPlant, "id">): Promise<IPlant> {
        const {
            needsSun,
            size,
            origin
        } = plant
        
        const waterFrequency = needsSun
        ? size * 0.77 + (origin === 'Brazil' ? 8 : 7)
        : (size / 2) * 1.33 + (origin === 'Brazil' ? 8 : 7);

        const dataRaw = await fs.readFile(this.plantsFile, { encoding: 'utf8' });
        const plants: IPlant[] = JSON.parse(dataRaw);
    
        const newPlantId = await this.getNextPlantId(1);
        const newPlant = { id: newPlantId, ...plant, waterFrequency };
        plants.push(newPlant);

    
        await fs.writeFile(this.plantsFile, JSON.stringify(plants, null, 2));
        return newPlant;
    }
    update(arg: IPlant): Promise<IPlant> {
        throw new Error("Method not implemented.");
    }
    removeById(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}

