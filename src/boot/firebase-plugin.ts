import { Plugin } from 'vue';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';

const install: Plugin = (app, options) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(options);

    firebase.firestore().settings({ ignoreUndefinedProperties: true });

    if (/localhost:/.exec(location.host)) {
      firebase.functions().useEmulator('localhost', 5001);
    }
  }
};

export default install;
