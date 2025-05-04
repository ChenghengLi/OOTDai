import { auth, db, storage } from '@/firebase/init';

import { doc, setDoc, getDoc, collection, getDocs, deleteDoc} from "firebase/firestore"; 

export class Category {
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
        setDoc(doc(db, "categorias", this.uuid), {
            uuid: this.uuid,
            nom: this.nom,
            enums: this.enums
        });
    }

    static async getCategoria(uuid){
        const categoriasRef = doc(db, "categorias", uuid);
        const categoriasSnap = await getDoc(categoriasRef);
        if (categoriasSnap.exists()) {
            return new Category(uuid, false, categoriasSnap.data().nom, categoriasSnap.data().enums);
        } else {
            return new Category(uuid, false);
        }
    }

}

async function deleteCategoria(uuid){
    const categoriasRef = doc(db, "categorias", uuid);
    await deleteDoc(categoriasRef);
}


async function getAllCat() {
    const productsRef = collection(db, "categorias");
    const querySnapshot = await getDocs(productsRef);
    const productUUIDs = querySnapshot.docs.map((doc) => doc.id);
    return productUUIDs;
}


async function getAllInfoCat(){
    const productsRef = collection(db, "categorias");
    const querySnapshot = await getDocs(productsRef);
    const products = [];
    querySnapshot.forEach((doc) => {
        products.push(new Category(doc.data().uuid, false, doc.data().nom, doc.data().enums));
    });
    return products;


}


function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });


}


export { getAllCat, generateUUID, getAllInfoCat, deleteCategoria } ;