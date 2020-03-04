'use strict';
module.exports = (sequelize, DataTypes) => {
  const pagos = sequelize.define('pagos', {
    id_pago: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_factura: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    valor: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    valor_parcial: {
      allowNull: true,
      type: DataTypes.FLOAT
    },
    estado: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });

  return pagos;
};