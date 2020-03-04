'use strict';
module.exports = (sequelize, DataTypes) => {
  const facturas = sequelize.define('facturas', {
    id_factura: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_cliente: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    periodo: {
      allowNull: false,
      type: DataTypes.STRING
    },
    consumo: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    valor: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    estado: {
      allowNull: false,
      type: DataTypes.STRING
    },
  });
  return facturas;
};