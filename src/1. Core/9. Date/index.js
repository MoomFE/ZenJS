import './$parse/index';
import './$format/index';






import defineValue from '../../shared/util/defineValue';
import root from '../../shared/const/root';
import dayjs from '../../shared/dependencies/dayjs/dayjs';

defineValue( root, 'dayjs', dayjs );