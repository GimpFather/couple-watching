export type Sound = {
   name: SoundName;
   url: string;
   defaultVolume?: number;
};

export type SoundName =
   | "BUTTON_RUSTY_CLICK_START"
   | "BUTTON_RUSTY_CLICK_END"
   | "TRANSITION_1"
   | "NOTIFICATION_BUBBLE_POP"
   | "MEME_ALERT_WHAT"
   | "MEME_ALERT_SHINE"
   | "MEME_ALERT_VIOLIN_SAD";
