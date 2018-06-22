export default function parametersHasDefault( args, index ){
  return args.length > index && args[ index ] !== undefined;
}