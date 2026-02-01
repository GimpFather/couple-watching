import {
	FireIcon,
	GhostIcon,
	HandshakeIcon,
	HeartBreakIcon,
	MaskSadIcon,
	MoonStarsIcon,
	PopcornIcon,
	QuestionIcon,
	SmileyAngryIcon,
	SmileyMehIcon,
	SunglassesIcon,
	ToiletIcon,
	WineIcon,
} from "@phosphor-icons/react";

export type Tag = {
	id: string;
	label: string;
	icon: React.ReactNode;
};

export const MOVIE_TAGS: Tag[] = [
	{
		id: "certified_shit",
		label: "Certified Shit",
		icon: <ToiletIcon weight="duotone" />,
	},
	{
		id: "angry_af",
		label: "Angry AF",
		icon: <SmileyAngryIcon weight="duotone" />,
	},
	{
		id: "cringed",
		label: "Cringed",
		icon: <SmileyMehIcon weight="duotone" />,
	},
	{
		id: "fire",
		label: "Fire!",
		icon: <FireIcon weight="duotone" />,
	},
	{
		id: "pure_fun",
		label: "Pure Fun!",
		icon: <PopcornIcon weight="duotone" />,
	},
	{
		id: "heart_broken",
		label: "Heartbroken",
		icon: <HeartBreakIcon weight="duotone" />,
	},
	{
		id: "literally_me",
		label: "It's literally me",
		icon: <SunglassesIcon weight="duotone" />,
	},
	{
		id: "absolute_cinema",
		label: "Absolute Cinema",
		icon: <HandshakeIcon weight="duotone" />,
	},
	{
		id: "wtf",
		label: "What did I just watch",
		icon: <QuestionIcon weight="duotone" />,
	},
	{
		id: "sad",
		label: "Sad",
		icon: <MaskSadIcon weight="duotone" />,
	},
	{
		id: "snobby",
		label: "Snobby",
		icon: <WineIcon weight="duotone" />,
	},
	{
		id: "will_haunt",
		label: "Will haunt me forever",
		icon: <GhostIcon weight="duotone" />,
	},
	{
		id: "boring",
		label: "ZzzZzz",
		icon: <MoonStarsIcon weight="duotone" />,
	},
];
