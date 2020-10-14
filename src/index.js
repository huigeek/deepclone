function isObject (target) {
  const type = typeof target
  return (target !== null) && ['object', 'function'].includes(type)
}

function getInit (target) {
  const Cstor = target.constructor
  return new Cstor()
}

function deepclone (target) {
  // return types: null, number, string, boolean, undefined
  if (!isObject(target)) return target

  // types left: Object, Array, Function, Date, RegExp, Map, Set, WeakMap, WeakSet...
  let result = getInit(target)
  
  for (const key in target) { // only Object, todo => other object
    result[key] = deepclone(target[key])
  }

  return result
}

module.exports = { deepclone }
