import { boot } from 'quasar/wrappers';
import firebase from './firebase-plugin';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  app.use(firebase, {
    apiKey: 'AIzaSyB5SAuajoGJJGAri2YtzJ8z9hGcGeQS95g',
    authDomain: 'alain-shopify-backend.firebaseapp.com',
    projectId: 'alain-shopify-backend',
    storageBucket: 'alain-shopify-backend.appspot.com',
    messagingSenderId: '469146646247',
    appId: '1:469146646247:web:4ea64d91bb68041b965442',
  });
});
