import { ref } from "vue";
import { auth, db, storage } from '@/firebase/init';
import { getAllInfo, getAllInfoMap, Product } from "./productServices";
import { doc, setDoc, getDoc } from "firebase/firestore"; 

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

export class DisplayItem{
    static itemUUID = ref("");

    static setItemUUID(uuid){
        DisplayItem.itemUUID.value = uuid;
    }

    static async getProduct(){
        return ProductList.getProduct(DisplayItem.itemUUID.value);
    }


    static async getRecommended(){
        const products = await ProductList.getList();
        const product = await DisplayItem.getProduct();
        const list = new Set();
        let similarity = 0;

        if(product.cat.length == 0){
            return new Set();
        }

        for (const p of products){
            similarity = DisplayItem.checkSimilarity(product, p);
            if(similarity > 0){
                list.add(p);
            }
            if(list.size == 4){
                return list;
            }
        }
        console.log(list);
        return list;
    }

    static checkSimilarity(product1, product2){
        if(product1.uuid == product2.uuid){
            return 0;
        }
        let similarity = 0;
        if(product1.cat.length == 0 || product2.cat.length == 0){
            return 0;
        }
        for(const cat1 of product1.cat){
            for(const cat2 of product2.cat){
                if(cat1 == cat2){
                    similarity++;
                }
            }
        }
        return similarity;
    }
}

export class CategorySelected{
    static category = ref("");

    static setCategory(cat){
        CategorySelected.category.value = cat;
    }
}

export class ProductList{
    static list = ref([]);
    static map = ref(new Map());
    static needUpdate = true;

    static async getMap(){
        if(ProductList.map.value.size == 0 || ProductList.needUpdate){
            await ProductList.update();
        }
        return ProductList.map.value;
    }


    static async update(){
        ProductList.map.value = await getAllInfoMap();
        ProductList.list.value = await getAllInfo();
        ProductList.needUpdate = false;
    }

    static async getList(){
        if(ProductList.map.value.size == 0 || ProductList.needUpdate){
            await ProductList.update();
        }
        return ProductList.list.value;
    }

    static setUpdate(update){
        ProductList.needUpdate = update;
    }

    static async getProduct(uuid){
        if (ProductList.map.value.has(uuid))
            return await ProductList.map.value.get(uuid);
        else
            return await Product.getProduct(uuid);
    }

}

export class SelectedCategories{
    static list = ref(new Map());

    static setCategory(cat){
        SelectedCategories.list.value = cat;
    }

    static getCategory(){
        return SelectedCategories.list.value;
    }
}


export class MensajeFavoritos{
    static mensaje = ref("");


    static async updateMessage(mensaje){
        MensajeFavoritos.mensaje.value = mensaje;
        await setDoc(doc(db, "home", "MensajeFavoritos"), {
            mensaje: MensajeFavoritos.mensaje.value
        });
        
    }

    static async getMessage(){
        if(MensajeFavoritos.mensaje.value === ""){
            const d = await getDoc(doc(db, "home", "MensajeFavoritos"));
            if (d.exists()) {
                MensajeFavoritos.mensaje.value = d.data().mensaje;
                return MensajeFavoritos.mensaje.value;
            } else {
                return "";
            }
        }
        return MensajeFavoritos.mensaje.value;
    }
}


export class MensajeTYC{
    static mensaje = ref("");


    static async updateMessage(mensaje){
        MensajeTYC.mensaje.value = mensaje;
        await setDoc(doc(db, "home", "TerminosCondiciones"), {
            mensaje: MensajeTYC.mensaje.value
        });
        
    }

    static async getMessage(){
        if(MensajeTYC.mensaje.value === ""){
            const d = await getDoc(doc(db, "home", "TerminosCondiciones"));
            if (d.exists()) {
                MensajeTYC.mensaje.value = d.data().mensaje;
                return MensajeTYC.mensaje.value;
            } else {
                return "";
            }
        }
        return MensajeTYC.mensaje.value;
    }
}

export class MensajePP{
    static mensaje = ref("");


    static async updateMessage(mensaje){
        MensajePP.mensaje.value = mensaje;
        await setDoc(doc(db, "home", "PrivacyPolicy"), {
            mensaje: MensajePP.mensaje.value
        });
        
    }

    static async getMessage(){
        if(MensajePP.mensaje.value === ""){
            const d = await getDoc(doc(db, "home", "PrivacyPolicy"));
            if (d.exists()) {
                MensajePP.mensaje.value = d.data().mensaje;
                return MensajePP.mensaje.value;
            } else {
                return "";
            }
        }
        return MensajePP.mensaje.value;
    }
}


export class MensajeAM{
    static mensaje = ref("");


    static async updateMessage(mensaje){
        MensajeAM.mensaje.value = mensaje;
        await setDoc(doc(db, "home", "AboutMe"), {
            mensaje: MensajeAM.mensaje.value
        });
        
    }

    static async getMessage(){
        if(MensajeAM.mensaje.value === ""){
            const d = await getDoc(doc(db, "home", "AboutMe"));
            if (d.exists()) {
                MensajeAM.mensaje.value = d.data().mensaje;
                return MensajeAM.mensaje.value;
            } else {
                return "";
            }
        }
        return MensajeAM.mensaje.value;
    }
}