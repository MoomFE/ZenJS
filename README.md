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
| 23+    | 21+     | 6+     | 4.4+    | 12+  | 10+               |


<br>

## 安装

### npm 安装
```bash
  npm install @moomfe/zenjs
```

### CDN

> jsdelivr
> <br>
> https://cdn.jsdelivr.net/npm/@moomfe/zenjs@3.3.1/dist/

> unpkg
> <br>
> https://unpkg.com/@moomfe/zenjs@3.3.1/dist/


<br>

> 在 v2.1.0 版本之前, ZenJS 需要 polyfill 作为依赖项 :
* [babel-polyfill](https://babeljs.io/docs/usage/polyfill/)
* [polyfill.io](https://cdn.polyfill.io/v2/docs/)

<br>

## 大小 - 版本详解

### Default
|                    | Default | Gzip    |  -  | Module    | Use in  |
| :-                 | :-      | :-      | :-: | :-        | :-      |
| zen.js             | 54.95kb | 15.09kb | \|  | UMD       | Browser |
| zen.min.js         | 19.90kb | 7.29kb | \|  | UMD       | Browser |
| zen.common.js      | 51.14kb | 14.82kb | \|  | CommonJS  | [NodeJS](https://nodejs.org) or [browserify](http://browserify.org) or [webpack 1](https://webpack.github.io) |
| zen.esm.js         | 51.12kb | 14.81kb | \|  | ES Module | [webpack 2](https://webpack.js.org) or [rollup](http://rollupjs.org) |

### Fat : Default And DOM API
|                        | Default | Gzip    |  -  | Module    | Use in  |
| :-                     | :-      | :-      | :-: | :-        | :-      |
| zen.fat.js             | 86.75kb | 22.95kb | \|  | UMD       | Browser |
| zen.fat.min.js         | 30.66kb | 11.09kb | \|  | UMD       | Browser |
| zen.fat.common.js      | 80.94kb | 22.56kb | \|  | CommonJS  | [NodeJS](https://nodejs.org) or [browserify](http://browserify.org) or [webpack 1](https://webpack.github.io) |
| zen.fat.esm.js         | 80.92kb | 22.54kb | \|  | ES Module | [webpack 2](https://webpack.js.org) or [rollup](http://rollupjs.org) |

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
  - $findLast
  - $findLastIndex
  - $findAll
  - $get
  - $set
  - $edit
  - $inArray
  - $move
  - $moveRange
  - $push
  - $pop
  - $unshift
  - $shift
  - $splice

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

- Number.prototype
  - $add / $jia
  - $subtract / $jian
  - $multiply / $cheng
  - $divide / $chu

- Math
  - $random
  - $add / $jia
  - $subtract / $jian
  - $multiply / $cheng
  - $divide / $chu
  - $mean

- String
  - $random
  - $someRandom

- String.prototype
  - $replaceAll
  - $toCapitalize

- Date
  - $parse
  - $format

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

- Function.prototype
  - $after
  - $args
  - $one / $once

- Window / Global
  - $typeof
  - $querystring
    - stringify
    - parse

- Document ( Fat )
  - $id
  - $ready

- Window ( Fat )
  - $ready

- Element.prototype ( Fat )
  - $addClass
  - $removeClass / $deleteClass
  - $hasClass
  - $toggleClass
  - $is
  - $not
  - $first / $firstChild
  - $last / $lastChild
  - $next
  - $prev
  - $nextAll
  - $prevAll
  - $child / $children
  - $parent
  - $parents
  - $siblings
  - $append
  - $prepend
  - $appendTo
  - $prependTo
  - $before
  - $after
  - $delete / $remove
  - $query / $find
  - $queryFirst / $findFirst
  - $replaceWith / $replace
  - _nodeName
  - _index
  - _width
  - _height
  - _html
  - _val / _value

- EventTarget.prototype ( Fat )
  - $data
  - $hasData
  - $deleteData / $removeData
  - $on
  - $one / $once
  - $off
  - $emit

- document ( Plugins )
  - $cookie
  - $deleteCookie / $removeCookie

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