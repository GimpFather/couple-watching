import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Movie, WatchedMovie } from "../../types/Watchlist.types";
import { createUserWithEmailAndPassword, updateProfile, User } from "firebase/auth";
import { Pair, RegisterCredentials, RespondToPair } from "../../types/Auth.types";

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

export const GetPair = async (userId: string): Promise<Pair> => {
   const pairRef = collection(db, "pairs");
   const q = query(pairRef, where("users", "array-contains", userId));
   const snapshot = await getDocs(q);

   return {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data(),
   } as Pair;
};

export const RespondToPairRequest = async ({ personOne, personTwo }: RespondToPair) => {
   const pairId = `${personOne.uid}_${personTwo.uid}`;
   const pairRef = doc(db, "pairs", pairId);

   await setDoc(pairRef, {
      users: [personOne.uid, personTwo.uid],
      createdAt: Date.now(),
      personOne: personOne.displayName,
      personTwo: personTwo.displayName,
   });
};
