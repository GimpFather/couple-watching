import type { Sound, SoundName } from "~/hooks/hooks.types";

const POOL_SIZE = 3;

type Pool = {
   audios: HTMLAudioElement[];
   index: number;
   volume: number;
};

const pools = new Map<string, Pool>();

const createPool = (sound: Sound, volume = 0.35): Pool => ({
   audios: Array.from({ length: POOL_SIZE }, () => {
      const audio = new Audio(sound.url);
      audio.preload = "auto";
      audio.volume = sound.defaultVolume ?? volume;
      return audio;
   }),
   index: 0,
   volume,
});

export const initSounds = (sounds: Sound[]) => {
   sounds.forEach((sound) => {
      if (!pools.has(sound.name)) {
         pools.set(sound.name, createPool(sound));
      }
   });
};

export const playSound = (name: SoundName) => {
   const pool = pools.get(name);
   if (!pool) return;

   const audio = pool.audios[pool.index];
   audio.volume = pool.volume;
   audio.currentTime = 0;
   audio.play();

   pool.index = (pool.index + 1) % pool.audios.length;
};
