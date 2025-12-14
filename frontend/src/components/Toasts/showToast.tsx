import { toast as sonnerToast } from "sonner";
import type { ToastProps } from "./toasts.types";
import Toast from "./Toast";

const showToast = (toast: Omit<ToastProps, "id">) => {
   return sonnerToast.custom((id) => {
      return <Toast id={id} {...toast} />;
   });
};

export default showToast;
