import { auth, db, storage } from '@/firebase/init';

import { doc, setDoc, getDoc, collection, getDocs, deleteDoc } from "firebase/firestore"; 


export class Message{
    to = [];
    message = {
        subject: '',
        text: '',
        html: '',
    };
    uuid = "";

    constructor(to, subject, text, html, uuid = "") {
        this.to = to;
        this.message.subject = subject;
        this.message.text = text;
        this.message.html = html;
        if(uuid === ""){
        this.uuid = generateUUID();
        }else{
            this.uuid = uuid;
        }
    }

    async send(){
        await setDoc(doc(db, "mail", this.uuid), {
            to: this.to,
            message: this.message
        });
    }

    async getMessage(){
        const messageRef = doc(db, "mail", this.uuid);
        const messageSnap = await getDoc(messageRef);
        if(messageSnap !== undefined){
            this.to = messageSnap.data().to;
            this.message = messageSnap.data().message;
        }
        return this;
    }
}


function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });


}


export { generateUUID };