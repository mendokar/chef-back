import { Router } from 'express';
import  facturasController from'../controllers/facturasController';

const router = Router();

router.get('/facturas', facturasController.getAllFacturas);
router.post('/crearFactura', facturasController.crearFactura);
router.get('/consultarFactura/:id', facturasController.consultarFactura);

export default router;