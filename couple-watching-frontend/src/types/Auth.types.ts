export interface LoginCredentials {
   email: string;
   password: string;
}

export interface RegisterCredentials {
   displayName: string;
   email: string;
   password: string;
}

export interface PairRequest {
   from: string;
   to: string;
   inviterName: string;
}

export interface PairInvitation {
   id: string;
   from: string;
   to: string;
   inviterName: string;
   status: string;
   createdAt: string;
}

export interface RespondToPair {
   personOne: {
      uid: string;
      displayName: string;
   };
   personTwo: {
      uid: string;
      displayName: string;
   };
}

export interface Pair {
   id: string;
   users: string[];
   personOne: string;
   personTwo: string;
   createdAt: string;
}
