import { User } from "firebase/auth";

export interface AppUser extends User {
   couple: Person[];
}

export interface Person {
   name: string;
}

export interface LoginCredentials {
   email: string;
   password: string;
}

export interface RegisterCredentials {
   email: string;
   password: string;
}
