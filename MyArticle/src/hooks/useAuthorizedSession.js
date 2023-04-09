import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getUserDetails} from '../helpers/auth';
import {setUserDetailsAction} from '../store/userDetails';

const useAuthorizedSession = () => {
  const dispatch = useDispatch();

  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const checkStoredTokenAvailability = async () => {
      const storedUserDetails = await getUserDetails();

      if (storedUserDetails) {
        const userDetails = JSON.parse(storedUserDetails);
        dispatch(setUserDetailsAction(userDetails));
      } else {
        throw new Error('No UserDetails found');
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
  }, []);

  return [isInitializing];
};

export default useAuthorizedSession;
