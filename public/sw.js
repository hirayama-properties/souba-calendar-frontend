self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    // ignore malformed payloads
  }
  const title = data.title || '相場カレンダー';
  const body = data.body || '';
  event.waitUntil(self.registration.showNotification(title, { body, data: { url: data.url || '/' } }));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(self.clients.openWindow(url));
});
