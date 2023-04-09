import {useCallback, useEffect} from 'react';
import {addEventListener} from '@react-native-community/netinfo';
import debounce from 'lodash/debounce';
import {showMessage} from 'react-native-flash-message';

const NETWORK_CONNECTION_CHECK_DELAY = 3000;

const useConnectionInfo = () => {
  const _handleConnectionStatus = useCallback(
    debounce(
      (isConnectionStable = true) => {
        if (!isConnectionStable) {
          showMessage({
            message: 'Bad connection',
            description: 'Please check your internet connection',
            type: 'danger',
          });
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
      const {isConnected, isInternetReachable} = networkState;

      _handleConnectionStatus(isConnected && isInternetReachable);
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useConnectionInfo;
