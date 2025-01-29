export const handleGradient = (color1: string, color2: string, color3: string) => {
   return `linear-gradient(90deg, ${color1} 0%, ${color2} 35%, ${color3}) 100%`;
};

export const isAssertDefined = (assert: unknown) => {
   if (!assert) return null;
};
