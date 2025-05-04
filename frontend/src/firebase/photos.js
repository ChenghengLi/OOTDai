
import { storage, db } from '@/firebase/init';
import { ref, uploadBytes, deleteObject} from 'firebase/storage';
import { doc, setDoc, getDoc } from "firebase/firestore"; 



const deleteFolder = async (folderPath, images) => {

  for(let i = 0; i < images; i++){
    const item = ref(storage, folderPath + '/' + i + ".jpg");
    await deleteObject(item)
  }
};


const uploadImages = async (uploadedImages, uuid) => {
    let i = 0;
    for (const image of uploadedImages) {
        await uploadImage(image, uuid + '/' + i + ".jpg");
        i++;
    }
  };


  const uploadImage = async (input, path) => {
    let blob;
    if (isURL(input)) {
      const response = await fetch(input);
      blob = await response.blob();
    } else {
      blob = input;
    }
  
    const uploadRef = ref(storage, path);
    await uploadBytes(uploadRef, blob);
  };

  const isURL = (input) => {
    try {
      new URL(input);
      return true;
    } catch (error) {
      return false;
    }
  };


async function setDescriptions(description){
  await setDoc(doc(db, "home", "Fotos"), {
    lista: description
});
}

async function getDescriptions(){
  const d = await getDoc(doc(db, "home", "Fotos"));
  if (d.exists()) {
    console.log(d.data().lista);
      return d.data().lista;
  } else {
      return [];
  }
}



export { uploadImages, uploadImage, deleteFolder, setDescriptions, getDescriptions };