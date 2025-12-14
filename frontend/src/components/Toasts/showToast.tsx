import { toast as sonnerToast } from "sonner";
import Toast from "./Toast";
import type { ToastProps } from "./toasts.types";

const showToast = (toast: Omit<ToastProps, "id">) => {
   return sonnerToast.custom((id) => {
      return <Toast id={id} {...toast} />;
   });
};

export default showToast;
