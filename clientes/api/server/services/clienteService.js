import database from '../src/models';

class clientesServices {
    static async getAllClientes(){
        try {
            return await database.clientes.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async crearCliente(nuevoCliente) {
        try {
          return await database.clientes.create(nuevoCliente);
        } catch (error) {
          throw error;
        }
      }
    
      static async actualizarCliente(id, actualizarCliente) {
        try {
          const clienteActualiza = await database.clientes.findOne({
            where: { id_cliente: Number(id) }
          });
    
          if (clienteActualiza) {
            await database.clientes.update(actualizarCliente, { where: { id_cliente: Number(id) } });
    
            return actualizarCliente;
          }
          return null;
        } catch (error) {
          throw error;
        }
      }
    
      static async consultarCliente(id) {
        try {
          const cliente = await database.clientes.findOne({
            where: { id_cliente: Number(id) }
          });
    
          return cliente;
        } catch (error) {
          throw error;
        }
      }
    
      static async eliminarCliente(id) {
        try {
          const clienteElimina = await database.clientes.findOne({ where: { id_cliente: Number(id) } });
          console.log(clienteElimina);
    
          if (clienteElimina) {
            const eliminarCliente = await database.clientes.destroy({
              where: { id_cliente: Number(id) }
            });
            return eliminarCliente;
          }
          return null;
        } catch (error) {
          throw error;
        }
      }
}

module.exports = clientesServices;