import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';

chai.use(chatHttp);
const { expect } = chai;

describe('Testing para el API clientes:', () => {
  it('creando un cliente', (done) => {
    const cliente = {
      id_cliente:1993,
      nombres: 'Oscar Javier Mendoza Ruiz',
      direccion_facturacion: 'Calle 123',
      direccion_correspondencia: 'Calle falsa 123',
      estrato:2
    };
    chai.request(app)
      .post('/api/v1/crearCliente')
      .set('Accept', 'application/json')
      .send(cliente)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id_cliente: cliente.id_cliente,
          nombres: cliente.nombres,
          direccion_facturacion: cliente.direccion_facturacion,
          direccion_correspondencia:cliente.direccion_correspondencia,
          estrato:cliente.estrato
        });
        done();
      });
  });

  it('Crear un cliente con parametros imcompletos', (done) => {
    const cliente = {
        nombres: 'Oscar Javier Mendoza Ruiz',
        estrato: 2
    };
    chai.request(app)
      .post('/api/v1/crearCliente')
      .set('Accept', 'application/json')
      .send(cliente)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('Consultar todos los clientes', (done) => {
    chai.request(app)
      .get('/api/v1/clientes')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property('id_cliente');
        res.body.data[0].should.have.property('nombres');
        res.body.data[0].should.have.property('direccion_facturacion');
        res.body.data[0].should.have.property('direccion_correspondencia');
        res.body.data[0].should.have.property('estrato');
        done();
      });
  });

  it('Consultar un cliente por medio de un ID', (done) => {
    const id_cliente = 11;
    chai.request(app)
      .get(`/api/v1/consultarCliente/${id_cliente}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data.should.have.property('id_cliente');
        res.body.data.should.have.property('nombres');
        res.body.data.should.have.property('direccion_facturacion');
        res.body.data.should.have.property('direccion_correspondencia');
        res.body.data.should.have.property('estrato');
        done();
      });
  });

  it('Consultar un cliente con id_cliente invalido', (done) => {
    const id_cliente = 8888;
    chai.request(app)
      .get(`/api/v1/consultarCliente/${id_cliente}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`No se pudo encontrar el cliente con ID: ${id_cliente}`);
        done();
      });
  });

  it('Consultar un cliente con tipo de dato diferente a numero entero', (done) => {
    const id_cliente = 'aaa';
    chai.request(app)
      .get(`/api/v1/consultarCliente/${id_cliente}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
                            .eql('Por favor ingrese un valor numerico');
        done();
      });
  });

  it('Actualizar cliente', (done) => {
    const id_cliente = 11;
    const actualizarCliente = {
      id_cliente:id_cliente,
      nombres: 'Oscar Javier Mendoza Ruiz Actualizados',
      direccion_facturacion: 'Calle 123 Actualizados',
      direccion_correspondencia: 'Calle falsa 123 Actualizados',
      estrato:9
    };
    chai.request(app)
      .put(`/api/v1/actualizarCliente/${id_cliente}`)
      .set('Accept', 'application/json')
      .send(actualizarCliente)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id_cliente).equal(actualizarCliente.id_cliente);
        expect(res.body.data.nombres).equal(actualizarCliente.nombres);
        expect(res.body.data.direccion_correspondencia).equal(actualizarCliente.direccion_correspondencia);
        expect(res.body.data.direccion_facturacion).equal(actualizarCliente.direccion_facturacion);
        expect(res.body.data.estrato).equal(actualizarCliente.estrato);
        done();
      });
  });

  it('Actualizar cliente con id Invalido', (done) => {
    const id_cliente = '9999';
    const actualizarCliente = {
      id_cliente:id_cliente,
      nombres: 'Oscar Javier Mendoza Ruiz Actualizados',
      direccion_facturacion: 'Calle 123 Actualizados',
      direccion_correspondencia: 'Calle falsa 123 Actualizados',
      estrato:9
    };
    chai.request(app)
      .put(`/api/v1/actualizarCliente/${id_cliente}`)
      .set('Accept', 'application/json')
      .send(actualizarCliente)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`No se pudo encontrar el cliente ID: ${id_cliente}`);
        done();
      });
  });

  it('Actualizar cliente con un id no numerico', (done) => {
    const id_cliente = 'ggg';
    const actualizarCliente = {
        id_cliente:id_cliente,
        nombres: 'Oscar Javier Mendoza Ruiz Actualizados',
        direccion_facturacion: 'Calle 123 Actualizados',
        direccion_correspondencia: 'Calle falsa 123 Actualizados',
        estrato:9
    };
    chai.request(app)
      .put(`/api/v1/actualizarCliente/${id_cliente}`)
      .set('Accept', 'application/json')
      .send(actualizarCliente)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
                            .eql('Por favor ingrese un valor numerico valido');
        done();
      });
  });


  it('Eliminar un cliente', (done) => {
    const id_cliente = 1;
    chai.request(app)
      .delete(`/api/v1/eliminarCliente/${id_cliente}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({});
        done();
      });
  });

  it('Eliminar un cliente con id invalido', (done) => {
    const id_cliente = 777;
    chai.request(app)
      .delete(`/api/v1/eliminarCliente/${id_cliente}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Cliente con el Id ${id_cliente} no se encuentra`);
        done();
      });
  });

  it('Eliminar un cliente con un valor id_cliente no numerico', (done) => {
    const id_cliente = 'bbb';
    chai.request(app)
      .delete(`/api/v1/eliminarCliente/${id_cliente}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message').eql('Por favor ingrese un valor numerico');
        done();
      });
  });
});