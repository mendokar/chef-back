import { Router } from 'express';
import  pagosController from'../controllers/pagosController';

const router = Router();

router.get('/pagos', pagosController.getAllPagos);
router.post('/crearPago', pagosController.crearPago);
router.get('/consultarPagos/:id', pagosController.consultarPago);

export default router;