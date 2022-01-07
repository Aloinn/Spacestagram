import { shallowRef, watchEffect } from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
export type FirebaseUserResult = Readonly<firebase.User> | null | undefined;

export function useFirebaseUser() {
  const result = shallowRef<FirebaseUserResult>();
  watchEffect((onInvalidate) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      result.value = user;
    });
    onInvalidate(unsubscribe);
  });
  return result;
}
