import {
   addDoc,
   collection,
   deleteDoc,
   doc,
   getDoc,
   getDocs,
   query,
   setDoc,
   updateDoc,
   where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { Movie, WatchedMovie } from "../../types/Watchlist.types";
import { createUserWithEmailAndPassword, updateProfile, User } from "firebase/auth";
import { PairInvitation, PairRequest, RegisterCredentials, RespondToPair } from "../../types/Auth.types";

export const GetWatchlistMovies = async (pairId: string): Promise<Movie[]> => {
   const querySnapshot = await getDocs(collection(db, "pairs", pairId, "watchlist"));
   const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
   })) as Movie[];

   return data;
};

export const PostMovieToWatchlist = async (movie: Movie, pairId: string) => {
   const docRef = doc(db, "pairs", pairId, "watchlist", movie.id);
   await setDoc(docRef, movie);
};

export const PostMovieAsWatched = async (movie: WatchedMovie, pairId: string) => {
   const docRef = doc(db, "pairs", pairId, "watched", movie.id);
   await setDoc(docRef, movie);
};

export const DeleteMovieFromWatchlist = async (movieId: string, pairId: string) => {
   const docRef = doc(db, "pairs", pairId, "watchlist", movieId);
   await deleteDoc(docRef);
};

export const RegisterNewUser = async ({ email, password, displayName }: RegisterCredentials): Promise<User> => {
   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
   const user = userCredential.user;
   await updateProfile(user, { displayName });

   return userCredential.user;
};

export const PostSendPairRequest = async (pairRequest: PairRequest) => {
   const pairRequestsRef = collection(db, "pairRequests");
   await addDoc(pairRequestsRef, {
      from: pairRequest.from,
      to: pairRequest.to,
      inviterName: pairRequest.inviterName,
      status: "pending",
      createdAt: new Date().toISOString(),
   });
};

export const GetPairRequest = async (userId: string): Promise<PairInvitation[]> => {
   const pairRequestsRef = collection(db, "pairRequests");
   const q = query(pairRequestsRef, where("to", "==", userId), where("status", "==", "pending"));

   const snapshot = await getDocs(q);

   return snapshot.docs.map((doc) => {
      const { inviterName } = doc.data();
      return {
         id: doc.id,
         inviterName,
      } as PairInvitation;
   });
};

export const GetPairId = async (userId: string): Promise<string> => {
   const pairRef = collection(db, "pairs");
   const q = query(pairRef, where("users", "array-contains", userId));
   const snapshot = await getDocs(q);

   return snapshot.docs[0].id;
};

export const RespondToPairRequest = async ({ accept, requestId }: RespondToPair) => {
   const pairRequestRef = doc(db, "pairRequests", requestId);

   if (accept) {
      const requestSnap = await getDoc(pairRequestRef);
      const requestData = requestSnap.data();
      if (!requestData) {
         throw new Error("Request data not found");
      }
      const { from, to } = requestData;

      const pairId = `${from}_${to}`;
      const pairRef = doc(db, "pairs", pairId);

      await setDoc(pairRef, {
         users: [from, to],
         createdAt: Date.now(),
      });

      await updateDoc(pairRequestRef, { status: "accepted" });
   } else {
      await updateDoc(pairRequestRef, { status: "rejected" });
   }
};
