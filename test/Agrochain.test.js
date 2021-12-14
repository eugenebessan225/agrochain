const Agrochain = artifacts.require('./Agrochain.sol')

contract('Agrochain', (accounts) => {
  before(async () => {
    this.agrochain = await Agrochain.deployed()
  })

  it('deploys successfully', async () => {
    const address = await this.agrochain.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

})