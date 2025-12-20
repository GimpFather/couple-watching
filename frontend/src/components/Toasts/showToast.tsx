import { toast as sonnerToast } from "sonner";
import Toast from "~/components/Toasts/Toast";
import type { ToastProps } from "~/components/Toasts/toasts.types";
import { playSound } from "~/hooks/useSound";
import type { SoundName } from "~/hooks/hooks.types";

const showToast = (toast: Omit<ToastProps, "id"> & { sound?: SoundName }) => {
   if (toast.sound) {
      playSound(toast.sound);
   } else {
      playSound("NOTIFICATION_BUBBLE_POP");
   }
   return sonnerToast.custom((id) => {
      return <Toast id={id} {...toast} />;
   });
};

export default showToast;
