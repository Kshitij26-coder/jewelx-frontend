import * as Yup from 'yup';

export const billingValidation = Yup.object().shape({
     articleName: Yup.string().required('Article Name is required'),
     grossWeight: Yup.number().required('Gross Weight is required'),
     netWeight: Yup.number().required('Net Weight is required'),
     stoneWeight: Yup.number().required('Stone Weight is required'),
     purity: Yup.string().required('Purity is required'),
     huid: Yup.number().required('Huid is required'),
     itemAmount: Yup.number().required('Item Amount is required'),
     metalRate: Yup.number().required('Metal Rate is required'),
     makingCharges: Yup.number().required('MakingCharges is required'),
     artifactAmount: Yup.number().required('Artifact Amount is required'),
     payableAmount: Yup.number().required('Payable Amount is required'),
});

export const paymentValidation = Yup.object().shape({
     payableAmount: Yup.number().required('Payable Amount is required'),
     netAmount: Yup.number().required('Net Amount is required'),
     totalMakingCharges: Yup.number().required('Total Making Charges is required'),
     sgst: Yup.number().required('SGst is Required'),
     cgst: Yup.number().required('CGst is Required'),
     transactionType: Yup.string().required('Transaction Type is required'),
     transactionMode: Yup.string().required('Transaction Mode is required'),
     cashAmount: Yup.string().required('Cash Amount is required'),
     netBankingUTR: Yup.string().required('Netbanking UTR is required if not Use 0'),
     netBankingAmount: Yup.string().required('Netbanking Amount is required if not Use 0'),
     chequeNo: Yup.number().required('ChequeNo is required if not Use 0'),
     chequeAmount: Yup.string().required('ChequeAmount is required if not Use 0'),
});
