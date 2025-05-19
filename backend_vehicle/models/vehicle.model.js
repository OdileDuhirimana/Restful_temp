const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Vehicle = sequelize.define("Vehicle", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  plateNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  vehicleType: {
    type: DataTypes.ENUM("Car", "Truck", "MotorCycle", "Bicycle"),
    allowNull: false,
  },
  size: {
    type: DataTypes.ENUM("Medium", "Small", "Large"),
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Vehicle.associate = (models) => {
  Vehicle.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE" });
};

module.exports = Vehicle;
