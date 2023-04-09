import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CommentsItem} from '../../components/CommentsItem';
import {
  deleteComment,
  getComment,
  postComment,
} from '../../resources/baseServices/article';
import ScreenLoader from '../../components/Loader/ScreenLoader';
import SmallLoader from '../../components/Loader/SmallLoader';
import {sortByDate} from '../../helpers';
import {Header} from '../../components/Header';

const CommentsScreen = ({navigation, route}) => {
  const [commentData, setCommentData] = useState([]);
  const [comment, setComment] = useState('');
  const [loader, setLoader] = useState(false);
  const [commentLoader, setCommentLoaderLoader] = useState(false);

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

  const handleAddComment = async () => {
    setCommentLoaderLoader(true);
    const commentRes = {comment: {body: comment}};
    const res = await postComment(
      commentRes,
      `/${route?.params?.slug}/comments`,
    );
    if (res?.data) {
      setCommentData([res?.data?.comment, ...commentData]);
      setComment('');
      setCommentLoaderLoader(false);
    }
  };

  const handleDeleteComment = async commentId => {
    setLoader(true);
    const res = await deleteComment(
      {},
      `/${route?.params?.slug}/comments/${commentId}`,
    );
    if (res?.data) {
      const filterComment = commentData?.filter(item => item?.id != commentId);
      setCommentData(filterComment);
      setLoader(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title={'Comments'} backIcon={true} />
      {loader && <ScreenLoader />}
      <KeyboardAwareScrollView
        scrollEnabled={false}
        contentContainerStyle={{flex: 1}}>
        <FlatList
          data={sortByDate(commentData)}
          contentContainerStyle={{paddingBottom: 100}}
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
        <View style={styles.commentView}>
          <FastImage
            style={styles.loginUserName}
            source={{
              uri: 'https://torum-bucket.s3.us-east-2.amazonaws.com/600698915a08de0dc542f27c/image/gZSnkxe0J5.jpeg',
            }}
          />
          <TextInput
            placeholder="Comment on this..."
            placeholderTextColor={'#c2c2c2'}
            style={styles.commentInput}
            onChangeText={setComment}
            value={comment}
          />
          <TouchableOpacity
            style={styles.postButton}
            onPress={handleAddComment}
            disabled={comment.length == 0 ? true : false}>
            {commentLoader ? (
              <SmallLoader style={{marginRight: 10}} />
            ) : (
              <Text
                style={[
                  styles.postText,
                  {opacity: comment.length == 0 ? 0.5 : 1},
                ]}>
                Post
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  commentView: {
    marginTop: 10,
    backgroundColor: '#000',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    bottom: 0,
    zIndex: 1,
  },
  loginUserName: {
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
  },
  commentInput: {
    height: 40,
    paddingLeft: 10,
    paddingRight: 50,
    width: '85%',
    borderRadius: 20,
    alignSelf: 'center',
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: '#c2c2c2',
    color: '#c2c2c2',
  },
  postButton: {
    position: 'absolute',
    right: 35,
  },
  postText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#3677ef',
  },
});

export default CommentsScreen;
