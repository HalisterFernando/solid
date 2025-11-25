import { Router } from 'express';
import PlantController from '../controllers/PlantController';

const plantController = new PlantController();

const plantRouter = Router();

plantRouter.get('/', (req, res, next) => plantController.getAll(req, res, next));
plantRouter.post('/', (req, res, next) => plantController.create(req, res, next));
plantRouter.get('/:id', (req, res, next) => plantController.getById(req, res, next));
plantRouter.put('/', (req, res, next) => plantController.update(req, res, next));
plantRouter.delete('/:id', (req, res, next) => plantController.removeById(req, res, next))


export default plantRouter; 