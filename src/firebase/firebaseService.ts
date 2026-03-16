import type { BookingRequest, BookingWithId } from "../models";
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    QueryDocumentSnapshot,
    setDoc,
    Timestamp,
    updateDoc,
    where,
    writeBatch,
    type DocumentData,
    type FirestoreDataConverter,
    type SnapshotOptions
} from "firebase/firestore";
import { db } from "./firebase";

//Global Firebase Variables
declare const __app_id: string;

const bookingConverter: FirestoreDataConverter<BookingWithId> = {
  toFirestore(booking: BookingWithId): DocumentData {
    const { id, ...rest } = booking;
    return rest;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): BookingWithId {
    const data = snapshot.data(options)!;
    return {
      id: snapshot.id,
      ...data
    } as BookingWithId;
  },
};

// Helper to get the typed collection
const bookingsCol = collection(db, "bookings").withConverter(bookingConverter);

export async function submitBooking(booking: BookingRequest): Promise<string> {
    const newDocRef = doc(bookingsCol);
    await setDoc(newDocRef, booking);
    return newDocRef.id;
}

export async function getBookingById(id: string) {
    const docRef = doc(db, "bookings", id).withConverter(bookingConverter);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
        return null;
    }
}

export async function getBookingsByStatus(status: string) {
  const bookingsCol = collection(db, "bookings").withConverter(bookingConverter);
  const q = query(bookingsCol, where("status", "==", status));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data());
}

export async function updateBookingStatus(id: string, updates: Partial<BookingRequest>) {
    const docRef = doc(db, "bookings", id);
  try {
    await updateDoc(docRef, updates);
    console.log("Booking updated successfully");
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
}

export async function getAllBookings(): Promise<BookingWithId[]> {
  try {
    const bookingsCol = collection(db, "bookings").withConverter(bookingConverter);
    const q = query(bookingsCol, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    throw error; 
  }
}

export async function deleteOldBookings(): Promise<void> {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const cutoffTimestamp = Timestamp.fromDate(oneMonthAgo);
    const bookingsCol = collection(db, "bookings");
    const q = query(bookingsCol, where("endDate", "<", cutoffTimestamp));
    
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No old bookings found to delete.");
      return;
    }
    const batch = writeBatch(db);
    
    querySnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    
    console.log(`Successfully deleted ${querySnapshot.size} old booking(s).`);
  } catch (error) {
    console.error("Error during cleanup of old bookings:", error);
    throw error;
  }
}

export async function getDisabledDates() {
    const bookingsRef = collection(db, "bookings");
    const q = query(bookingsRef, where("status", "in", ["pending", "approved"]));
    
    const querySnapshot = await getDocs(q);
    
    const disabledRanges = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            from: data.startDate.toDate(),
            to: data.endDate.toDate()
        };
    });

    return disabledRanges;
}

export async function deleteBooking(bookingId: string): Promise<void> {
  try {
    const docRef = doc(db, "bookings", bookingId);
    await deleteDoc(docRef);

    console.log(`Booking with ID ${bookingId} has been deleted.`);
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
}