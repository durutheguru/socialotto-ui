
'use strict';


const EVENT_TYPE_URL_MAPPING = {
    "NEW_CAMPAIGN_NOTIFICATION": "/back-office/campaign/awaiting_approval",
};


self.addEventListener('push', function (event) {
    // Log.info('[Service Worker] Push Received.');
    // Log.info(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const notification = JSON.parse(event.data.text());

    if (notification.message.length) {
        const title = 'Notification';
        const options = {
            body: notification.message,
            // icon: 'images/icon.png',
            // badge: 'images/badge.png'
        };

        event.waitUntil(self.registration.showNotification(title, options));
    }
});


self.addEventListener('notificationclick', function (event) {
    // Log.info('[Service Worker] Notification click Received.');

    alert("Event: " + JSON.stringify(event));

    const notification = JSON.parse(event.data.text());
    const url = EVENT_TYPE_URL_MAPPING[notification.type];

    event.waitUntil(
        clients.matchAll({
            type: "window"
        })
        .then(function (clientList) {
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if (client.url == '/' && 'focus' in client)
                    return client.focus();
            }

            if (clients.openWindow) {
                if (url && url.length) {
                    return event.waitUntil(clients.openWindow(url));
                }
                else {
                    return event.waitUntil(clients.openWindow('https://google.com'));
                }
            }
        })
    );

    event.notification.close();
});

