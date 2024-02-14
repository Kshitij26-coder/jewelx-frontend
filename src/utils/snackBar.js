

const snackbarStyle = {
    backgroundColor: 'green', // Set the background color to green
    color: 'white', // Set the text color to white or another contrasting color
};
export const showSuccessSnackbar = (message,enqueueSnackbar) => {
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
export const showErrorSnackbar = (message,enqueueSnackbar) => {
    enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 1500,
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        }
    });
}