import { Route } from 'vue-router';

import { Log } from '@/components/util';

import './include/jsFileLoader';
import './include/cssFileLoader';
import './include/background';


export default function(to: Route, from: Route) {
    Log.info('Executing After Route Scripts Loader.');
}

