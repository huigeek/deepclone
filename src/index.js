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

  // types: Function, Date, RegExp
  if (target instanceof Function) {
    const bodyReg = /(?<={)(.|\n)+(?=})/m
    const paramReg = /(?<=\().+(?=\)\s+{)/
    const funcString = target.toString()
    if (target.prototype) {
      const param = paramReg.exec(funcString)
      const body = bodyReg.exec(funcString)
      if (body) {
        if (param) {
          const paramArr = param[0].split(',')
          return new Function(...paramArr, body[0])
        } else {
          return new Function(body[0])
        }
      } else {
        return null
      }
    } else {
      return eval(funcString)
    }
  }
  else if (target instanceof RegExp) {
    return new RegExp(target)
  }
  else if (target instanceof Date) {
    return new Date(target)
  }

  let result = getInit(target)

  // types: Set, Map
  if (target instanceof Set) {
    target.forEach(v => result.add(v))
    return result
  }
  else if (target instanceof Map) {
    target.forEach((v, k) => result.set(k, v))
    return result
  }

  for (const key in target) {
    result[key] = deepclone(target[key])
  }

  return result
}

module.exports = { deepclone }
