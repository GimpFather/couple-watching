import { motion } from "motion/react";

type SkeletonProps = {
   width: string;
   height: string;
   color: string;
};

const Skeleton = ({ width, height, color }: SkeletonProps) => (
   <motion.div
      style={{
         width: width,
         height: height,
         backgroundColor: color,
         borderRadius: "16px",
      }}
      initial={{ opacity: 0.7 }}
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{
         duration: 1.5,
         ease: "easeInOut",
         repeat: Infinity,
         repeatType: "reverse",
      }}
   />
);

export default Skeleton;
