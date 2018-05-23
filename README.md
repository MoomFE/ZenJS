<div align="center">
  <h1>ZenJS</h1>
  <p>
    ZenJS 是一个高性能的 JavaScript 工具库。
  </p>
</div>

<br>

## 浏览器支持
---
* Chrome：23+
* Edge：12+
* Firefox：21+
* Internet Explorer：9+
* Safari：6+
* Android: 4.4+

## 使用
---
ZenJS 使用了最新的语法与方法，语法使用 babel 进行转义，polyfill 则需要自行添加。

* [babel-polyfill](https://babeljs.io/docs/usage/polyfill/)
* [polyfill.io](https://cdn.polyfill.io/v2/docs/)

```html
  <script src="--- Include your polyfill ---"></script>
  <script src="Zen.min.js"></script>
```

## 参考
### 更详细的使用方法及介绍请参照 [index.d.ts](https://github.com/MoomFE/ZenJS/blob/master/index.d.ts)
---


- Array
  - $create
  - $add
  - $delete
  - $deleteValue
  - $get
  - $inArray
  - $set
  - $push
  - $unshift
  - $pop
  - $shift

- document
  - $ready

- Math
  - $mean
  - $random
  - $randomPlus

- Number
  - $isNumber

- Object
  - $assign
  - $create
  - $each
  - $isEmptyObject
  - $isPlainObject

- Object.prototype
  - $delete
  - $deleteValue
  - $get
  - $set
  - $self
  - __self__

- String
  - $random
  - $someRandom

- String.prototype
  - $toCapitalize
  - $replaceAll

- window
  - $ready
  - $typeof
  - $querystring.stringify
  - $querystring.parse

## 在本地构建ZenJS
---
克隆到本地:
```bash
git clone https://github.com/MoomFE/ZenJS.git
```
安装依赖项:
```bash
cd ZenJS && npm install
```
构建项目:
```bash
npm run build
```
实时监听项目修改:
```bash
npm run watch
```