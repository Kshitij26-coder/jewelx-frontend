const snackbarStyle = {
     backgroundColor: 'green', // Set the background color to green
     color: 'white', // Set the text color to white or another contrasting color,
     fontSize: '16px',
};

const errorSnackbarStyle = {
     backgroundColor: 'red', // Set the background color to green
     color: 'white', // Set the text color to white or another contrasting color,
     fontSize: '16px',
};

/**
 *
 * @param {string} message
 * @param {import("notistack").EnqueueSnackbar} enqueueSnackbar
 * used to show success notification bar at right top of screen
 */
export const showSuccessSnackbar = (message, enqueueSnackbar) => {
     enqueueSnackbar(message, {
          variant: 'success',
          anchorOrigin: {
               vertical: 'top',
               horizontal: 'right',
          },
          autoHideDuration: 1500,
          style: snackbarStyle,
     });
};

/**
 *
 * @param {string} message
 * @param {import("notistack").EnqueueSnackbar} enqueueSnackbar
 * used to show error notification bar at right top of screen
 */
export const showErrorSnackbar = (message, enqueueSnackbar) => {
     enqueueSnackbar(message, {
          variant: 'error',
          autoHideDuration: 1500,
          style: errorSnackbarStyle,
          anchorOrigin: {
               vertical: 'top',
               horizontal: 'right',
          },
     });
};
