import facturasServices from "../services/facturaService";
import Util from "../utils/Utils";

const util = new Util();

class facturasController {
  static async getAllFacturas(req, res) {
    try {
      const allfacturas = await facturasServices.getAllFacturas();
      if (allfacturas.length > 0) {
        util.setSuccess(200, "facturas encontradas", allfacturas);
      } else {
        util.setSuccess(200, "No se encuentran facturas");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async crearFactura(req, res) {
    if (!req.body.id_cliente || !req.body.periodo || !req.body.valor) {
      util.setError(400, "Por favor ingrese todos los campos.");
      return util.send(res);
    }
    const nuevofactura = req.body;
    try {
      const crearfactura = await facturasServices.crearFactura(nuevofactura);
      util.setSuccess(201, "factura creada!", crearfactura);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async consultarFactura(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Por favor ingrese un Id valido.");
      return util.send(res);
    }

    try {
      const factura = await facturasServices.consultarFactura(id);

      if (!factura) {
        util.setError(404, `No se pudo encontrar el factura con ID: ${id}`);
      } else {
        util.setSuccess(200, "factura encontrada", factura);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }
}

export default facturasController;
