/* eslint-disable no-undef */
const Migrations = artifacts.require("Migrations");
const Airline = artifacts.require("Airline");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Airline);
};
