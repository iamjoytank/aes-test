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
	startAfter,endBefore, where, getCountFromServer
} from '@firebase/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';

import { Employee } from 'src/app/model/employee';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private fireStore: Firestore) { }


	get(params, collectionString) {
		let query_ = query(collection(this.fireStore, collectionString), orderBy('createdAt', 'desc'), limit(params.limit));
		if (params.limit && params.next) {
			query_ = query(collection(this.fireStore, collectionString), orderBy('createdAt', 'desc'), limit(params.limit), startAfter(params.next.createdAt))
		}
		else if (params.limit && params.last) {
			query_ = query(collection(this.fireStore, collectionString), orderBy('createdAt', 'desc'), limit(params.limit), endBefore(params.last.createdAt))
		}
		return collectionData(query_, { idField: 'id' })
	}

	async getCount(collectionString) {
		let query_ = query(collection(this.fireStore, collectionString), orderBy('createdAt', 'desc'))
		return await (await getCountFromServer(query_)).data().count;
	}

	getById(collectionString) {
		let ref = doc(this.fireStore, `${collectionString}`);
		return docData(ref);
	}
	
	searchByName(term, collectionString) {
		return collectionData(query(collection(this.fireStore, collectionString),
			where('name', '>=', term), where('name', '<=', term + '~'),
		));
	}

	checkEmailQuery(email, collectionString) {
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