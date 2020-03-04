import chai from "chai";
import chatHttp from "chai-http";
import "chai/register-should";
import app from "../index";

chai.use(chatHttp);
const { expect } = chai;

describe("Testing para el API pagos:", () => {
  it('Creando una pago', (done) => {
    const pago = {
      id_pago:1234560,
      id_factura: 1993,     
      valor:25000,
      valor_parcial:0,
      estado: 'PENDIENTE'
    };
    chai
      .request(app)
      .post("/api/v1/crearPago")
      .set("Accept", "application/json")
      .send(pago)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id_pago: pago.id_pago,
          id_factura: pago.id_factura,        
          valor: pago.valor,
          valor_parcial: pago.valor_parcial,
          estado: pago.estado                 
        });
        done();
      });
  });

  it("Crear una pago con parametros imcompletos", done => {
    const pago = {
      estado: "CANCELADO",
      valor: 25000
    };
    chai
      .request(app)
      .post("/api/v1/crearPago")
      .set("Accept", "application/json")
      .send(pago)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it("Consultar todas las pagos", done => {
    chai
      .request(app)
      .get("/api/v1/pagos")
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);        
        res.body.data[0].should.have.property("id_pago");
        res.body.data[0].should.have.property("id_factura");
        res.body.data[0].should.have.property("valor");
        res.body.data[0].should.have.property("valor_parcial");
        res.body.data[0].should.have.property("estado");
        done();
      });
  });

  it("Consultar una pago por medio de un ID", done => {
    const id_pago = 12345670;
    chai
      .request(app)
      .get(`/api/v1/consultarPagos/${id_pago}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data.should.have.property("id_pago");
        res.body.data.should.have.property("id_factura");
        res.body.data.should.have.property("valor");
        res.body.data.should.have.property("valor_parcial");
        res.body.data.should.have.property("estado");
        done();
      });
  });

  it("Consultar un pago con id_pago invalida", done => {
    const id_pago = 8888;
    chai
      .request(app)
      .get(`/api/v1/consultarPagos/${id_pago}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property("message")
          .eql(`No se pudo encontrar el pago con ID: ${id_pago}`);
        done();
      });
  });

  it("Consultar una pago con tipo de dato diferente a numero entero", done => {
    const id_pago = "aaa";
    chai
      .request(app)
      .get(`/api/v1/consultarPagos/${id_pago}`)
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
