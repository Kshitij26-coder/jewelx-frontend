import * as Yup from 'yup';

export const orderValidation = Yup.object().shape({
     maintenanceDescription: Yup.string().required('Maintenance Description is required'),
     purity: Yup.string().required('Purity is required'),
     articleDescription: Yup.string().required('Article Description is required'),
     metalRate: Yup.number().required('Metal Rate is required'),
     grossWeight: Yup.number().required('Gross Weight is required'),
     netWeight: Yup.number().required('Net Weight is required'),
     orderStatus: Yup.string().required('Order Status is required'),
     fullfillDate: Yup.number().required('Fullfill Date is required'),
     makingCharges: Yup.number().required('MakingCharges is required'),
     fullAmount: Yup.number().required('Full Amount is required'),
     transactionType: Yup.string().required('Transaction Type is required'),
     transactionMode: Yup.string().required('Transaction Mode is required'),
     cashAmount: Yup.string().required('Cash Amount is required'),
     netbankingUTR: Yup.string().required('Netbanking UTR is required'),
     netbankingAmount: Yup.string().required('Netbanking Amountis required'),
     chequeNo: Yup.number().required('ChequeNo is required'),
     chequeAmount: Yup.string().required('ChequeAmount is required'),
});
