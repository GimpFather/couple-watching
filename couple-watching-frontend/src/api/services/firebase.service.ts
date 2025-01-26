import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Movie, WatchedMovie } from "../../types/Watchlist.types";

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
