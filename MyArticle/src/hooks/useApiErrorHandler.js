import {useDispatch} from 'react-redux';

import {
  ERROR_BAD_REQUEST,
  ERROR_NETWORK_ERROR,
} from '../constants/errors';
import {showMessage} from 'react-native-flash-message';

const useApiErrorsHandler = () => {

  const showError = (title = '') => {
    showMessage({
      message: '',
      description: title,
      type: 'danger',
    });
  };

  return (error = {}) => {
    if (error.response) {
      const {status} = error.response;
      // handle http status codes
      switch (status) {
        case 400:
          console.warn('400 :bad_request');
          showError(ERROR_BAD_REQUEST);
          break;
        case 401:
          // TODO: Getting 401 for invalid email id/password too and May be we'll get the same for the token expiration.
          console.warn('401 :unauthorized');
          showError('401 :unauthorized');

          break;
        case 403:
          console.warn('403 :forbidden');
          showError('Not allowed');
          break;
        case 404:
          console.warn('404 :not_found');
          showError(error?.response?.data?.msg ?? 'Not found');
          break;
        case 419:
          console.warn('419 :too many attemps');
          showError(error?.response?.data?.msg ?? 'Too Many Requests');
          break;
        case 422:
          // TODO: Need to update message key from the backend.
          console.warn('422 :unprocessable_entity');
          showError('Something went wrong');
          break;
        case 429:
          console.warn('429 :too_many_requests');
          showError('Too Many Requests');
          break;
        case 500:
          console.warn('500 :internal_server_error');
          showError('Internal server error');
          break;
        default:
          console.warn('Response Error');

          break;
      }
    } else if (error.request) {
      console.warn('Network error');
      showError(ERROR_NETWORK_ERROR);
    } else {
      showError('Something went wrong');
    }
  };
};

export default useApiErrorsHandler;
