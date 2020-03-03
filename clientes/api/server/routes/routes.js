import { Router } from 'express';
import  clientesController from'../controllers/clientesController';

const router = Router();

router.get('/clientes', clientesController.getAllClientes);
router.post('/crearCliente', clientesController.crearCliente);
router.get('/consultarCliente/:id', clientesController.consultarCliente);
router.put('/actualizarCliente/:id', clientesController.actualizarCliente);
router.delete('/eliminarCliente/:id', clientesController.eliminarCliente);

export default router;