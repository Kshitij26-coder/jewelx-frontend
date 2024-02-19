import axios from 'axios';
import { showErrorSnackbar, showSuccessSnackbar } from '../snackBar';

//imports server url from env
export let url = import.meta.env.VITE_SERVER_URL;
/**
 *
 * @param {*} data
 * @param {string} endpoint
 * @param {import('react-router-dom').NavigateFunction}navigate
 * @param {import('notistack').EnqueueSnackbar}enqueueSnackbar
 * @returns {*}
 * Helps to make post request to the server
 */
export let postRequest = async (data, endpoint, navigate, enqueueSnackbar) => {
     try {
          const response = await axios.post(url + endpoint, data);
          return response.data;
     } catch (err) {

          if (err.response) {
               // The request was made and the server responded with a status code
               if (err.response.status === 401) {
                    // Unauthorized, navigate to login page
                    //logout the user
                    showErrorSnackbar('Unauthorized Access', enqueueSnackbar);
                    navigate('/login');
               }
               console.log(err.response);
               showErrorSnackbar(err.response.data.message ? err.response.data.message : err.response.data? err.response.data :"Something Went Wrong", enqueueSnackbar);
               throw new Error(err.response.data.message ? err.response.data.message : err.response.data? err.response.data :"Something Went Wrong");
          } else if (err.request) {
               // The request was made but no response was received
               showErrorSnackbar("Can't connect to server", enqueueSnackbar);
               throw new Error("Can't connect to server");
          } else {
               // Something happened in setting up the request that triggered an error
               showErrorSnackbar('Something went wrong', enqueueSnackbar);
               navigate('/error500');
               //throw new Error('Something went wrong');
          }
     }
};

/**
 *
 * @param {string} endpoint
 * @param {import('react-router-dom').NavigateFunction} navigate
 * @param {import('notistack').EnqueueSnackbar} enqueueSnackbar
 * @returns {*}
 * Helps to make get request to the server
 */
export let getRequest = async (endpoint, navigate, enqueueSnackbar) => {
     try {
          const response = await axios.get(url + endpoint);
          console.log(response);
          return response.data;
     } catch (err) {
          if (err.response) {
               // The request was made and the server responded with a status code
               if (err.response.status === 401) {
                    // Unauthorized, navigate to login page
                    //logout the user
                    showErrorSnackbar('Unauthorized Access', enqueueSnackbar);
                    navigate('/login');
               } else {
                    showErrorSnackbar(err.response.data.message ? err.response.data.message : err.response.data, enqueueSnackbar);
                    throw new Error(err.response.data.message);
               }
          } else if (err.request) {
               // The request was made but no response was received
               showErrorSnackbar('Connection Failed', enqueueSnackbar);
               throw new Error("Can't connect to server");
          } else {
               // Something happened in setting up the request that triggered an error
               showErrorSnackbar('Something went wrong', enqueueSnackbar);
               navigate('/error500');
               // throw new Error('Something went wrong');
          }
     }
};

/**
 *
 * @param {string} id //id must be in '/id' format while calling the method
 * @param {*} data
 * @param {string} endpoint
 * @param {import('react-router-dom').NavigateFunction} navigate
 * @param {import('notistack').EnqueueSnackbar} enqueueSnackbar
 * @returns {*}
 */
export let putRequest = async (id, data, endpoint, navigate, enqueueSnackbar) => {
     try {
          const response = await axios.put(url + endpoint + `${id}`, data);
          showSuccessSnackbar(response.data ? response.data : ` Updated successfully`, enqueueSnackbar);
     } catch (err) {
          if (err.response) {
               // The request was made and the server responded with a status code
               if (err.response.status === 401) {
                    // Unauthorized, navigate to login page
                    //logout the user
                    showErrorSnackbar('Unauthorized Access', enqueueSnackbar);
                    navigate('/login');
               } else {
                    showErrorSnackbar(err.response.data.message ? err.response.data.message : err.response.data, enqueueSnackbar);
                    throw new Error(err.response.data.message);
               }
          } else if (err.request) {
               // The request was made but no response was received
               showErrorSnackbar('Connection Failed', enqueueSnackbar);
               throw new Error("Can't connect to server");
          } else {
               // Something happened in setting up the request that triggered an error
               showErrorSnackbar('Something went wrong', enqueueSnackbar);
               navigate('/error500');
               // throw new Error('Something went wrong');
          }
     }
};

/**
 *
 * @param {string} id
 * @param {*} data
 * @param {string} endpoint
 * @param {import('react-router-dom').NavigateFunction} navigate
 * @param {import('notistack').EnqueueSnackbar} enqueueSnackbar
 * @returns {*}
 */
export let deleteRequest = async (endpoint, id, navigate, enqueueSnackbar) => {
     try {
          const response = await axios.delete(url + endpoint + `/${id}`);
          showSuccessSnackbar(response.data ? response.data : `${id} Deleted successfully`);
     } catch (err) {
          if (err.response) {
               // The request was made and the server responded with a status code
               if (err.response.status === 401) {
                    // Unauthorized, navigate to login page
                    //logout the user
                    showErrorSnackbar('Unauthorized Access', enqueueSnackbar);
                    navigate('/login');
               }
               showErrorSnackbar(err.response.data.message ? err.response.data.message : err.response.data, enqueueSnackbar);
               throw new Error(err.response.data.message);
          } else if (err.request) {
               // The request was made but no response was received
               showErrorSnackbar('Connection Failed', enqueueSnackbar);
               navigate('/error500');
               throw new Error("Can't connect to server");
          } else {
               // Something happened in setting up the request that triggered an error
               showErrorSnackbar('Something went wrong', enqueueSnackbar);
               navigate('/error500');
               // throw new Error('Something went wrong');
          }
     }
};