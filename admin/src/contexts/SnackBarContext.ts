import React from 'react';

type SnackBarContextType = {
  snackbar: any;
  setSnackbar(val: any): void;
};

export const SnackBarContext = React.createContext<SnackBarContextType>({
  snackbar: {
    isOpen: false,
    message: "",
    seveirity: "success"
  },
  setSnackbar: () => {
    return;
  },
});
