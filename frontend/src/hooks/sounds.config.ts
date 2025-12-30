import type { Sound } from "~/hooks/hooks.types";

const BASE_URL = import.meta.env.VITE_SUPABASE_AUDIO_STORAGE_BASE;

export const SOUNDS: Sound[] = [
   {
      name: "BUTTON_RUSTY_CLICK_START",
      url: `${BASE_URL}/button-click--start.mp3`,
      defaultVolume: 0.35,
   },
   {
      name: "BUTTON_RUSTY_CLICK_END",
      url: `${BASE_URL}/button-click--end.mp3`,
      defaultVolume: 0.35,
   },
   {
      name: "TRANSITION_1",
      url: `${BASE_URL}/transition-1.mp3`,
      defaultVolume: 0.35,
   },
   {
      name: "NOTIFICATION_BUBBLE_POP",
      url: `${BASE_URL}/notification--buble.mp3`,
      defaultVolume: 0.25,
   },
   {
      name: "MEME_ALERT_WHAT",
      url: `${BASE_URL}/meme-alert--what.mp3`,
      defaultVolume: 0.25,
   },
   {
      name: "MEME_ALERT_SHINE",
      url: `${BASE_URL}/meme-alert--shine.mp3`,
      defaultVolume: 0.25,
   },
   {
      name: "MEME_ALERT_SHINE_SOFT",
      url: `${BASE_URL}/meme-alert--shine-soft.mp3`,
      defaultVolume: 0.25,
   },
   {
      name: "MEME_ALERT_VIOLIN_SAD",
      url: `${BASE_URL}/meme-alert--violin-sad.mp3`,
      defaultVolume: 0.25,
   },
   {
      name: "MEME_ALERT_VIOLIN_HAPPY",
      url: `${BASE_URL}/meme-alert--violin-happy.mp3`,
      defaultVolume: 0.25,
   },
];
