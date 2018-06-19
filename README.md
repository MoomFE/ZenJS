<div align="center">
  <h1>ZenJS</h1>
  <p>
    ZenJS 是一个高性能的 JavaScript 工具库。
  </p>
</div>

<br>
<br>

## 使用

ZenJS 使用了最新的语法与方法，语法使用 babel 进行转义，polyfill 则需要自行添加。

* [babel-polyfill](https://babeljs.io/docs/usage/polyfill/)
* [polyfill.io](https://cdn.polyfill.io/v2/docs/)

```html
  <script src="--- Include your polyfill ---"></script>
  <script src="Zen.min.js"></script>
```

<br>

## 浏览器支持

<table>
  <thead>
    <tr>
      <th></th>
      <th>Chrome</th>
      <th>Firefox</th>
      <th>Safari</th>
      <th>Android</th>
      <th>Edge</th>
      <th>Internet Explorer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <strong>Use polyfill</strong>
      </td>
      <td>23+</td>
      <td>21+</td>
      <td>6+</td>
      <td>4.4+</td>
      <td>12+</td>
      <td>9+</td>
    </tr>
    <tr>
      <td>
        <strong>No polyfill</strong>
      </td>
      <td>45+</td>
      <td>34+</td>
      <td>9+</td>
      <td>5+</td>
      <td>12+</td>
      <td>No support</td>
    </tr>
  </tbody>
</table>


<br>

## 大小 - 版本详解
|               | Default | Gzip   |  -  | Module    | Use in  |
| :-            | :-      | :-     | :-: | :-        | :-      |
| zen.js        | 39.15kb | 10.22kb | \|  | UMD       | Browser |
| zen.min.js    | 13.75kb | 5.35kb | \|  | UMD       | Browser |
| zen.common.js | 36.31kb | 9.90kb | \|  | CommonJS  | [NodeJS](https://nodejs.org) or [browserify](http://browserify.org) or [webpack 1](https://webpack.github.io) |
| zen.esm.js    | 36.30kb | 9.88kb | \|  | ES Module | [webpack 2](https://webpack.js.org) or [rollup](http://rollupjs.org) |


<br>

## 参考
### 更详细的使用方法及介绍请参照 [index.d.ts](https://github.com/MoomFE/ZenJS/blob/master/index.d.ts)


- Array
  - $create

- Array.prototype
  - $add
  - $concat
  - $delete
  - $deleteValue
  - $each
  - $equals
  - $get
  - $inArray
  - $set
  - $push
  - $unshift
  - $pop
  - $shift

- document
  - $ready
  - $query
  - $queryFirst

- Element.prototype
  - $addClass
  - $removeClass
  - $hasClass
  - $toggleClass
  - $is
  - $not
  - $query
  - $queryFirst
  - $parent
  - $parents
  - $next
  - $prev
  - $nextAll
  - $prevAll

- EventTarget.prototype
  - $data
  - $hasData
  - $deleteData
  - $on
  - $one
  - $once
  - $off
  - $emit

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
  - $equals
  - $isEmptyObject
  - $isPlainObject

- Object.prototype
  - $delete
  - $deleteValue
  - $get
  - $set
  - $self
  - \_\_self\_\_

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

<br>

## 在本地构建ZenJS

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