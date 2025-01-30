import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { motion } from "motion/react";
import React from "react";

interface LottieAnimationData {
   v: string;
   ip: number;
   op: number;
   fr: number;
}

type AnimatedEmojiProps = {
   emoji: LottieAnimationData;
   width: number;
   height: number;
   loop?: boolean;
};

const AnimatedEmoji = ({ emoji, height, width, loop = false }: AnimatedEmojiProps) => {
   const lottieRef = React.useRef<LottieRefCurrentProps | null>(null);

   const handleHoverStart = () => {
      lottieRef.current?.playSegments([emoji.ip, emoji.op], true);
   };

   return (
      <motion.div
         onHoverStart={() => handleHoverStart()}
         onClick={() => handleHoverStart()}
         whileHover={{ scale: 1.05, type: "spring" }}
         style={{ display: "inline-block" }}
      >
         <Lottie lottieRef={lottieRef} animationData={emoji} loop={loop} autoplay={true} style={{ width, height }} />
      </motion.div>
   );
};

export default AnimatedEmoji;
