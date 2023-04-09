import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native';
import {PostItem} from '../../components/PostItem';
import {useDispatch, useSelector} from 'react-redux';
import {getArticles} from '../../resources/baseServices/article';
import {getArticle, getArticleTotal} from '../../store/article';
import ScreenLoader from '../../components/Loader/ScreenLoader';
import {Header} from '../../components/Header';
import {logError} from '../../helpers';
import {BLACK} from '../../styles';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import useApiErrorsHandler from '../../hooks/useApiErrorHandler';

const HomeFeedScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [isLoadingMoreItem, setIsLoadingMoreItem] = useState(false);
  const articleData = useSelector(state => state.article.article_data ?? '');
  const totalArticle = useSelector(state => state.article.article_total ?? '');

  const handleApiErrors = useApiErrorsHandler();

  useEffect(() => {
    getArticleData();
  }, []);

  const getArticleData = async () => {
    try {
      setLoader(true);
      const res = await getArticles(totalArticle?.page);
      if (res?.data) {
        const paginationData = {
          page: totalArticle?.page,
          totalData: res?.data?.articlesCount,
        };
        dispatch(getArticle(res?.data?.articles));
        dispatch(getArticleTotal(paginationData));
      }
    } catch (error) {
      handleApiErrors(error);
      logError(error, 'getArticleData');
    } finally {
      setLoader(false);
    }
  };

  const loadMorePosts = async () => {
    try {
      if (totalArticle?.totalData > articleData?.length) {
        setIsLoadingMoreItem(true);
        const res = await getArticles(totalArticle?.page + 1);
        if (res?.data) {
          const paginationData = {
            page: totalArticle?.page + 1,
            totalData: res?.data?.articlesCount,
          };
          dispatch(getArticle([...articleData, ...res?.data?.articles]));
          dispatch(getArticleTotal(paginationData));
        }
      }
    } catch (error) {
      handleApiErrors(error);
      logError(error, 'loadMorePosts');
    } finally {
      setIsLoadingMoreItem(false);
    }
  };

  const renderFooter = () => {
    if (!isLoadingMoreItem) return null;
    return <ActivityIndicator />;
  };

  const handleEndReached = () => {
    if (!isLoadingMoreItem) {
      loadMorePosts();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loader && <ScreenLoader />}
      <Header navigation={navigation} title={'Home'} backIcon={false} />
      <KeyboardAwareFlatList
        data={articleData}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <PostItem post={item} navigation={navigation} />
        )}
        keyExtractor={(_, index) => index}
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
    backgroundColor: BLACK,
  },
});

export default HomeFeedScreen;
