import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDH8nZJA_LGRSAzGbGrvTn670CJ_9stxgg",
  authDomain: "todo-app-9868c.firebaseapp.com",
  projectId: "todo-app-9868c",
  storageBucket: "todo-app-9868c.appspot.com",
  messagingSenderId: "1062008894941",
  appId: "1:1062008894941:web:e27fa631caadb16e18b234"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
