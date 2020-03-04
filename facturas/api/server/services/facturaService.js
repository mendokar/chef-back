import database from '../src/models';

class facturasServices {
    static async getAllFacturas(){
        try {
            return await database.facturas.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async crearFactura(nuevaFactura) {
        try {
          return await database.facturas.create(nuevaFactura);
        } catch (error) {
          throw error;
        }
      }          
    
      static async consultarFactura(id) {
        try {
          const factura = await database.facturas.findOne({
            where: { id_factura: Number(id) }
          });
    
          return factura;
        } catch (error) {
          throw error;
        }
      }
}

module.exports = facturasServices;