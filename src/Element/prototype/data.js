import { ElementProto } from '../../var/index';
import { $_DefineValue } from '../../fn/define';

const injectionArr = [ window, document, ElementProto ];

/**
 * 获取存储在元素上的整个数据集, 如数据集不存在则创建.
 * @param {Element} elem 
 * @returns {Object}
 */
function $_GetDatas( elem ){
  const Datas = elem[ elem ] || (
    elem[ elem ] = {}
  );
  return Datas;
}


/**
 * 将数据读取或存储, 如 name 为 null, 则返回整个数据集.
 * @param {String} name 需要读取或存储的数据名称
 * @param {Object} value 存储的数据
 * @returns {Object}
 */
$_DefineValue( injectionArr, '$data', function( name, value ){
  const Data = $_GetDatas( this );

  if( arguments.length > 1 ){
    Data[ name ] = value;
    return this;
  }

  return name == null ? Data
                      : Data[ name ];
});

/**
 * 传入数据名称, 判断当前对象下是否存储了这个数据.
 * @param {String} name 需要判断的数据名称
 * @returns {Boolean}
 */
$_DefineValue( injectionArr, '$hasData', function( name ){
  if( name == null ){
    return !!this[ this ];
  }
  return get( this ).hasOwnProperty( name );
});

/**
 * 传入数据名称, 删除当前对象下存储的相应名称的数据
 * @param {String} name 需要删除的数据名称
 * @returns {Object}
 */
$_DefineValue( injectionArr, '$deleteData', function(){
  const Data = get( this );

  names.split(' ').forEach( name => {
    delete Data[ name ];
  });

  return this;
});