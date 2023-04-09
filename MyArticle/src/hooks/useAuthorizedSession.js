import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setAuthTokenAction} from '../store/auth';
import {getAuthToken} from '../helpers/auth';

const useAuthorizedSession = () => {

  const authToken = useSelector(state => state.auth?.authToken ?? '');
  const dispatch = useDispatch();

  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const checkStoredTokenAvailability = async () => {
      const storedToken = await getAuthToken();

      if (storedToken) {
        dispatch(setAuthTokenAction(storedToken));
      } else {
        throw new Error('No token found');
      }
    };

    const validateSessionAndFetch = async () => {
      try {
        await checkStoredTokenAvailability();
      } catch (err) {
        console.warn(err);
      } finally {
        setIsInitializing(false);
      }
    };

    validateSessionAndFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [authToken, isInitializing];
};

export default useAuthorizedSession;
