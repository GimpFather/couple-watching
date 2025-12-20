import { toast as sonnerToast } from "sonner";
import Toast from "~/components/Toasts/Toast";
import type { ToastProps } from "~/components/Toasts/toasts.types";
import { SOUNDS } from "~/hooks/sounds.config";
import { playSoundDirect } from "~/hooks/useSound";

const showToast = (toast: Omit<ToastProps, "id">) => {
   playSoundDirect(SOUNDS.NOTIFICATION_BUBBLE_POP.url);

   return sonnerToast.custom((id) => {
      return <Toast id={id} {...toast} />;
   });
};

export default showToast;
