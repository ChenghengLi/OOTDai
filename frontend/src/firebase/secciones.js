import { auth, db, storage } from '@/firebase/init';

import { doc, setDoc, getDoc, collection, getDocs, deleteDoc} from "firebase/firestore"; 

export class Secciones {
    uuid = "";
    nom = "";
    enums = [];
    

    constructor(uuid, update = true, nom = "", enums = []) {
        this.uuid = uuid;
        this.nom = nom;
        this.enums = enums;
        if(update){
            this.update();
        }
    }

    async update() {
        setDoc(doc(db, "secciones", this.uuid), {
            uuid: this.uuid,
            nom: this.nom,
            enums: this.enums
        });
    }

    static async getSeccion(uuid){
        const categoriasRef = doc(db, "secciones", uuid);
        const categoriasSnap = await getDoc(categoriasRef);
        if (categoriasSnap.exists()) {
            return new Secciones(uuid, false, categoriasSnap.data().nom, categoriasSnap.data().enums);
        } else {
            return new Secciones(uuid, false);
        }
    }

}

async function deleteSeccion(uuid){
    const categoriasRef = doc(db, "secciones", uuid);
    await deleteDoc(categoriasRef);
}


async function getAllSec() {
    const productsRef = collection(db, "secciones");
    const querySnapshot = await getDocs(productsRef);
    const productUUIDs = querySnapshot.docs.map((doc) => doc.id);
    return productUUIDs;
}


async function getAllInfoSec(){
    const productsRef = collection(db, "secciones");
    const querySnapshot = await getDocs(productsRef);
    const productsMap = new Map();
    querySnapshot.forEach((doc) => {
        const sec = new Secciones(doc.data().uuid, false, doc.data().nom, doc.data().enums);
        productsMap.set(doc.data().uuid, sec);
    });
    return  productsMap;

}

async function getSecOrder(){
    const categoriasRef = doc(db, "home", "SeccionesOrder");
    const categoriasSnap = await getDoc(categoriasRef);
    if (categoriasSnap.exists()) {
        return  categoriasSnap.data().order;
    } else {
        return [];
    }
}

async function setSecOrder(order) {
    setDoc(doc(db, "home", "SeccionesOrder"), {
        order: order,
    });

}




function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });


}


export { getAllSec, generateUUID, getAllInfoSec, deleteSeccion, getSecOrder, setSecOrder } ;