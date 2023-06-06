import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

const bootstrap = () => {
  platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
};
if (typeof (window as any)["cordova"] !== "undefined") {
  document.addEventListener(
    "deviceready",
    () => {
      bootstrap();
    },
    false
  );
} else {
  bootstrap();
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log((navigator as any)?.camera);
}
