
module.exports = (sequelize, DataTypes) => {
  const clientes = sequelize.define('clientes', {
    id_cliente: {
      allowNull: false,     
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion_facturacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion_correspondencia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estrato: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return clientes;
};