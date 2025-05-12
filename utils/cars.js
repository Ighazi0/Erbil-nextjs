import { db } from "../app/firebase";
import {collection, doc, query, where, getDocs, getDoc, limit, getCountFromServer, or} from "firebase/firestore";

export const getCars = async (selectedType = '', limitNumber = null, selectedLocation = '', search = '', numberOfDays=7, startDate=null, endDate=null) => {
    let q = collection(db, "cars");
    if (selectedType) {
        q = query(q, where("type", "==", doc(db, "types", selectedType)))
    }
    if (selectedLocation) {
        q = query(q, where("location", "==", doc(db, "locations", selectedLocation)))
    }
    if (search) {
        q = query(q, where('name', ">=", search), where('name', "<=", search + '\uf8ff'))
    }
    if (limitNumber) {
        q = query(q, limit(limitNumber))
    }
    const querySnapshot = await getDocs(q);

    let docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    let cars = []
    if (startDate && endDate) {
        for (const doc of docs) {
            if (await checkAvailability(doc.id, startDate, endDate)) {
                cars.push(doc)
            }
        }
    } else {
        cars = docs
    }

    for (let i = 0; i < cars.length; i++) {
        const element = cars[i];
        element['id'] = element.id
        if (element?.location) {
            const locationSnapshot = await getDoc(element.location);
            if (locationSnapshot.exists()) {
                element['location'] = locationSnapshot.data();
            }
        }
        if (element?.type) {
            const typeSnapshot = await getDoc(element.type);
            if (typeSnapshot.exists()) {
                element['type'] = typeSnapshot.data();
            }
        }
        element['image'] = element.images.length > 0 ? element.images[0] : ''
        element['title'] = element.name
        // element['price'] = (((element.price * (localStorage.getItem('rate') || 1)) || element.price.toString()) * numberOfDays).toFixed(1) + ' ' + (localStorage.getItem('code') || "AED")
        // element['price'] = (((element.price * (localStorage.getItem('rate') || 1)) || element.price.toString())).toFixed(1) + ' ' + (localStorage.getItem('code') || "AED")
        element['price'] = element.price
    }
    return cars
}

export const checkAvailability = async (id, startDate, endDate) => {
    let orderCollection = collection(db, "orders");
    let q = query(orderCollection,
        where("car", "==", doc(db, "cars", id)),
        where("payment", "==", "success"),
        where("from", "<=", endDate),
        where("to", ">=", startDate)
    )

    const snapshot = await getCountFromServer(q);

    return snapshot.data().count === 0;
}