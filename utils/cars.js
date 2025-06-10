import { db } from "../app/firebase";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  limit,
  getCountFromServer,
  startAfter,
  orderBy,
} from "firebase/firestore";

export const getCars = async (
  selectedType = "",
  limitNumber = null,
  selectedLocation = "",
  search = "",
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
    q = query(
      q,
      where("location", "==", doc(db, "locations", selectedLocation))
    );
  }
  if (search) {
    q = query(
      q,
      where("name", ">=", search),
      where("name", "<=", search + "\uf8ff")
    );
  }
  if (limitNumber) {
    q = query(q, limit(limitNumber));
  }
  if (isNext && lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  const querySnapshot = await getDocs(q);
  let docs = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (startDate && endDate) {
    const availabilityChecks = docs.map((doc) =>
      checkAvailability(doc.id, startDate, endDate)
    );
    const availabilityResults = await Promise.all(availabilityChecks);
    docs = docs.filter((_, i) => availabilityResults[i]);
  }

  const cars = docs.map((car) => ({
    ...car,
    id: car.id,
    image: car.images?.[0] || "",
    title: car.name,
    price: car.price,
  }));

  return cars;
};

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
