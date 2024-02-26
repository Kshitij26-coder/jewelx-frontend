import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import saledata from '../../../data.json';
import { getIdFromUrl } from '../../utils/getIdFromUrl';
import PageLoader from '../../component/loaders/PageLoader';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRequest } from '../../utils/apis/apiRequestHelper';
import { getSaleByIdEndPoint } from '../../utils/apis/salesApiRequest';
import { useSnackbar } from 'notistack';
import PageTitle from '../../component/PageTitle';
const Download = () => {
     const [loader, setLoader] = useState(false);
     const navigate = useNavigate();
     const { enqueueSnackbar } = useSnackbar();
     const location = useLocation();
     const currentPath = location.pathname;
     const [data, setData] = useState(saledata);

     const getSaleDataByid = async id => {
          try {
               setLoader(true);
               const data = await getRequest(getSaleByIdEndPoint(id), navigate, enqueueSnackbar);
               console.log(data);
               setData(data);
               setLoader(false);
          } catch (e) {
               setLoader(false);
               console.error(e);
          }
     };
     const downloadPDF = () => {
          const input = document.getElementById('invoice');

          html2canvas(input, {
               scale: 5, // Increase scale for higher quality
               logging: false, // Disable logging (optional)
               useCORS: true, // Enable CORS for rendering external images
               width: 1400 /* specify width */, // Specify the desired width of the canvas
               height: 1400,
          }).then(canvas => {
               const imgData = canvas.toDataURL('image/jpeg', 0.5); // Use JPEG format for better quality
               const pdf = new jsPDF('l', 'mm', 'a4');
               pdf.addImage(imgData, 'JPEG', 5, 5, 300, 275); // Adjust width and height as needed
               pdf.save('jewelry_invoice.pdf');
          });
     };
     useEffect(() => {
          getSaleDataByid(getIdFromUrl(currentPath));
     }, []);

     return (
          <div className="container mt-5">
               <div className="row justify-content-center">
                    <div className="col-md-6 ">
                         <div className="invoice-header text-center">
                              <PageTitle title="Invoice" />
                         </div>
                         <div id="invoice">
                              <table className="table">
                                   <thead>
                                        <tr>
                                             <td colSpan={2} style={{ border: '1px solid #000' }}>
                                                  {/* {data.subsidiary.brand.imageUrl} */}
                                                  <img
                                                       src="http://res.cloudinary.com/dqpof2sxy/image/upload/v1708803043/ptf08npfemdoklqgzx9c.jpg"
                                                       style={{ height: '10rem', width: '10rem' }}
                                                  />
                                             </td>
                                             <td colSpan="9" style={{ border: '1px solid #000' }}>
                                                  <h3 className="container" style={{ textAlign: 'center' }}>
                                                       {data?.subsidiary?.brand?.name}
                                                  </h3>
                                                  <h4 className="container" style={{ textAlign: 'center' }}>
                                                       {data?.subsidiary?.subsidiaryName}
                                                  </h4>
                                                  <h5 className="container" style={{ textAlign: 'center' }}>
                                                       {data?.subsidiary?.formHeader}
                                                  </h5>
                                                  <td>
                                                       <h6>Phone No. : {7775996634}</h6>
                                                       {/* need to add phone number in subsidiary entity */}
                                                       <h6>GstIN : {data?.subsidiary?.gstin}</h6>
                                                  </td>
                                                  <td className="container" style={{ textAlign: 'center' }}>
                                                       <h6>Address : {data?.subsidiary?.address}</h6>
                                                  </td>
                                             </td>
                                        </tr>
                                        <tr>
                                             <td colSpan="6" style={{ border: '1px solid #000' }}>
                                                  <h6>Bill To : {data?.customer?.name}</h6>
                                                  <h6>Customer Id : {data?.customer?.idx_id}</h6>
                                                  <h6>Phone : {data?.customer?.mobileNumber}</h6>
                                             </td>
                                             <td colSpan="5" style={{ border: '1px solid #000' }}>
                                                  <h6>Invoice Number : {data?.saleIdxId}</h6>
                                                  <h6>Invoice Date :{data?.createdOn.slice(0, 10)}</h6>
                                             </td>
                                        </tr>
                                        <tr>
                                             <td colSpan="0.5" className="col-1" style={{ border: '1px solid #000' }}>
                                                  Sr No.
                                             </td>
                                             <td className="col-2" style={{ border: '1px solid #000' }}>
                                                  Item Name
                                             </td>
                                             <td className="col-2" style={{ border: '1px solid #000' }}>
                                                  HUID no.
                                             </td>
                                             <td className="col-1" style={{ border: '1px solid #000' }}>
                                                  Rate
                                             </td>
                                             <td className="col-1" style={{ border: '1px solid #000' }}>
                                                  Net Weight
                                             </td>
                                             <td className="col-1" style={{ border: '1px solid #000' }}>
                                                  Gross Weight
                                             </td>
                                             <td className="col-1" style={{ border: '1px solid #000' }}>
                                                  UOM
                                             </td>
                                             <td className="col-2" style={{ border: '1px solid #000' }}>
                                                  Mk Charges
                                             </td>
                                             <td className="col-2" style={{ border: '1px solid #000' }}>
                                                  Artifact Amt
                                             </td>
                                             <td className="col-2" style={{ border: '1px solid #000' }}>
                                                  Amount
                                             </td>
                                             <td className="col-2" style={{ border: '1px solid #000' }}>
                                                  Payable Amount
                                             </td>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {data?.itemSaleList.length > 0 &&
                                             data?.itemSaleList.map((each, index) => (
                                                  <>
                                                       <tr>
                                                            <td colSpan="0.5" className="col-1" style={{ border: '1px solid #000' }}>
                                                                 {index + 1}
                                                            </td>
                                                            <td className="col-2" style={{ border: '1px solid #000' }}>
                                                                 {each.articleStock.articleName}
                                                            </td>
                                                            <td className="col-2" style={{ border: '1px solid #000' }}>
                                                                 {each.articleStock.huid}
                                                            </td>
                                                            <td className="col-1" style={{ border: '1px solid #000' }}>
                                                                 {each.itemAmount}
                                                            </td>
                                                            <td className="col-1" style={{ border: '1px solid #000' }}>
                                                                 {each.articleStock.netWeight}
                                                            </td>
                                                            <td className="col-1" style={{ border: '1px solid #000' }}>
                                                                 {each.articleStock.grossWeight}
                                                            </td>
                                                            <td className="col-1" style={{ border: '1px solid #000' }}>
                                                                 gm
                                                            </td>
                                                            <td className="col-2" style={{ border: '1px solid #000' }}>
                                                                 {each.makingCharges}
                                                            </td>
                                                            <td className="col-2" style={{ border: '1px solid #000' }}>
                                                                 {each.artifactAmount}
                                                            </td>
                                                            <td className="col-2" style={{ border: '1px solid #000' }}>
                                                                 {each.itemAmount}
                                                            </td>
                                                            <td className="col-2" style={{ border: '1px solid #000' }}>
                                                                 {each.payableAmount}
                                                            </td>
                                                       </tr>
                                                  </>
                                             ))}
                                        <tr style={{ border: '1px solid #000' }}>
                                             <td colSpan="10" style={{ border: '1px solid #000' }}>
                                                  <h6>Discount</h6>
                                             </td>

                                             <td style={{ border: '1px solid #000' }}>
                                                  <h6>{-data?.discount}</h6>
                                             </td>
                                        </tr>
                                        <tr style={{ border: '1px solid #000' }}>
                                             <td colSpan="10" style={{ border: '1px solid #000' }}>
                                                  <h6>CGST</h6>
                                             </td>

                                             <td style={{ border: '1px solid #000' }}>
                                                  <h6>{data?.cgst}</h6>
                                             </td>
                                        </tr>
                                        <tr style={{ border: '1px solid #000' }}>
                                             <td colSpan="10" style={{ border: '1px solid #000' }}>
                                                  <h6>SGST</h6>
                                             </td>

                                             <td style={{ border: '1px solid #000' }}>
                                                  <h6>{data?.sgst}</h6>
                                             </td>
                                        </tr>

                                        <tr style={{ border: '1px solid #000' }}>
                                             <td colSpan="10" style={{ border: '1px solid #000' }}>
                                                  <h5>Total Amount</h5>
                                             </td>

                                             <td style={{ border: '1px solid #000' }}>
                                                  <h5>{data?.payableAmount}</h5>
                                             </td>
                                        </tr>
                                        <tr style={{ border: '1px solid #000' }}>
                                             <td colSpan="11" style={{ border: '1px solid #000', textAlign: 'center' }}>
                                                  <h3>{data?.subsidiary?.formFooter}</h3>
                                             </td>
                                        </tr>
                                   </tbody>
                              </table>
                         </div>

                         {/* Download Button */}
                         <hr style={{ width: '240%', background: '#1111' }} />
                         <div
                              className="text-center"
                              style={{ marginLeft: '40%', display: 'flex', justifyContent: 'flex-end', width: '200%', marginBottom: '3rem' }}
                         >
                              <button className="submit-button " onClick={downloadPDF}>
                                   Download PDF
                              </button>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Download;
