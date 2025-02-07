# Firebase Services 🚀

## **Auth 🔐**

### **useRegister()**
The user navigates to the `/auth` page from the onboarding page, where a login or registration window is displayed. To create an account, the user provides the following information:

```typescript
// Interface RegisterCredentials from "types/Auth.types.ts"
interface RegisterCredentials {
  displayName: string;
  email: string;
  password: string;
}
```

The app uses Firebase's `createUserWithEmailAndPassword` function to create the user in Firebase Authentication.

---

### **useLogin()**
The user navigates to the `/auth` page from the onboarding page, where they provide their login credentials:

```typescript
// Interface LoginCredentials from "types/Auth.types.ts"
interface LoginCredentials {
  email: string;
  password: string;
}
```

The app calls Firebase's `signInWithEmailAndPassword` function to authenticate the user and redirects them to `/dashboard` upon success.

---

### **useLogout()**
When the user clicks the logout button, the app calls Firebase's `signOut` function and redirects the user to the `/auth` page using the `ProtectedRoute` component.

---

## **Pairs 🤝**

### **useRespondToPairRequest()**
When the user clicks a link containing the `invFromId` and `invFrom` parameters (representing the inviter's `uid` and `displayName`), they are redirected to `/dashboard`. A dialog box appears with the invitation.

If the user clicks "Accept Pair Request," the app makes a mutation with the following data:

```typescript
// Interface RespondToPair from "types/Auth.types.ts"
interface RespondToPair {
  personOne: {
    uid: string;
    displayName: string;
  };
  personTwo: {
    uid: string;
    displayName: string;
  };
}
```

The app creates a document in the "pairs" collection with a name structured as `personOne.uid_personTwo.uid`, and sets its data as follows:

```typescript
// Document in "pairs" called "personOne.uid_personTwo.uid"
{
  users: [personOne.uid, personTwo.uid],
  createdAt: Date.now(),
  personOne: personOne.displayName,
  personTwo: personTwo.displayName,
}
```

---

### **usePair()**
This hook performs a `GET` operation to fetch pair data from the "pairs" collection. The query resembles:

```sql
SELECT * 
FROM pairs 
WHERE userId = 'uid_of_signed_user';
```

The `uid_of_signed_user` value is automatically assigned by the app. Upon fetching data, the app returns the following structure:

```typescript
// Interface Pair from "types/Auth.types.ts"
interface Pair {
  id: string;
  users: string[];
  personOne: string;
  personTwo: string;
  createdAt: string;
}
```
---

