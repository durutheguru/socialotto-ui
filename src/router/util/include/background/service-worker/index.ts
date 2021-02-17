
import { Log, Web, Util } from '@/components/util';
import setupSSE from '../sse';


const applicationServerPublicKey = process.env.VUE_APP_VAPID_PUB_KEY;

let isSubscribed: boolean = false;
let swRegistration: any = null;

function urlB64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}


function initUserInterface() {
    // Set the initial subscription value
    swRegistration
    .pushManager
    .getSubscription()
    .then(
        (subscription: any) => {
            isSubscribed = !(subscription === null);

            updateSubscriptionOnServer(subscription);

            if (isSubscribed) {
                Log.info('User IS subscribed.');
            } else {
                Log.info('User IS NOT subscribed.');
                subscribeUser();
            }
        }
    );
}


function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);

    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
    })
    .then(
        (subscription: any) => {
            Log.info('User is subscribed.');

            updateSubscriptionOnServer(subscription);

            isSubscribed = true;
        }
    )
    .catch(
        (error: any) => {
            Log.info(`Failed to subscribe the user: ${JSON.stringify(error)}`);
            setupSSE();
        }
    );
}


function updateSubscriptionOnServer(subscription: {endpoint: string, keys: any}) {
    // TODO: Send subscription to application server

    Log.info(`Subscription: ${JSON.stringify(subscription)}`);
    subscription = Util.refresh(subscription);

    if (subscription) {
        Log.info('Subscription available. Calling Server.');
        
        // TODO: handle duplicate posting on server side.

        Web.post(
            '/api/v1/notification_subscription',

            {
                endpoint: subscription.endpoint,
                publicKey: subscription.keys.p256dh,
                authToken: subscription.keys.auth,
            },

            (response) => {
                Log.info('Subscription successfully posted to server.');
            },

            (error) => {
                Log.info('Subscription failed on posting to server.');
                setupSSE();
            }
        );
    } else {
        Log.info('No subscription available');
        setupSSE();
    }
}





export default () => {

    Log.info('Service Worker and Push is supported');

    navigator
        .serviceWorker.register('/js/sw.js')
        .then(
            (swReg: ServiceWorkerRegistration) => {
                Log.info(`Service Worker is registered ${JSON.stringify(swReg)}`);

                swRegistration = swReg;
                initUserInterface();
            }
        )
        .catch(
            (error: any) => {
                Log.info(`Service Worker Error ${JSON.stringify(error)}`);
            }
        );

};


