const express = require("express");
const app = express();
const msg = require("../lib/message");
const result = new msg.MessageBuilder()
  .setOrigen("clientes-services")
  .build();
const rest_services = require("../services/services");


/**
 * Funciones para unidades de empaque de los articulos
 */
app.get("/getDataClients", rutassecure, (req, res) => {
  console.log(("Cuerpo", req.body));
  rest_unidades
    .getDataUnitArticiles(req)
    .then(response => {
      return res.json(response);
    })
    .catch(err => {
      result.success = false;
      result.message = "Falla en la ejecución " + err;
      return res.json(result);
    });
});

app.post("/createUnitsArticles", rutassecure, (req, res) => {
  console.log(("Cuerpo", req.body));
  rest_unidades
    .createUnitsArticles(req)
    .then(response => {
      return res.json(response);
    })
    .catch(err => {
      result.success = false;
      result.message = "Falla en la ejecución " + err;
      return res.json(result);
    });
});

app.put("/updateUnitsArticles", rutassecure, (req, res) => {
  console.log(("Cuerpo", req.body));
  rest_unidades
    .updateUnitsArticles(req)
    .then(response => {
      return res.json(response);
    })
    .catch(err => {
      result.success = false;
      result.message = "Falla en la ejecución " + err;
      return res.json(result);
    });
});

app.delete("/deleteUnitsArticles", rutassecure, (req, res) => {
  console.log(("Cuerpo", req.body));
  rest_unidades
    .deleteUnitsArticles(req)
    .then(response => {
      return res.json(response);
    })
    .catch(err => {
      result.success = false;
      result.message = "Falla en la ejecución " + err;
      return res.json(result);
    });
});

module.exports = app;
