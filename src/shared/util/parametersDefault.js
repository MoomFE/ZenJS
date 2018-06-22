import parametersHasDefault from "./parametersHasDefault";


export default function parametersDefault( args, index, defaultValue ){
  return parametersHasDefault( args, index ) ? args[ index ]
                                             : defaultValue;
}