import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Movie, WatchedMovie } from "../../types/Watchlist.types";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { RegisterCredentials } from "../../types/Auth.types";

export const GetWatchlistMovies = async (): Promise<Movie[]> => {
   const querySnapshot = await getDocs(collection(db, "watchlist"));
   const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
   })) as Movie[];

   return data;
};

export const PostMovieToWatchlist = async (movie: Movie) => {
   const docRef = doc(db, "watchlist", movie.id);
   await setDoc(docRef, movie);
};

export const PostMovieAsWatched = async (movie: WatchedMovie) => {
   const docRef = doc(db, "watched", movie.id);
   await setDoc(docRef, movie);
};

export const DeleteMovieFromWatchlist = async (movieId: string) => {
   const docRef = doc(db, "watchlist", movieId);
   await deleteDoc(docRef);
};

export const RegisterNewUser = async ({ email, password }: RegisterCredentials): Promise<User> => {
   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
   return userCredential.user;
};
