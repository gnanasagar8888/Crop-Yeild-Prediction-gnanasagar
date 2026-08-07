import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUv2dHiyVZbBAKdFFPTjrtyXMrp6-ZHss",
  authDomain: "smartyield-df318.firebaseapp.com",
  projectId: "smartyield-df318",
  storageBucket: "smartyield-df318.firebasestorage.app",
  messagingSenderId: "963735670747",
  appId: "1:963735670747:web:abf522d2cb1a1485bca1fe"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();