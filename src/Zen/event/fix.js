import Zen from "../../shared/zen";


export default function fix( originalEvent ){
  return originalEvent[ Zen.version ] ? originalEvent
                                      : Zen.Event( originalEvent );
}