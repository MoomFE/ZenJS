import Zen from "../../shared/global/Zen/index";
import '../Event';

export default function fix( originalEvent ){
  return originalEvent[ Zen.version ] ? originalEvent
                                      : Zen.Event( originalEvent );
}