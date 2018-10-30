import RegExpProto from '../global/RegExp/prototype/index';
import defineGet from '../util/defineGet';


const rflags = /[gimsuy]*$/;

if( RegExpProto.flags === undefined ){
  defineGet( RegExpProto, 'flags', function(){
    return this.toString().match( rflags )[0];
  });
}