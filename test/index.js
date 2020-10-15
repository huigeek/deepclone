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
    it('should clone symbol', () => {
      const a = Symbol('xx')
      const b = deepclone(a)
      assert.strictEqual(a, b)
    })
  })
  describe('should clone object', () => {
    it('should clone basic object', () => {
      const a = {
        name: '一年级',
        children: {
          name: '3班',
          numbers: 56
        }
      }
      const b = deepclone(a)
      assert.deepEqual(a, b)
    })
    it('should clone array', () => {
      const a = [[3,2],[[1,5,[9,2]]],[0,5]]
      const b = deepclone(a)
      assert.deepEqual(a, b)
    })
    it('should clone function', () => {
      const a = function xx (x, y) {
        const m = x + 1
        const n = y * 2
        return m + n
      }
      const b = deepclone(a)
      assert.notEqual(a, b)
      assert.strictEqual(a(), b())
    })
    it('should clone regular expressions', () => {
      const a = /[a-zA-Z]*/g
      const b = deepclone(a)
      assert.notEqual(a, b)
      assert.strictEqual(a.source, b.source)
      assert.strictEqual(a.flags, b.flags)
    })
    it('should clone date', () => {
      const a = new Date()
      const b = deepclone(a)
      assert.notEqual(a, b)
      assert.strictEqual(a.getTime(), b.getTime())
    })
    it('should clone set', () => {
      const a = new Set([1, 3, 3, ,5])
      const b = deepclone(a)
      assert.notEqual(a, b)
      assert.strictEqual(a.has(1), b.has(1))
    })
    it('should clone map', () => {
      const a = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three']
      ])
      const b = deepclone(a)
      assert.notEqual(a, b)
      assert.strictEqual(a.get(1), b.get(1))
    })

  })
})

