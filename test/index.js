const assert = require('assert')
const { deepclone } = require('../src/index.js')

console.log(deepclone)

describe('my deepclone', () => {
  it('deepclone is a function', () => assert.strictEqual('function', typeof deepclone))
  describe('should clone basic type', () => {
    it('should clone null', () => assert.strictEqual(null, deepclone(null)))
    it('should clone number', () => assert.strictEqual(3, deepclone(3)))
    it('should clone string', () => assert.strictEqual('abc', deepclone('abc')))
    it('should clone boolean', () => assert.strictEqual(true, deepclone(true)))
    it('should clone undefined', () => assert.strictEqual(undefined, deepclone(undefined)))
  })
  describe('should clone object', () => {
    it('should clone Object')
  })
})

