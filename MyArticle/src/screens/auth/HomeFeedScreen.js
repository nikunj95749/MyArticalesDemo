import React, {useEffect, useState, useRef} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  AppState,
  ActivityIndicator,
} from 'react-native';
import {PostItem} from '../../components/PostItem';
import {useDispatch, useSelector} from 'react-redux';
import {Article} from '../../resources/baseServices/article';
import {getArticle, getArticleTotal} from '../../store/article';
import {getArticles, setStorageArticle} from '../../resources/articleService';
import ScreenLoader from '../../components/Loader/ScreenLoader';
import {Header} from '../../components/Header';

const HomeFeedScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const articleData = useSelector(state => state.article.article_data ?? '');
  const totalArticle = useSelector(state => state.article.article_total ?? '');

  const appState = useRef(AppState.currentState);

  const loadFromStorage = async () => {
    const storedData = await getArticles();
    if (storedData && storedData == [] && storedData?.length != 2) {
      dispatch(getArticle(JSON.parse(storedData)));
    } else {
      getArticleData();
    }
  };

  const saveToStorage = async () => {
    await setStorageArticle(articleData);
  };

  useEffect(() => {
    loadFromStorage();
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      saveToStorage();
    }
    appState.current = nextAppState;
  };

  const getArticleData = async () => {
    console.log('-----------hello');
    setLoader(true);
    const res = await Article({}, `&offset=${totalArticle?.page}`);
    if (res?.data) {
      const paginationData = {
        page: totalArticle?.page,
        totalData: res?.data?.articlesCount,
      };
      dispatch(getArticle(res?.data?.articles));
      dispatch(getArticleTotal(paginationData));
      setLoader(false);
    }
  };

  const loadMorePosts = async () => {
    if (totalArticle?.totalData > articleData?.length) {
      setIsLoading(true);
      const res = await Article({}, `&offset=${totalArticle?.page + 1}`);
      if (res?.data) {
        const paginationData = {
          page: totalArticle?.page + 1,
          totalData: res?.data?.articlesCount,
        };
        dispatch(getArticle([...articleData, ...res?.data?.articles]));
        dispatch(getArticleTotal(paginationData));
      }
      setIsLoading(false);
      return;
    } else {
      setIsLoading(false);
      return;
    }
  };

  const renderFooter = () => {
    if (!isLoading) return null;
    return <ActivityIndicator />;
  };

  const handleEndReached = () => {
    if (!isLoading) {
      loadMorePosts();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loader && <ScreenLoader />}
      <Header navigation={navigation} title={'Home'} backIcon={false} />
      <FlatList
        data={articleData}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <PostItem post={item} navigation={navigation} />
        )}
        keyExtractor={(item, index) => item + index}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default HomeFeedScreen;
