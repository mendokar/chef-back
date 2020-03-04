import pagosServices from "../services/pagosService";
import Util from "../utils/Utils";

const util = new Util();

class pagosController {
  static async getAllPagos(req, res) {
    try {
      const allpagos = await pagosServices.getAllPagos();
      if (allpagos.length > 0) {
        util.setSuccess(200, "pagos encontradas", allpagos);
      } else {
        util.setSuccess(200, "No se encuentran pagos");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async crearPago(req, res) {
    if (!req.body.id_pago ||!req.body.id_factura || !req.body.valor || !req.body.estado) {
      util.setError(400, "Por favor ingrese todos los campos.");
      return util.send(res);
    }
    const nuevoPago = req.body;
    try {
      const crearpago = await pagosServices.crearPago(nuevoPago);
      util.setSuccess(201, "Pago creado!", crearpago);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async consultarPago(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Por favor ingrese un Id valido.");
      return util.send(res);
    }

    try {
      const pago = await pagosServices.consultarPago(id);

      if (!pago) {
        util.setError(404, `No se pudo encontrar el factura con ID: ${id}`);
      } else {
        util.setSuccess(200, "pago encontrado", pago);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }
}

export default pagosController;
