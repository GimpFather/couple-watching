import { useCallback } from "react";
import { SOUNDS } from "~/hooks/sounds.config";

type SoundConfig = {
   volume?: number;
   preload?: boolean;
};

type AudioPool = {
   instances: HTMLAudioElement[];
   currentIndex: number;
   defaultVolume: number;
};

type SoundCache = Map<string, AudioPool>;

const soundCache: SoundCache = new Map();
const preloadedUrls = new Set<string>();

const POOL_SIZE = 3;

const getOrCreatePool = (url: string, volume: number = 0.35): AudioPool => {
   if (soundCache.has(url)) {
      return soundCache.get(url)!;
   }

   const pool: AudioPool = {
      instances: [],
      currentIndex: 0,
      defaultVolume: volume,
   };

   for (let i = 0; i < POOL_SIZE; i++) {
      const audio = new Audio(url);
      audio.volume = volume;
      audio.preload = "auto";
      pool.instances.push(audio);
   }

   soundCache.set(url, pool);
   return pool;
};

export const useSound = () => {
   const getOrCreatePoolWithConfig = useCallback((url: string, config?: SoundConfig): AudioPool => {
      return getOrCreatePool(url, config?.volume ?? 0.35);
   }, []);

   const preloadSound = useCallback(
      (url: string, config?: SoundConfig): void => {
         if (preloadedUrls.has(url)) {
            return;
         }

         const pool = getOrCreatePoolWithConfig(url, config);
         if (pool.instances[0].readyState === 0) {
            pool.instances[0].load();
         }
         preloadedUrls.add(url);
      },
      [getOrCreatePoolWithConfig]
   );

   const playSound = useCallback(
      async (url: string, config?: SoundConfig): Promise<void> => {
         const pool = getOrCreatePoolWithConfig(url, config);
         const audio = pool.instances[pool.currentIndex];

         const targetVolume = config?.volume ?? pool.defaultVolume;
         if (audio.volume !== targetVolume) {
            audio.volume = targetVolume;
         }

         if (!audio.paused) {
            audio.pause();
         }
         audio.currentTime = 0;

         await audio.play().catch((error) => {
            if (error.name !== "NotAllowedError") {
               console.warn("Nie udało się odtworzyć dźwięku:", error);
            }
         });

         pool.currentIndex = (pool.currentIndex + 1) % POOL_SIZE;
      },
      [getOrCreatePoolWithConfig]
   );

   return { playSound, preloadSound };
};

export const preloadSoundDirect = (url: string, volume: number = 0.35): void => {
   if (preloadedUrls.has(url)) {
      return;
   }

   const pool = getOrCreatePool(url, volume);
   if (pool.instances[0].readyState === 0) {
      pool.instances[0].load();
   }
   preloadedUrls.add(url);
};

export const preloadAllSounds = () => {
   Object.values(SOUNDS).forEach((sound) => {
      preloadSoundDirect(sound.url, sound.defaultVolume);
   });
};
