const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

 const ParkingSlot = sequelize.define(
  "ParkingSlot", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    slotNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    size: {
      type: DataTypes.ENUM("Small", "Medium", "Large"),
      allowNull: false,
    },
    vehicleType: {
      type: DataTypes.ENUM("Car", "Truck", "MotorCycle", "Bicycle"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Available", "Occupied"),
      allowNull: false,
      defaultValue: "Available",
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  module.exports = ParkingSlot;