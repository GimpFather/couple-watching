export type Pair = {
   id: number;
   createdAt: string;
   firstProfileId: number;
   secondProfileId: number | null;
   secondDisplayName: string | null;
   status: "OWNER_ONLY" | "PENDING" | "PAIRED";
};

export type MakePairByYourselfData = Pick<Pair, "firstProfileId" | "secondDisplayName">;
