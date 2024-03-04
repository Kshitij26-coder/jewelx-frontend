import * as Yup from 'yup';

export const subsidiaryMaintenenceValid = Yup.object().shape({
     maintenanceDescription: Yup.string().required('Maintenance Description is required'),
     transactionMode: Yup.string().required('Transaction Mode is required'),
     transactionType: Yup.string().required('Transaction Type is required'),
     cashAmount: Yup.string().required('Cash Amount is required'),
     netBankingUTR: Yup.string().required('Netbanking UTR is required'),
     netBankingAmount: Yup.string().required('Netbanking Amountis required'),
     chequeNo: Yup.number().required('ChequeNo is required'),
     chequeAmount: Yup.string().required('ChequeAmount is required'),
});
