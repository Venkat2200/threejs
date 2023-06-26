import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

let app;

/*
there is a problem of loading this app because Vanilla is loading ScriptFooter before Content,
so this method is waiting until root element is on the page and only then allows to mount the app
*/
function waitForRootElement() {
  return new Promise((resolve) => {
    const item = document.getElementById('promo-app');
    if (item) {
      resolve();
    } else {
      setTimeout(() => {
        resolve(waitForRootElement());
      }, 200);
    }
  });
}

function mountApp() {
  app = createApp(App);
  app.use(createPinia());
  app.mount('#promo-app');
}

waitForRootElement().then(() => {
  mountApp();
});

window.addEventListener('message', (event) => {
  if (event.data.type === 'MTT_RESET_APP') {
    app.unmount();
    mountApp();
  }
});
