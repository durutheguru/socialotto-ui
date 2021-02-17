import { Log } from '@/components/util';

import setupServiceWorker from './service-worker';
import setupSSE from './sse';



if ('serviceWorker' in navigator && 'PushManager' in window) {
    Log.info('Push messaging is supported');
    
    setupServiceWorker();
} else {
    Log.info('Push messaging is not supported');
    // TODO: implement fall-back, register for SSE

    setupSSE();
}


