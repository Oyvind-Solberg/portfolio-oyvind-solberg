import firebase from 'firebase/app';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyA0cRxfoKxyRuCF0nNMt7VoqFrPbYdbjuM',
  authDomain: 'portfolio-oyvind-solberg.firebaseapp.com',
  databaseURL: 'https://portfolio-oyvind-solberg.firebaseio.com',
  projectId: 'portfolio-oyvind-solberg',
  storageBucket: 'portfolio-oyvind-solberg.appspot.com',
  messagingSenderId: '846684873750',
  appId: '1:846684873750:web:d269a8837c0b37ced0c137',
  measurementId: 'G-N7BJVR1682',
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const analytics = firebaseApp.analytics();
