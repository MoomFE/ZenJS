<div align="center">
  <h1>ZenJS</h1>
  <p>
    ZenJS 是一个高性能的 JavaScript 工具库。
  </p>
</div>

<br>
<br>

## 浏览器支持

| Chrome | Firefox | Safari | Android | Edge | Internet Explorer |
| :-     | :-      | :-     | :-      | :-   | :-                |
| 23+    | 21+     | 6+     | 4.4+    | 12+  | 9+                |


<br>

## 安装

### npm 安装
```bash
  npm install @moomfe/zenjs
```

### CDN
```html
  <!-- jsdelivr -->
  <script src="https://cdn.jsdelivr.net/npm/@moomfe/zenjs@2.3.0/dist/zen.min.js"></script>
```
```html
  <!-- unpkg -->
  <script src="https://unpkg.com/@moomfe/zenjs@2.3.0/dist/zen.min.js"></script>
```


<br>

> 在 v2.1.0 版本之前, ZenJS 需要 polyfill 作为依赖项 :
* [babel-polyfill](https://babeljs.io/docs/usage/polyfill/)
* [polyfill.io](https://cdn.polyfill.io/v2/docs/)

<br>

## 大小 - 版本详解

### Default
|                    | Default | Gzip    |  -  | Module    | Use in  |
| :-                 | :-      | :-      | :-: | :-        | :-      |
| zen.js             | 46.21kb | 12.58kb | \|  | UMD       | Browser |
| zen.min.js         | 16.70kb | 6.13kb | \|  | UMD       | Browser |
| zen.common.js      | 42.91kb | 12.38kb | \|  | CommonJS  | [NodeJS](https://nodejs.org) or [browserify](http://browserify.org) or [webpack 1](https://webpack.github.io) |
| zen.esm.js         | 42.89kb | 12.36kb | \|  | ES Module | [webpack 2](https://webpack.js.org) or [rollup](http://rollupjs.org) |

### All : Default And DOM API
|                        | Default | Gzip    |  -  | Module    | Use in  |
| :-                     | :-      | :-      | :-: | :-        | :-      |
| zen.all.js             | 46.21kb | 12.58kb | \|  | UMD       | Browser |
| zen.all.min.js         | 16.70kb | 6.13kb | \|  | UMD       | Browser |
| zen.all.common.js      | 42.91kb | 12.38kb | \|  | CommonJS  | [NodeJS](https://nodejs.org) or [browserify](http://browserify.org) or [webpack 1](https://webpack.github.io) |
| zen.all.esm.js         | 42.89kb | 12.36kb | \|  | ES Module | [webpack 2](https://webpack.js.org) or [rollup](http://rollupjs.org) |

<br>

## 参考
### 更详细的使用方法及介绍请参照 [index.d.ts](./index.d.ts)


- Array
  - $chunk
  - $copy
  - $create
  - $each
  - $equals
  - $isArrayLike
  - $toArray

- Array.prototype
  - $chunk
  - $each
  - $equals
  - $add
  - $delete / $remove
  - $deleteValue / $removeValue
  - $concat
  - $concatTo
  - $find
  - $findIndex
  - $get
  - $set / $edit
  - $inArray
  - $move
  - $moveRange
  - $push
  - $pop
  - $unshift
  - $shift

- Object
  - $assign
  - $equals
  - $each
  - $isEmptyObject
  - $isPlainObject

- Object.prototype
  - $assign
  - $equals
  - $each
  - $get
  - $set / $edit
  - $delete / $remove
  - $deleteValue / $removeValue
  - $self

- Number
  - $isNumber

- Math
  - $random

- String.prototype
  - $toCapitalize

- Date
  - $parse

- Date.prototype
  - $dayjs
  - $isValid
  - $year
  - $month
  - $date
  - $day
  - $hour
  - $minute
  - $second
  - $millisecond
  - $set
  - $add
  - $subtract
  - $startOf
  - $endOf
  - $format
  - $diff
  - $daysInMonth
  - $toArray
  - $toObject
  - $isBefore
  - $isSame
  - $isAfter

- Window / Global
  - $typeof

  <!-- - $get
  - $inArray
  - $set / $edit
  - $move
  - $moveRange
  - $push
  - $unshift
  - $pop
  - $shift

- document
  - $cookie
  - $deleteCookie / $removeCookie
  - $id
  - $ready
  - $query
  - $queryFirst

- Element.prototype
  - \_index
  - \_nodeName
  - \_width
  - \_height
  - \_val / \_value
  - \_html
  - $addClass
  - $deleteClass / $removeClass
  - $hasClass
  - $toggleClass
  - $append
  - $prepend
  - $before
  - $after
  - $child / $children
  - $first / $firstChild
  - $last / $lastChild
  - $is
  - $not
  - $query
  - $queryFirst
  - $delete / $remove
  - $replaceWith / $replace
  - $parent
  - $parents
  - $next
  - $prev
  - $nextAll
  - $prevAll
  - $siblings
  - $selectText

- EventTarget.prototype
  - $data
  - $hasData
  - $deleteData / $removeData
  - $on
  - $one / $once
  - $off
  - $emit

- Math
  - $plus / $jia
  - $minus / $jian
  - $multiply / $cheng
  - $divide / $chu
  - $mean
  - $random
  - $randomPlus

- Object
  - $create
  - $each
  - $isEmptyObject
  - $isPlainObject

- Object.prototype
  - $delete / $remove
  - $deleteValue / $removeValue
  - $get
  - $set / $edit
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
  - $querystring.parse -->

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

<br>

## License

ZenJS is licensed under a [MIT  License](./LICENSE).