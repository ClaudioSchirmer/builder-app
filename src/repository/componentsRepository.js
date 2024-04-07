import {
  collection,
  getDocs,
  getDoc,
  where,
  query,
  doc,
  addDoc,
  updateDoc,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { Children } from "react";

export async function getComponents() {
  const querySnapshot = await getDocs(
    query(collection(db, "components"), orderBy("dateTime"))
  );
  return querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data().component };
  });
}

export async function addComponent(component) {
  let componentToSave = { ...component };
  componentToSave.children = null;
  try {
    let doc = await addDoc(collection(db, "components"), {
      component: componentToSave,
      dateTime: new Date().toLocaleString(),
    });
    return doc.id;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function resetComponents() {
  try {
    const components = await getComponents();
    components.forEach(async (component) => {
      await deleteDoc(doc(db, "components", component.id));
    });
    return true;
  } catch (e) {
    return false;
  }
}

/* tip to get the entire repository */
//import * as taskRepository from "../repository/taskRepository";
