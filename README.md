# 深拷贝

## 测试

测试框架使用 mocha, 断言使用的是 node 的  assert 模块

```sh
yarn test
```

## 简单实现及弊端

深拷贝的简单实现，是使用`JSON.parse(JSON.string(xx))`，把 js 对象序列化为 JSON 字符串，再把 JSON 字符串解析成 js 对象。

但使用 `JSON.parse(JSON.string(xx))` 也有一些弊端：

- Date 对象经过处理后，类型会改变，变成字符串的形式
- RegExp 对象经过处理后，会变成空对象
- function 里如果有 undefined，返回函数会丢失函数或 undefined
- 对象里的 NaN、Infinity、-Infinity 会变成 null
- 只能序列化对象的可枚举的自有属性
- 不能对引用自身的环进行深拷贝

## 实现

1. 如果是基本数据类型直接返回(这里遗忘了Symbol)
2. 如果是正则和日期，使用内置对象构建，然后直接返回
3. 如果是函数，这里没有想到特别好的方式，参考的网上写法
4. 可遍历的对象中，对 Set 和 Map 遍历，使用不同的赋值
5. 数组和对象，直接递归

## 待完善
  
1. 基本数据类型还未处理 Symbol
2. 函数还没想到更好的方法
3. 循环引用的情况未处理，应该使用 Map(WeakMap) 设置缓存，否则会栈溢出。

## 补充
如果拷贝的对象含有内置类型并且不包含函数，可以使用 Web API 中的 MessageChannel, 可以处理`undefined`和循环引用

```
function structureClone(obj){
  return new Promise(resolve => {
    const {port1, port2} = new MessageChannel()
    // 这里是异步的
    port2.onmessage = ev => resolve(ev.data)
    port1.postMessage(obj)
  })
}

var obj = {
  a: undefined,
  b: {
    c: 2
  }
}

obj.b.d = obj.b

const test = async () => {
  const clone = await structureClone(obj)
  console.log('clone', clone)
}

test()

```