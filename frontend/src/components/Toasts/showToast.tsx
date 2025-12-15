import { toast as sonnerToast } from "sonner";
import Toast from "~/components/Toasts/Toast";
import type { ToastProps } from "~/components/Toasts/toasts.types";

const showToast = (toast: Omit<ToastProps, "id">) => {
   return sonnerToast.custom((id) => {
      return <Toast id={id} {...toast} />;
   });
};

export default showToast;
