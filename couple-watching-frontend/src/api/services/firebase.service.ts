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
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { PairInvitation, PairRequest, Person, RegisterCredentials, RespondToPair } from "../../types/Auth.types";

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

export const RegisterNewUser = async ({ email, password }: RegisterCredentials): Promise<User> => {
   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
   return userCredential.user;
};

export const SaveUserToFirestore = async (user: Person) => {
   const userRef = doc(db, "users", user.userId);
   await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName,
      userId: user.userId,
      partnerId: null,
      createdAt: user.createdAt,
   });
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

export const PostCreatePair = async (user1Id: string, user2Id: string) => {
   const pairId = `${user1Id}_${user2Id}`;
   const pairRef = doc(db, "pairs", pairId);

   await setDoc(pairRef, {
      users: [user1Id, user2Id],
      createdAt: Date.now(),
   });

   const user1Ref = doc(db, "users", user1Id);
   const user2Ref = doc(db, "users", user2Id);

   await updateDoc(user1Ref, { partnerId: user2Id });
   await updateDoc(user2Ref, { partnerId: user1Id });
};

export const GetPairRequests = async (userId: string): Promise<PairInvitation[]> => {
   const pairRequestsRef = collection(db, "pairRequests");
   const q = query(pairRequestsRef, where("to", "==", userId), where("status", "==", "pending"));
   const snapshot = await getDocs(q);
   return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
         id: doc.id,
         from: data.from,
         to: data.to,
         inviterName: data.inviterName,
         status: data.status,
         createdAt: data.createdAt,
      } as PairInvitation;
   });
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

      const user1Ref = doc(db, "users", from);
      const user2Ref = doc(db, "users", to);

      await updateDoc(user1Ref, { partnerId: to, pairId: pairId });
      await updateDoc(user2Ref, { partnerId: from, pairId: pairId });

      await updateDoc(pairRequestRef, { status: "accepted" });
   } else {
      await updateDoc(pairRequestRef, { status: "rejected" });
   }
};

export const GetUserData = async (uid: string): Promise<Person | null> => {
   const userRef = doc(db, "users", uid);
   const snapshot = await getDoc(userRef);
   return snapshot.exists() ? (snapshot.data() as Person) : null;
};
