export default function parametersDefault( args, index, defaultValue ){
  var arg;

  if (args.length > index && (arg = args[index]) !== undefined) {
    return arg;
  }
  return defaultValue;
}