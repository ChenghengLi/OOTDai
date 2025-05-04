import { auth, db, storage } from '@/firebase/init';

import { doc, setDoc, getDoc, collection, getDocs, deleteDoc } from "firebase/firestore"; 

export class Product {
    nom = "";
    description = "";
    price = 0;
    uuid = "";
    image = 0;
    cat = [];

    constructor(uuid , update= true, name = "", description = "", price = 0, image = 0, cat = []) {
        this.uuid = uuid;
        this.nom = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.cat = cat;
        if(update){
            this.update();
        }
    }

    async update() {
        setDoc(doc(db, "products", this.uuid), {
            uuid: this.uuid,
            nom: this.nom,
            description: this.description,
            price: this.price,
            image: this.image,
            cat: this.cat
        });
    }

    static async getProduct(uuid){
        const productRef = doc(db, "products", uuid);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
            return new Product(productSnap.data().uuid, false , productSnap.data().nom, productSnap.data().description, productSnap.data().price, productSnap.data().image, productSnap.data().cat);
        } else {
            return new Product(uuid, false);
        }
    }

    static async deleteProduct(uuid){
        const productRef = doc(db, "products", uuid);
        await deleteDoc(productRef);
    }

}



async function getAllProducts() {
    const productsRef = collection(db, "products");
    const querySnapshot = await getDocs(productsRef);
    const productUUIDs = querySnapshot.docs.map((doc) => doc.id);
    return productUUIDs;
}


async function getAllInfo(){
    const productsRef = collection(db, "products");
    const querySnapshot = await getDocs(productsRef);
    const products = [];
    querySnapshot.forEach((doc) => {
        products.push(new Product(doc.data().uuid, false, doc.data().nom, doc.data().description, doc.data().price, doc.data().image, doc.data().cat));
    });
    return products;
}


async function getAllInfoMap(){
    const productsRef = collection(db, "products");
    const querySnapshot = await getDocs(productsRef);
    const products = new Map();
    querySnapshot.forEach((doc) => {
        products.set(doc.data().uuid, new Product(doc.data().uuid, false, doc.data().nom, doc.data().description, doc.data().price, doc.data().image, doc.data().cat));
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


export { getAllProducts, generateUUID, getAllInfo, getAllInfoMap } ;