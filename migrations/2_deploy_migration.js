const Agrochain = artifacts.require("Agrochain");

module.exports = function (deployer) {
  deployer.deploy(Agrochain);
};
