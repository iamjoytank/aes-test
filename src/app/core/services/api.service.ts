import { Injectable } from '@angular/core';

import {
	CollectionReference,
	DocumentData,
	addDoc,
	collection,
	deleteDoc,
	doc,
	updateDoc,
} from '@firebase/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Employee } from 'src/app/model/employee';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private fireStore: Firestore) { }


	get(params, collectionString) {
		let ref = collection(this.fireStore, collectionString);
		return collectionData(ref, { idField: 'id' });
	}
	getById(collectionString) {
		let ref = doc(this.fireStore, `${collectionString}`);
		return docData(ref);
	}
	async post(payload: Employee, collectionString) {
		const ref = collection(this.fireStore, collectionString);
		return await addDoc(ref, payload);
	}
	update(payload, collectionString) {
		const bookDocRef = doc(this.fireStore, `${collectionString}/${payload.id}`);
		return updateDoc(bookDocRef, payload);
	}
	delete(id, collectionString) {
		const bookDocRef = doc(this.fireStore, `${collectionString}/${id}`);
		return deleteDoc(bookDocRef);
	}
}