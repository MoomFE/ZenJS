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
> https://cdn.jsdelivr.net/npm/@moomfe/zenjs@5.0.0-beta.5/dist/

> unpkg
> <br>
> https://unpkg.com/@moomfe/zenjs@5.0.0-beta.5/dist/


<br>

> 在 v2.1.0 版本之前, ZenJS 需要 polyfill 作为依赖项 :
* [babel-polyfill](https://babeljs.io/docs/usage/polyfill/)
* [polyfill.io](https://cdn.polyfill.io/v2/docs/)

<br>

## 大小 - 版本详解

### Default
|                    | Default | Gzip    |  -  | Module    | Use in  |
| :-                 | :-      | :-      | :-: | :-        | :-      |
| zen.js             | 56.70kb | 15.98kb | \|  | UMD       | Browser |
| zen.min.js         | 20.26kb | 7.64kb | \|  | UMD       | Browser |
| zen.common.js      | 52.83kb | 15.58kb | \|  | CommonJS  | [NodeJS](https://nodejs.org) or [browserify](http://browserify.org) or [webpack 1](https://webpack.github.io) |
| zen.esm.js         | 52.82kb | 15.57kb | \|  | ES Module | [webpack 2](https://webpack.js.org) or [rollup](http://rollupjs.org) |

### Fat : Default And DOM API
|                        | Default | Gzip    |  -  | Module    | Use in  |
| :-                     | :-      | :-      | :-: | :-        | :-      |
| zen.fat.js             | 101.65kb | 27.38kb | \|  | UMD       | Browser |
| zen.fat.min.js         | 36.19kb | 13.39kb | \|  | UMD       | Browser |
| zen.fat.common.js      | 94.96kb | 26.84kb | \|  | CommonJS  | [NodeJS](https://nodejs.org) or [browserify](http://browserify.org) or [webpack 1](https://webpack.github.io) |
| zen.fat.esm.js         | 94.94kb | 26.83kb | \|  | ES Module | [webpack 2](https://webpack.js.org) or [rollup](http://rollupjs.org) |

<br>

## 参考
### 更详细的使用方法及介绍请参照 [index.d.ts](./index.d.ts)


- Array
  - $chunk
  - $copy
  - $create
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
  - $findChunk
  - $findLast
  - $findLastIndex
  - $findLastChunk
  - $findAll
  - $findAllIndex
  - $findAllChunk
  - $findSome
  - $findSomeIndex
  - $findSomeChunk
  - $findLastSome
  - $findLastSomeIndex
  - $findLastSomeChunk
  - $findNot
  - $findNotIndex
  - $findNotChunk
  - $findLastNot
  - $findLastNotIndex
  - $findLastNotChunk
  - $findAllNot
  - $findAllNotIndex
  - $findAllNotChunk
  - $findSomeNot
  - $findSomeNotIndex
  - $findSomeNotChunk
  - $findLastSomeNot
  - $findLastSomeNotIndex
  - $findLastSomeNotChunk
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
  - $toCapitalize / $toUpperFirstCase
  - $toLowerFirstCase

- Date
  - $parse
  - $format
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
  - $diff
  - $valueOf
  - $unix
  - $daysInMonth
  - $toArray
  - $toObject
  - $isBefore
  - $isSame
  - $isAfter
  - $isBetween
  - $isSameOrBefore
  - $isSameOrAfter
  - $isLeapYear

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
  - $valueOf
  - $unix
  - $daysInMonth
  - $toArray
  - $toObject
  - $isBefore
  - $isSame
  - $isAfter
  - $isBetween
  - $isSameOrBefore
  - $isSameOrAfter
  - $isLeapYear

- Function.prototype
  - $after
  - $args
  - $one / $once

- RegExp
  - $parse

- Window / Global
  - $typeof
  - $querystring
    - stringify
    - parse
  - ZenJS
    - guid
    - assign
    - repeat
    - keys
    - entries
    - values
    - fromEntries
    - congruence
    - equals
    - define
    - defineValue
    - defineGet
    - intRandom
    - returnArg
    - returnTrue
    - returnFalse
    - noop
    - parametersDefault
    - parametersRest
    - isString
    - isBoolean
    - isArray
    - isNumber
    - isRegExp
    - isSet
    - isMap
    - isFunction
    - isObject
    - isReferenceType
    - mapSetToArray
  - dayjs

- Document ( Fat )
  - $id
  - $ready
  - $query / $find
  - $queryFirst / $findFirst

- Window ( Fat )
  - $ready

- Location ( Fat )
  - $search
  - $urlSearch

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
  - $prop
  - $hasProp
  - $removeProp / $deleteProp
  - $attr
  - $hasAttr
  - $removeAttr / $deleteAttr
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
  - $clone
  - $index
  - $html
  - $val / $value
  - $width
  - $height
  - $css
  - _nodeName

- EventTarget.prototype ( Fat )
  - $data
  - $hasData
  - $removeData/ $deleteData
  - $on
  - $one / $once
  - $off
  - $emit

- document ( Plugins )
  - $cookie
  - $removeCookie / $deleteCookie

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

## Include
  - [DAY.JS](https://github.com/iamkun/dayjs) \- [LICENSE](https://github.com/iamkun/dayjs/blob/master/LICENSE)
  - [JavaScript Cookie](https://github.com/js-cookie/js-cookie) \- [LICENSE](https://github.com/js-cookie/js-cookie/blob/master/LICENSE)

<br>

## License

ZenJS is licensed under a [MIT  License](./LICENSE).