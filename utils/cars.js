import { db } from "../app/firebase";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  limit,
  getCountFromServer,
  startAfter,
  orderBy
} from "firebase/firestore";

export const getCars = async (
  selectedType = '',
  limitNumber = null,
  selectedLocation = '',
  search = '',
  numberOfDays = 7,
  startDate = null,
  endDate = null,
  isNext = false,
  lastDoc = null
) => {
  let q = query(collection(db, "cars"), orderBy("createdAt", "desc"));

  if (selectedType) {
    q = query(q, where("type", "==", doc(db, "types", selectedType)));
  }
  if (selectedLocation) {
    q = query(q, where("location", "==", doc(db, "locations", selectedLocation)));
  }
  if (search) {
    q = query(q, where("name", ">=", search), where("name", "<=", search + '\uf8ff'));
  }
  if (limitNumber) {
    q = query(q, limit(limitNumber));
  }
  if (isNext && lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  const querySnapshot = await getDocs(q);
  let docs = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Filter by availability if dates provided
  if (startDate && endDate) {
    const availabilityChecks = docs.map(doc => checkAvailability(doc.id, startDate, endDate));
    const availabilityResults = await Promise.all(availabilityChecks);
    docs = docs.filter((_, i) => availabilityResults[i]);
  }

  // Collect unique type and location refs
  const uniqueTypeRefs = new Map();
  const uniqueLocationRefs = new Map();

  docs.forEach(car => {
    if (car.type?.path) uniqueTypeRefs.set(car.type.path, car.type);
    if (car.location?.path) uniqueLocationRefs.set(car.location.path, car.location);
  });

  // Batch fetch types
  const typePromises = Array.from(uniqueTypeRefs.values()).map(ref => getDoc(ref));
  const typeSnapshots = await Promise.all(typePromises);
  const typeMap = new Map();
  typeSnapshots.forEach(snap => {
    if (snap.exists()) typeMap.set(snap.ref.path, snap.data());
  });

  // Batch fetch locations
  const locationPromises = Array.from(uniqueLocationRefs.values()).map(ref => getDoc(ref));
  const locationSnapshots = await Promise.all(locationPromises);
  const locationMap = new Map();
  locationSnapshots.forEach(snap => {
    if (snap.exists()) locationMap.set(snap.ref.path, snap.data());
  });

  // Format final car data
  const cars = docs.map(car => ({
    ...car,
    id: car.id,
    type: car.type?.path ? typeMap.get(car.type.path) : null,
    location: car.location?.path ? locationMap.get(car.location.path) : null,
    image: car.images?.[0] || '',
    title: car.name,
    price: car.price // You can uncomment and modify the rate logic if needed
  }));

  return cars;
};

// Availability check function
export const checkAvailability = async (id, startDate, endDate) => {
  const orderCollection = collection(db, "orders");
  const q = query(
    orderCollection,
    where("car", "==", doc(db, "cars", id)),
    where("payment", "==", "success"),
    where("from", "<=", endDate),
    where("to", ">=", startDate)
  );

  const snapshot = await getCountFromServer(q);
  return snapshot.data().count === 0;
};
