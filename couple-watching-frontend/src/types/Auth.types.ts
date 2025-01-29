export interface Person {
   displayName: string;
   email: string;
   createdAt: string;
   userId: string;
   coupleId?: string;
   partnerId?: string;
}

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
}

export interface RespondToPair {
   requestId: string;
   accept: boolean;
}
