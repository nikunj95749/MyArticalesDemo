import { useDispatch } from 'react-redux';
import { notify } from '../store/notifications';
import { removeAuthTokenAction } from '../store/auth';

import {
  ERROR_BAD_REQUEST,
  ERROR_NETWORK_ERROR,
  ERROR_UNEXPECTED,
} from '../constants/errors';
import { clearAsyncStorage } from '../helpers/auth';

const useApiErrorsHandler = () => {
  const dispatch = useDispatch();


  const _handleLogout = async () => {
    try {
      dispatch(removeAuthTokenAction());
      await clearAsyncStorage();
    } catch (e) {
      console.warn('_handleLogout Error', e);
    }
  };

  return (error = {}) => {
    if (error.response) {
      const { status } = error.response;
      // handle http status codes
      switch (status) {
        case 400:
          console.warn('400 :bad_request');
          dispatch(notify({ title: ERROR_BAD_REQUEST, type: 'warning' }));
          break;
        case 401:
          // TODO: Getting 401 for invalid email id/password too and May be we'll get the same for the token expiration.
          console.warn('401 :unauthorized');
          dispatch(
            notify({
              title: 'Error',
              message: error.response.data.msg,
              type: 'warning',
            }),
          );
          _handleLogout();
          break;
        case 403:
          console.warn('403 :forbidden');
          dispatch(notify({ title: 'Not allowed', type: 'warning' }));
          break;
        case 404:
          console.warn('404 :not_found');
          dispatch(
            notify({
              title: error?.response?.data?.msg ?? 'Not found',
              type: 'warning',
            }),
          );
          break;
        case 419:
          console.warn('419 :too many attemps');
          dispatch(
            notify({
              title: error?.response?.data?.msg ?? 'Too Many Requests',
              type: 'warning',
            }),
          );
          break;
        case 422:
          // TODO: Need to update message key from the backend.
          console.warn('422 :unprocessable_entity');
          dispatch(
            notify({
              title: error?.response?.data?.msg ?? 'Something went wrong',
              type: 'warning',
            }),
          );
          break;
        case 429:
          console.warn('429 :too_many_requests');
          dispatch(notify({ title: 'Too Many Requests', type: 'warning' }));
          break;
        case 500:
          console.warn('500 :internal_server_error');
          dispatch(
            notify({
              title: 'Internal server error',
              message: 'Please wait and try again later',
              type: 'warning',
            }),
          );
          break;
        default:
          console.warn('Response Error');
          dispatch(notify({ title: ERROR_UNEXPECTED, type: 'warning' }));
          break;
      }
    } else if (error.request) {
      console.warn('Network error');
      dispatch(notify({ title: ERROR_NETWORK_ERROR, type: 'warning' }));
    } else {
      // Something happened in setting up the request and triggered an Error
      console.warn('unrepentant_error');
      dispatch(notify({ title: ERROR_UNEXPECTED, type: 'warning' }));
    }
    // log error into console
    console.warn('ApiErrorHandler', error);
  };
};

export default useApiErrorsHandler;
