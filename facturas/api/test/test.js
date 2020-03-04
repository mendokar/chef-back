import chai from "chai";
import chatHttp from "chai-http";
import "chai/register-should";
import app from "../index";

chai.use(chatHttp);
const { expect } = chai;

describe("Testing para el API facturas:", () => {
  it('Creando una factura', (done) => {
    const factura = {
      id_factura:1234560,
      id_cliente: 1993,     
      valor:25000,
      periodo: 'DICIEMBRE',
      consumo: 150,
      estado: 'PENDIENTE'
    };
    chai
      .request(app)
      .post("/api/v1/crearFactura")
      .set("Accept", "application/json")
      .send(factura)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id_factura: factura.id_factura,
          id_cliente: factura.id_cliente,
          periodo: factura.periodo,
          consumo: factura.consumo,
          valor: factura.valor,
          estado: factura.estado                 
        });
        done();
      });
  });

  it("Crear una factura con parametros imcompletos", done => {
    const factura = {
      periodo: "DICIEMBRE",
      valor: 25000
    };
    chai
      .request(app)
      .post("/api/v1/crearFactura")
      .set("Accept", "application/json")
      .send(factura)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it("Consultar todas las facturas", done => {
    chai
      .request(app)
      .get("/api/v1/facturas")
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);        
        res.body.data[0].should.have.property("id_factura");
        res.body.data[0].should.have.property("id_cliente");
        res.body.data[0].should.have.property("periodo");
        res.body.data[0].should.have.property("consumo");
        res.body.data[0].should.have.property("valor");
        res.body.data[0].should.have.property("estado");
        done();
      });
  });

  it("Consultar una factura por medio de un ID", done => {
    const id_factura = 12345670;
    chai
      .request(app)
      .get(`/api/v1/consultarFactura/${id_factura}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data.should.have.property("id_factura");
        res.body.data.should.have.property("id_cliente");
        res.body.data.should.have.property("periodo");
        res.body.data.should.have.property("consumo");
        res.body.data.should.have.property("valor");
        res.body.data.should.have.property("estado");
        done();
      });
  });

  it("Consultar un factura con id_factura invalida", done => {
    const id_factura = 8888;
    chai
      .request(app)
      .get(`/api/v1/consultarFactura/${id_factura}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property("message")
          .eql(`No se pudo encontrar el factura con ID: ${id_factura}`);
        done();
      });
  });

  it("Consultar una factura con tipo de dato diferente a numero entero", done => {
    const id_factura = "aaa";
    chai
      .request(app)
      .get(`/api/v1/consultarFactura/${id_factura}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property("message")
          .eql("Por favor ingrese un valor numerico");
        done();
      });
  });
});
