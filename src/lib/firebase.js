import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebaseConfig from '../settings/firebase-config.json'


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const collectionUsing = "user-weather-app"
export const auth = firebase.auth();
export default firebase;

export const getFirebaseItems = async () => {
  try {
    const snapshot = await db
      .collection("todos")
      .get();
    const items = snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    );
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export const getFirebaseListUsers = async () => {
  try {
    const snapshot = await db
      .collection(collectionUsing)
      .get();
    const items = snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    );
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export const addFirebaseItem = async (item) => {
  try {
    const todoRef = db.collection("todos");
    await todoRef.add(item);
  } catch (err) {
    console.log(err);
  }
}

export const updateFirebaseItem = async (item, id) => {
  try {
    const todoRef = db.collection("todos").doc(id);
    await todoRef.update(item);
  } catch (err) {
    console.log(err);
  }
}

export const clearFirebaseItem = async (item) => {
  const todoRef = db.collection("todos").doc(item.id);
  await todoRef.delete().then(function () {
  }).catch(function (err) {
    console.log(err);
  });
};

export const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
}

export const rolesEnum = {
  USER: 'USER',
  ADMIN: 'ADMIN'
}


export const storeUserInfo = async (user) => {
  const { uid } = user;
  const userDoc = await db.collection(collectionUsing).doc(uid).get();
  if (!userDoc.exists) {
    await db.collection(collectionUsing).doc(uid).set({ name: user.displayName, location: '', role: rolesEnum.USER, email: user.email });
    return {
      name: user.displayName,
      id: uid,
      location: user.location ? user.location : '',
      role: rolesEnum.USER,
      email: user.email
    };
  } else {
    return {
      id: uid,
      ...userDoc.data(),
    };
  }
}

export const updateUser = async (user, image) => {
  try {
    const userDoc = await firebase.firestore().collection(collectionUsing).doc(user.id).get();
    if (userDoc.exists) {
      await firebase.firestore().collection(collectionUsing).doc(user.id).update({ ...userDoc.data(), image: image });
    }
  } catch (err) {
    console.log(err);
  }
}

export const updateUserLocation = async (user, location) => {
  try {
    const userDoc = await firebase.firestore().collection(collectionUsing).doc(user.id).get();
    if (userDoc.exists) {
      await firebase.firestore().collection(collectionUsing).doc(user.id).update({ ...userDoc.data(), location: location });
    }
  } catch (err) {
    console.log(err);
  }
}

export const uploadImage = async (image) => {
  const ref = firebase.storage().ref().child(`/images/${image.name}`);
  let downloadUrl = "";
  try {
    await ref.put(image);
    downloadUrl = await ref.getDownloadURL();
  } catch (err) {
    console.log(err);
  }
  return downloadUrl;
};