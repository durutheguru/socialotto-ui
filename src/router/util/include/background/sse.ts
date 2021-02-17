import { Web, Log, Util } from '@/components/util';
import { default as EVENT_TYPE_URL_MAPPING } from '../../../../../public/js/event_map';


function handleEvent(event: any) {
    // Web.navigate(EVENT_TYPE_URL_MAPPING[event.type]);
    Log.info(`Event: ${JSON.stringify(event)}`);
}


export default () => {
    Log.info('Attempting SSE Subscription.');

    Web.sse(
        '/events-streams/v1/notification',

        {
            notification: (event: any)  => {
                Log.info(`Received Server Sent Notification. ${JSON.stringify(event)}`);
                handleEvent(event);
            }
        },

        (event: MessageEvent) => {
            Log.info(`Received Server Sent Message. ${JSON.stringify(event.data)}`);
            handleEvent(event);
        }
    );
};


