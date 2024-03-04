import * as Yup from 'yup';

export const purchaseUserValidation = Yup.object().shape({
     purity: Yup.string().required('Purity is required'),
     articleDescription: Yup.string().required('Article Description is required'),
     metalRate: Yup.number().required('Metal Rate is required'),
     grossWeight: Yup.number().required('Gross Weight is required'),
     netWeight: Yup.number().required('Net Weight is required'),
     totalAmount: Yup.number().required('Total Amount is required'),

     transactionType: Yup.string().required('Transaction Type is required'),
     transactionMode: Yup.string().required('Transaction Mode is required'),
     cashAmount: Yup.string().required('Cash Amount is required'),
     // netbankingUTR: Yup.string().required('Netbanking UTR is required if not Use 0'),
     netbankingAmount: Yup.number().required('Netbanking Amount is required if not Use 0'),
     // chequeNo: Yup.string().required('ChequeNo is required if not Use 0'),
     chequeAmount: Yup.number().required('ChequeAmount is required if not Use 0'),
});
