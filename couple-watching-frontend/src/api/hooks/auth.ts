import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { auth } from "../firebase";
import { LoginCredentials, RegisterCredentials } from "../../types/Auth.types";
import { RegisterNewUser } from "../services/firebase.service";

export const useLogin = () => {
   const queryClient = useQueryClient();

   return useMutation<User, Error, LoginCredentials>({
      mutationFn: async ({ email, password }: LoginCredentials) => {
         const userCredential = await signInWithEmailAndPassword(auth, email, password);
         return userCredential.user;
      },
      onSuccess: () => {
         queryClient.invalidateQueries();
      },
   });
};

export const useLogout = () => {
   const queryClient = useQueryClient();

   return useMutation<void, Error>({
      mutationFn: async () => {
         await signOut(auth);
      },
      onSuccess: () => {
         queryClient.invalidateQueries();
      },
   });
};

export const useRegister = () => {
   return useMutation<User, Error, RegisterCredentials>({
      mutationFn: async (credentials: RegisterCredentials) => RegisterNewUser(credentials),
   });
};
