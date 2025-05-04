import { auth, db, storage } from '@/firebase/init';

import { doc, setDoc, getDoc } from "firebase/firestore"; 

import { getUserMail, getUserName } from "@/firebase/sesion";

const admin = new Set();

admin.add("O3AMGDzxGcgsleJxTQ3XgyLWsdh2");
admin.add("f3iI7qUOTyZM9yfYxmCRMHdTJJD2");

export class User {


    static uuid  = "";
    static nom = "";
    static mail = "";
    static favorites = [];

    constructor(uuid, update = true, name = "", mail = "", favorites = [], type = 0) {
        User.uuid = uuid;
        if (name === "") {
            getDoc(doc(db, "users", User.uuid)).then((d) => {
                if (d.exists()) {
                    console.log('User already exists');
                    User.uuid = d.data().uuid;
                    User.nom = d.data().nom;
                    User.mail = d.data().mail;
                    User.favorites = d.data().favorites;
                }else{
                    User.nom = getUserName();
                    User.mail = getUserMail();
                    User.favorites = [];
                    User.update();
                }
            })
        } else {
            User.nom = name;
            User.mail = getUserMail();
            User.favorites = [];
            User.update();
        }
    }

    static isFav(uuid){
        return User.favorites.includes(uuid);
    }

    static getFav(){
        return User.favorites;
    }

    static clearFavorites(){
        User.favorites = [];
        User.update();
    }

 
    static async getUser(uuid){
        User.uuid = uuid;
        const d = await getDoc(doc(db, "users", uuid));
        if (d.exists()) {
            User.uuid = d.data().uuid;
            User.nom = d.data().nom;
            User.mail = d.data().mail;
            User.favorites = d.data().favorites;
        } 
    }

    static async addFav(productUUID) {
        User.favorites.push(productUUID);
        return setDoc(doc(db, "users", User.uuid), {
            uuid: User.uuid,
            nom: User.nom,
            mail: User.mail,
            favorites: User.favorites
        });
    }

    static async removeFav(productUUID) {
        User.favorites = User.favorites.filter((uuid) => uuid !== productUUID);
        return setDoc(doc(db, "users", User.uuid), {
            uuid: User.uuid,
            nom: User.nom,
            mail: User.mail,
            favorites: User.favorites
        })
    }

    static hasUser(){
        return User.uuid !== "";
    }

    static async update(){
        return setDoc(doc(db, "users", User.uuid), {
            uuid: User.uuid,
            nom: User.nom,
            mail: User.mail,
            favorites: User.favorites,
        });
    }

    static isAdmin(){
        return admin.has(User.uuid);
    }

    
}



