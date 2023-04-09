import { useCallback, useEffect } from 'react';
import { addEventListener } from '@react-native-community/netinfo';
import { useDispatch } from 'react-redux';
import { notify } from '../store/notifications';
import debounce from 'lodash/debounce';

const NETWORK_CONNECTION_CHECK_DELAY = 3000;

const useConnectionInfo = () => {
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const _handleConnectionStatus = useCallback(
    debounce(
      (isConnectionStable = true) => {
        if (!isConnectionStable) {
          dispatch(
            notify({
              title: 'Bad connection',
              message: 'Please check your internet connection',
              type: 'warning',
            }),
          );
        }
      },
      NETWORK_CONNECTION_CHECK_DELAY,
      {
        leading: false,
        trailing: true,
      },
    ),
    [],
  );

  useEffect(() => {
    const unsubscribe = addEventListener(networkState => {
      const { isConnected, isInternetReachable } = networkState;

      _handleConnectionStatus(isConnected && isInternetReachable);
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useConnectionInfo;
