import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Movie } from "../../types/Watchlist.types";

export const GetWatchlistMovies = async (): Promise<Movie[]> => {
   const querySnapshot = await getDocs(collection(db, "watchlist"));
   const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
   })) as Movie[];

   return data;
};
