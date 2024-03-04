import React from 'react';
import { showSuccessSnackbar } from '../utils/snackBar';
import { useSnackbar } from 'notistack';
export default function Content() {
     const { enqueueSnackbar } = useSnackbar();
     return <div onClick={() => showSuccessSnackbar('success', enqueueSnackbar)}>Content</div>;
}
