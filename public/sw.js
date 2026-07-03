self.addEventListener('push', (event) => {
  console.log('[sw] push event received', { hasData: !!event.data });
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
    console.log('[sw] push payload parsed', data);
  } catch (err) {
    console.error('[sw] push payload parse failed', err);
  }
  const title = data.title || '相場カレンダー';
  const body = data.body || '';
  event.waitUntil(
    self.registration
      .showNotification(title, { body, data: { url: data.url || '/' } })
      .then(() => console.log('[sw] showNotification resolved'))
      .catch((err) => console.error('[sw] showNotification failed', err)),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(self.clients.openWindow(url));
});
