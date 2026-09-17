import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface Contacto {
    id: string;
    nombre: string;
    telefono: string;
    ciudad: string;
}

export type ContactoInput = Omit<Contacto, 'id'>;

const CONTACTOS_COLLECTION = 'contactos';

export async function getContactos(): Promise<Contacto[]> {
    const querySnapshot = await getDocs(collection(db, CONTACTOS_COLLECTION));
    return querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as ContactoInput),
    }));
}

export async function getContacto(id: string): Promise<Contacto | null> {
    const docSnap = await getDoc(doc(db, CONTACTOS_COLLECTION, id));
    if (!docSnap.exists()) {
        return null;
    }
    return { id: docSnap.id, ...(docSnap.data() as ContactoInput) };
}

export async function createContacto(data: ContactoInput): Promise<string> {
    const docRef = await addDoc(collection(db, CONTACTOS_COLLECTION), data);
    return docRef.id;
}

export async function updateContacto(id: string, data: ContactoInput): Promise<void> {
    await updateDoc(doc(db, CONTACTOS_COLLECTION, id), data);
}

export async function deleteContacto(id: string): Promise<void> {
    await deleteDoc(doc(db, CONTACTOS_COLLECTION, id));
}
