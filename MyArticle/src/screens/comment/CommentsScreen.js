import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {CommentsItem} from '../../components/CommentsItem';
import {
  deleteComment,
  getComment,
  postComment,
} from '../../resources/baseServices/article';
import ScreenLoader from '../../components/Loader/ScreenLoader';
import {logError, sortByDate} from '../../helpers';
import {Header} from '../../components/Header';
import {BLACK} from '../../styles';
import {EnterCommentPostField} from '../../components/EnterCommentPostField';
import useApiErrorsHandler from '../../hooks/useApiErrorHandler';

const CommentsScreen = ({navigation, route}) => {
  const [commentData, setCommentData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [commentLoader, setCommentLoaderLoader] = useState(false);
  
  const handleApiErrors = useApiErrorsHandler();

  useEffect(() => {
    getCommentData();
  }, []);

  const getCommentData = async () => {
    setLoader(true);
    const res = await getComment({}, `/${route?.params?.slug}/comments`);
    if (res?.data) {
      setCommentData(res?.data?.comments);
      setLoader(false);
    }
  };

  const handleAddComment = async data => {
    try {
      setCommentLoaderLoader(true);
      const commentRes = {comment: {body: data}};
      const res = await postComment(commentRes, route?.params?.slug);
      if (res?.data) {
        setCommentData([res?.data?.comment, ...commentData]);
      }
    } catch (error) {
      handleApiErrors(error);
      logError(error, 'handleAddComment');
    } finally {
      setCommentLoaderLoader(false);
    }
  };

  const handleDeleteComment = async commentId => {
    try {
      setLoader(true);
      const res = await deleteComment(route?.params?.slug, commentId);
      if (res?.data) {
        const filterComment = commentData?.filter(
          item => item?.id != commentId,
        );
        setCommentData(filterComment);
      }
    } catch (error) {
      handleApiErrors(error);
      logError(error, 'handleDeleteComment');
    } finally {
      setLoader(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title={'Comments'} backIcon={true} />
      {loader && <ScreenLoader />}

      <FlatList
        data={sortByDate(commentData)}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <CommentsItem
            comment={item}
            index={index}
            handleDeleteComment={handleDeleteComment}
            route={route}
            setLoader={setLoader}
            setCommentData={setCommentData}
            commentData={commentData}
          />
        )}
        keyExtractor={(item, index) => item + index}
      />
      <KeyboardAvoidingView
        style={Platform.OS === 'ios' && styles.avoidingView}
        behavior={Platform.OS === 'android' ? 'height' : 'position'}>
        <EnterCommentPostField
          style={styles.commentFieldContainer}
          onPost={data => {
            handleAddComment(data);
          }}
          isLoading={commentLoader}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
  },
  flex: {flex: 1},
  avoidingView: {position: 'absolute', left: 0, right: 0, bottom: 30},
  commentFieldContainer: {paddingVertical: 20, backgroundColor: BLACK},
});

export default CommentsScreen;
