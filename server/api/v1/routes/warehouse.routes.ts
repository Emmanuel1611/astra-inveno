import express from 'express';
import { 
  getAllWarehouses, 
  getWarehouseById, 
  createWarehouse, 
  updateWarehouse 
} from '../controllers/warehouse.controller';

const router = express.Router();

router.get('/', getAllWarehouses);
router.get('/:id', getWarehouseById);
router.post('/', createWarehouse);
router.put('/:id', updateWarehouse);

export default router;