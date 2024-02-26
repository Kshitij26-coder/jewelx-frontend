import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { styled } from '@mui/material/styles';
import { getCookiesObject } from '../utils/getCookiesObject';
import { showSuccessSnackbar } from '../utils/snackBar';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import axios from 'axios';
import { postRequest } from '../utils/apis/apiRequestHelper';
import { useNavigate } from 'react-router-dom';
import ButtonLoader from './loaders/ButtonLoader';
const style = {
     position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: 400,
     bgcolor: 'background.paper',
     border: '1px solid #333',
     borderRadius: '2rem',
     boxShadow: 24,
     p: 4,
};

const VisuallyHiddenInput = styled('input')({
     clip: 'rect(0 0 0 0)',
     clipPath: 'inset(50%)',
     height: 1,
     overflow: 'hidden',
     position: 'absolute',
     bottom: 0,
     left: 0,
     whiteSpace: 'nowrap',
     width: 1,
});

const ModalV = ({ open, handleClose }) => {
     const [selectedFile, setSelectedFile] = React.useState(null);
     const { enqueueSnackbar } = useSnackbar();
     const [loader, setLoader] = React.useState(false);
     const navigate = useNavigate();

     const uploadImageFunction = async () => {
          //write image upload logic to url using multipartform data
          try {
               setLoader(true);
               const formData = new FormData();
               formData.append('image', selectedFile);
               const response = await axios.post(`http://localhost:8080/brand/cloud/${getCookiesObject().brandId}`, formData, {
                    headers: {
                         'Content-Type': 'multipart/form-data', // Set the content type header
                         // Add any additional headers if needed
                    },
               });
               showSuccessSnackbar('Image updated successfully', enqueueSnackbar);
               console.log('Response:', response.data); // Log the response data
               setLoader(false);
          } catch (error) {
               console.error('Error uploading file:', error);
          }
     };

     const handleFileChange = event => {
          setSelectedFile(event.target.files[0]);
     };

     return (
          <div>
               <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                         backdrop: {
                              timeout: 500,
                         },
                    }}
               >
                    <Fade in={open}>
                         <Box sx={style}>
                              <div>
                                   {!selectedFile && (
                                        <Button
                                             component="label"
                                             className="submit-button"
                                             role={undefined}
                                             variant="contained"
                                             tabIndex={-1}
                                             startIcon={<CloudUploadIcon />}
                                        >
                                             Upload file
                                             <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                                        </Button>
                                   )}
                              </div>
                              {selectedFile && (
                                   <>
                                        <div>
                                             <Typography variant="h6">Uploaded Image Preview:</Typography>
                                             <img src={URL.createObjectURL(selectedFile)} alt="Uploaded" style={{ maxWidth: '100%' }} />
                                        </div>
                                        <Button
                                             onClick={uploadImageFunction}
                                             component="label"
                                             className="submit-button"
                                             role={undefined}
                                             variant="contained"
                                             tabIndex={-1}
                                             disabled={loader}
                                             style={{ marginTop: '2rem', marginLeft: '20%' }}
                                        >
                                             {loader ? <ButtonLoader /> : 'Upload file'}
                                        </Button>
                                   </>
                              )}
                         </Box>
                    </Fade>
               </Modal>
          </div>
     );
};
export default ModalV;
