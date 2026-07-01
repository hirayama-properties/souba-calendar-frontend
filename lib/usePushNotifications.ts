import { getVapidPublicKey, subscribePush, unsubscribePush } from './api';

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const output = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) output[i] = rawData.charCodeAt(i);
  return output;
}

export async function enablePushNotifications(): Promise<void> {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    throw new Error('このブラウザはプッシュ通知に対応していません');
  }
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') throw new Error('通知が許可されませんでした');

  const publicKey = await getVapidPublicKey();
  if (!publicKey) throw new Error('通知の設定が完了していません（サーバー側でVAPID鍵が未設定です）');

  const registration = await navigator.serviceWorker.register('/sw.js');
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey) as BufferSource,
  });
  await subscribePush(subscription.toJSON());
}

export async function disablePushNotifications(): Promise<void> {
  if (!('serviceWorker' in navigator)) return;
  const registration = await navigator.serviceWorker.getRegistration();
  const subscription = await registration?.pushManager.getSubscription();
  if (subscription) {
    await unsubscribePush(subscription.endpoint);
    await subscription.unsubscribe();
  }
}
