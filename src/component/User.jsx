import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './loaders/PageLoader';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import ServerError500 from './errorComponents/serverError/ServerError500';

export default function User() {
     const url = 'http://localhost:8088/user';
     let [user, setUser] = useState([]);
     let [error, setError] = useState(false);
     let [loader, setLoader] = useState(false);
     let navigate = useNavigate();
     const { enqueueSnackbar } = useSnackbar();
     let getData = async () => {
          try {
               setLoader(true);
               let data = await axios.get(url);
               setError(false);
               setUser(data.data);
               setLoader(false);
          } catch (e) {
               setLoader(false);
               setError(true);
          }
     };
     const snackbarStyle = {
          backgroundColor: 'green', // Set the background color to green
          color: 'white', // Set the text color to white or another contrasting color
     };
     const showSuccessSnackbar = message => {
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
     const showErrorSnackbar = message => {
          enqueueSnackbar(message, {
               variant: 'error',
               autoHideDuration: 1500,
               anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
               },
          });
     };

     let deleteHandler = async id => {
          try {
               showSuccessSnackbar('Successfully deleted');
          } catch (e) {
               showErrorSnackbar('something went wrong');
          }
     };
     useEffect(() => {}, []);
     if (error) {
          navigate('/error500');
     }
     return (
          <div className="container " style={{ minHeight: '100vh' }}>
               {loader ? (
                    <Loader />
               ) : (
                    <table>
                         <tr>
                              <th>Id</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Age</th>
                              <th>Edit</th>
                              <th>Delete</th>
                         </tr>
                         {user.map((each, index) => (
                              <tr key={index}>
                                   <td>{each.id}</td>
                                   <td>{each.name}</td>
                                   <td>{each.email}</td>
                                   <td>{each.age}</td>
                                   <td>
                                        <button className="btn btn-primary" onClick={() => updateHelper(each.id)}>
                                             Update
                                        </button>
                                   </td>
                                   <td>
                                        <button className="btn btn-danger" onClick={() => deleteHandler(each.id)}>
                                             Delete
                                        </button>
                                   </td>
                              </tr>
                         ))}
                    </table>
               )}
          </div>
     );
}
