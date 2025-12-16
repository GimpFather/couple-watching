const SUPABASE_STORAGE_BASE = "https://mxqxaduggzrvmnbxktpx.supabase.co/storage/v1/object/public/audio%20files";

export const SOUNDS = {
   BUTTON_RUSTY_CLICK_START: {
      url: `${SUPABASE_STORAGE_BASE}/button-click--start.mp3`,
      defaultVolume: 0.35,
   },
   BUTTON_RUSTY_CLICK_END: {
      url: `${SUPABASE_STORAGE_BASE}/button-click--end.mp3`,
      defaultVolume: 0.35,
   },
   TRANSITION_1: {
      url: `${SUPABASE_STORAGE_BASE}/transition-1.mp3`,
      defaultVolume: 0.35,
   },
   NOTIFICATION_BUBBLE_POP: {
      url: `${SUPABASE_STORAGE_BASE}/notification--buble.mp3`,
      defaultVolume: 0.25,
   },
   MEME_ALERT_WHAT: {
      url: `${SUPABASE_STORAGE_BASE}/meme-alert--what.mp3`,
      defaultVolume: 0.25,
   },
   MEME_ALERT_SHINE: {
      url: `${SUPABASE_STORAGE_BASE}/meme-alert--shine.mp3`,
      defaultVolume: 0.25,
   },
} as const;

export type SoundKey = keyof typeof SOUNDS;
