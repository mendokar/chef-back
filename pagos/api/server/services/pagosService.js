import database from '../src/models';

class pagosServices {
    static async getAllPagos(){
        try {
            return await database.pagos.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async crearPago(nuevoPago) {
        try {
          return await database.pagos.create(nuevoPago);
        } catch (error) {
          throw error;
        }
      }          
    
      static async consultarPago(id) {
        try {
          const factura = await database.pagos.findOne({
            where: { id_pago: Number(id) }
          });
    
          return factura;
        } catch (error) {
          throw error;
        }
      }
}

module.exports = pagosServices;