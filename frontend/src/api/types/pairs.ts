export type Pair = {
	id: string;
	createdAt: string;
	firstProfileId: string;
	secondProfileId: string | null;
	secondDisplayName: string | null;
	secondAvatarSeed: string | null;
	status: "OWNER_ONLY" | "PENDING" | "PAIRED";
};

export type MakePairByYourselfData = Pick<
	Pair,
	"firstProfileId" | "secondDisplayName" | "secondAvatarSeed"
>;

export type PairWithProfiles = {
	id: string;
	createdAt: string;
	ownerProfileId: string;
	partnerProfileId: string | null;
	status: "OWNER_ONLY" | "PAIRED";
	myUsername: string | null;
	myAvatarSeed: string | null;
	partnerUsername: string | null;
	partnerAvatarSeed: string | null;
};
