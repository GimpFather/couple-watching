export type DialogProps = {
   open: boolean;
   onClose: () => void;
   action?: () => void;
};

// Types for the MarkAsWatchedDialog

export type MarkAsWatchedMovie = {
   id: string;
   title: string;
};

export type MarkAsWatchedDialogProps = DialogProps & {
   selectedMovie: MarkAsWatchedMovie | null;
};

// End of types for the MarkAsWatchedDialog