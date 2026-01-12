import camelCase from "lodash/camelCase";
import confetti from "canvas-confetti";
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";

export function keysToCamel<T>(obj: T): T {
   if (Array.isArray(obj)) {
      return obj.map(keysToCamel) as unknown as T;
   }

   if (obj !== null && typeof obj === "object") {
      return Object.fromEntries(Object.entries(obj).map(([k, v]) => [camelCase(k), keysToCamel(v)])) as unknown as T;
   }

   return obj;
}

export const launchConfettiSuccess = () => {
   confetti.reset();
   const colors = ["#FFB400", "#E95270", "#00BFB5", "#2AAC7E"];
   const duration = 500;
   const end = Date.now() + duration;

   (function frame() {
      confetti({
         particleCount: 4,
         origin: { y: 0.65, x: 0 },
         angle: 65,
         gravity: 0.5,
         spread: 75,
         scalar: 1,
         colors,
      });
      confetti({
         particleCount: 4,
         origin: { y: 0.65, x: 1 },
         angle: 115,
         gravity: 0.5,
         spread: 75,
         scalar: 1,
         colors,
      });
      confetti({
         particleCount: 4,
         origin: { y: 1, x: 0.5 },
         gravity: 0.5,
         spread: 100,
         scalar: 1,
         startVelocity: 30,
         colors,
      });

      if (Date.now() < end) {
         requestAnimationFrame(frame);
      }
   })();
};

export const generateAvatarSeed = () => {
   return Math.random().toString(36).substring(2, 15);
};

export const generateAvatar = (userSeed: string) => {
   const shapeColors = ["5DCB8F", "F5C519", "A2A1FF", "FF78DB", "70DEED", "FC819D"];
   const seed = userSeed;
   const randomAvatar = createAvatar(thumbs, {
      seed,
      backgroundColor: ["transparent"],
      shapeColor: shapeColors,
   });
   return randomAvatar.toDataUri();
};
