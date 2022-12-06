import { Injectable } from '@angular/core';

import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	updateDoc,
	limit,
	orderBy,
	query,
	startAfter, where
} from '@firebase/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';

import { Employee } from 'src/app/model/employee';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private fireStore: Firestore) { }


	get(params, collectionString) {
		if (params.limit && params.next) {
			return collectionData(query(collection(this.fireStore, collectionString), orderBy('createdAt', 'desc'), limit(params.limit), startAfter(params.next)), { idField: 'id' })
		}
		return collectionData(query(collection(this.fireStore, collectionString), orderBy('createdAt', 'desc'), limit(params.limit)),{idField:'id'})
	}

	getById(collectionString) {
		let ref = doc(this.fireStore, `${collectionString}`);
		return docData(ref);
	}

	checkEmailQuery(email,collectionString) {
		return collectionData(query(collection(this.fireStore, collectionString), where('email', '==', email)));
	}

	async post(payload: Employee, collectionString) {
		const ref = collection(this.fireStore, collectionString);
		return addDoc(ref, payload).then((docRef) => {
			updateDoc(docRef, { createdAt: new Date() });
		});
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