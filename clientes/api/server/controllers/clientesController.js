import  clienteService from '../services/clienteService';
import Util from '../utils/Utils';

const util = new Util();

class clientesController {
    static async getAllClientes(req, res) {
      try {
        const allClientes = await clienteService.getAllClientes();
        if (allClientes.length > 0) {
          util.setSuccess(200, 'Clientes encontrados', allClientes);
        } else {
          util.setSuccess(200, 'No se encuentran clientes');
        }
        return util.send(res);
      } catch (error) {
        util.setError(400, error);
        return util.send(res);
      }
    }

    static async crearCliente(req, res) {
        console.log(req.body);
        

        if (!req.body.nombres || !req.body.direccion_facturacion || !req.body.direccion_correspondencia || !req.body.estrato) {
          util.setError(400, 'Por favor ingrese todos los campos.');
          return util.send(res);
        }
        const nuevoCliente = req.body;
        try {
          const crearcliente = await clienteService.crearCliente(nuevoCliente);
          util.setSuccess(201, 'Cliente creado!', crearcliente);
          return util.send(res);
        } catch (error) {
          util.setError(400, error.message);
          return util.send(res);
        }
      }
    
      static async actualizarCliente(req, res) {
        const clienteActualiza = req.body;
        const { id } = req.params;
        if (!Number(id)) {
          util.setError(400, 'Please input a valid numeric value');
          return util.send(res);
        }
        try {
          const clienteActualizado = await clienteService.actualizarCliente(id, clienteActualiza);
          if (!clienteActualizado) {
            util.setError(404, `No se pudo actualizar el cliente con el ID: ${id}`);
          } else {
            util.setSuccess(200, 'Cliente actualizado', clienteActualizado);
          }
          return util.send(res);
        } catch (error) {
          util.setError(404, error);
          return util.send(res);
        }
      }
    
      static async consultarCliente(req, res) {
        const { id } = req.params;
    
        if (!Number(id)) {
          util.setError(400, 'Por favor ingrese un Id valido.');
          return util.send(res);
        }
    
        try {
          const cliente = await clienteService.consultarCliente(id);
    
          if (!cliente) {
            util.setError(404, `No se pudo encontrar el cliente con ID: ${id}`);
          } else {
            util.setSuccess(200, 'Cliente encontrado', cliente);
          }
          return util.send(res);
        } catch (error) {
          util.setError(404, error);
          return util.send(res);
        }
      }
    
      static async eliminarCliente(req, res) {
        const { id } = req.params;
        console.log(id);
        if (!Number(id)) {
          util.setError(400, 'Por favor ingrese un Id valido');
          return util.send(res);
        }
    
        try {
          const clienteEliminar = await clienteService.eliminarCliente(id);
    
          if (clienteEliminar) {
            util.setSuccess(200, 'Cliente eliminado');
          } else {
            util.setError(404, `Cliente con id ${id} no pudo ser eliminado o no se encuentra en base de datos.`);
          }
          return util.send(res);
        } catch (error) {
          util.setError(400, error);
          return util.send(res);
        }
      }
  
    
  }
  
export default clientesController;