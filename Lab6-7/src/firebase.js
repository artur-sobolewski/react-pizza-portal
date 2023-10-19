import firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


const firebaseConfig = {
    apiKey: "",
    authDomain: "piw-pwr-pizza-portal.firebaseapp.com",
    projectId: "piw-pwr-pizza-portal",
    storageBucket: "piw-pwr-pizza-portal.appspot.com",
    messagingSenderId: "1095861062492",
    appId: "1:1095861062492:web:d6e7d3927695213369cf99"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = firebase.firestore();
export const fs = firebase;
export const provider = new firebase.auth.FacebookAuthProvider();



export const saveCart = async (user, cart) => {
    db.collection('cart').doc(user.uid).set({
        pizzas: cart,
    });
}

export const deleteCart = async (user) => {
    db.collection('cart').doc(user.uid).delete();
}



export const addOrder = async (user, address, orderData, totalCost) => {

    db.collection('orderHistory').doc(user.uid).collection('orders').add({
        orderDate: firebase.firestore.FieldValue.serverTimestamp(),
        address: address,
        totalCost: totalCost,
        pizzas: orderData,
    });
}

export const getOrders = async (user) => {
    return db.collection('orderHistory').doc(user.uid).collection('orders').get();
}
