import { auth, db, storage } from '@/firebase/init';

import { doc, setDoc, getDoc, collection, getDocs, deleteDoc} from "firebase/firestore"; 

export class Faq {
    uuid = "";
    nom = "";
    answer = "";
    

    constructor(uuid, update = true, question = "", answer = "") {
        this.uuid = uuid;
        this.question = question;
        this.answer = answer;
        if(update){
            this.update();
        }
    }

    async update() {
        setDoc(doc(db, "faq", this.uuid), {
            uuid: this.uuid,
            question: this.question,
            answer: this.answer
        });
    }

    static async getSeccion(uuid){
        const categoriasRef = doc(db, "faq", uuid);
        const categoriasSnap = await getDoc(categoriasRef);
        if (categoriasSnap.exists()) {
            return new Faq(uuid, false, categoriasSnap.data().question, categoriasSnap.data().answer);
        } else {
            return new Faq(uuid, false);
        }
    }

}

async function deleteFaq(uuid){
    const categoriasRef = doc(db, "faq", uuid);
    await deleteDoc(categoriasRef);
}


async function getAllFaq() {
    const productsRef = collection(db, "faq");
    const querySnapshot = await getDocs(productsRef);
    const productUUIDs = querySnapshot.docs.map((doc) => doc.id);
    return productUUIDs;
}


async function getAllInfoFaq(){
    const productsRef = collection(db, "faq");
    const querySnapshot = await getDocs(productsRef);
    const productsMap = new Map();
    querySnapshot.forEach((doc) => {
        const sec = new Faq(doc.data().uuid, false, doc.data().question, doc.data().answer);
        productsMap.set(doc.data().uuid, sec);
    });
    return  productsMap;

}

async function getFaqOrder(){
    const categoriasRef = doc(db, "home", "FaqOrder");
    const categoriasSnap = await getDoc(categoriasRef);
    if (categoriasSnap.exists()) {
        return  categoriasSnap.data().list;
    } else {
        return [];
    }
}

async function setFaqOrder(faqlist) {
    setDoc(doc(db, "home", "FaqOrder"), {
        list: faqlist,
    });

}

async function getFaqHome(){
    const categoriasRef = doc(db, "home", "FaqHome");
    const categoriasSnap = await getDoc(categoriasRef);
    if (categoriasSnap.exists()) {
        return  categoriasSnap.data().list;
    } else {
        return [];
    }
}

async function setFaqHome(faqlist) {
    setDoc(doc(db, "home", "FaqHome"), {
        list: faqlist,
    });

}

async function getFaqItem(){
    const categoriasRef = doc(db, "home", "FaqItem");
    const categoriasSnap = await getDoc(categoriasRef);
    if (categoriasSnap.exists()) {
        return  categoriasSnap.data().list;
    } else {
        return [];
    }
}

async function setFaqItem(faqlist) {
    setDoc(doc(db, "home", "FaqItem"), {
        list: faqlist,
    });

}





function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });


}


export { getAllFaq, generateUUID, getAllInfoFaq, deleteFaq, setFaqOrder, getFaqOrder, getFaqHome, getFaqItem, setFaqItem, setFaqHome} ;