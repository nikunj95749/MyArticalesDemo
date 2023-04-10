import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import SmallLoader from './Loader/SmallLoader';
import {BLUE, LIGHT_GRAY_105} from '../styles';
import {useSelector} from 'react-redux';

export const EnterCommentPostField = ({
  onPost = () => {},
  isLoading = false,
  style = {},
  isDisable = false,
  handleOnComment = () => {},
}) => {
  const [comment, setComment] = useState('');
  const user = useSelector(state => state.userDetails.user_data ?? '');

  const handlePost = () => {
    if (comment.length > 0) {
      onPost(comment);
      setComment('');
    }
  };

  return (
    <View style={[styles.commentView, style, {opacity: isDisable ? 0.5 : 1}]}>
      {user?.image && (
        <FastImage
          style={styles.loginUserName}
          source={{
            uri: user?.image,
          }}
        />
      )}
      <View style={styles.commentInput}>
        <TextInput
          placeholder="Comment on this..."
          placeholderTextColor={LIGHT_GRAY_105}
          editable={!isDisable}
          onChangeText={setComment}
          value={comment}
        />
      </View>

      <TouchableOpacity
        onPress={handlePost}
        disabled={comment.length == 0 ? true : false}>
        {isLoading ? (
          <SmallLoader style={styles.smallLoaderContainer} />
        ) : (
          <Text
            style={[styles.postText, {opacity: comment.length == 0 ? 0.5 : 1}]}>
            Post
          </Text>
        )}
      </TouchableOpacity>

      {isDisable && (
        <TouchableOpacity
          onPress={handleOnComment}
          style={styles.disabledView}></TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  postView: {
    marginTop: 10,
    padding: 10,
    borderRadius: 15,
  },
  disabledView: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  smallLoaderContainer: {marginRight: 10},
  hearView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  authorImage: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
  },
  authorName: {
    marginLeft: 10,
    fontWeight: '600',
    color: LIGHT_GRAY_105,
    fontSize: 16,
  },
  authorFollowerText: {
    marginLeft: 10,
    fontWeight: '400',
    color: LIGHT_GRAY_105,
    fontSize: 14,
  },
  postTitle: {
    marginTop: 15,
    fontWeight: '600',
    fontSize: 14,
    color: LIGHT_GRAY_105,
  },
  postDescription: {
    marginTop: 10,
    fontWeight: '400',
    fontSize: 14,
    color: LIGHT_GRAY_105,
  },
  tagContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tag: {
    overflow: 'hidden',
    backgroundColor: 'rgba(54, 119, 239, 0.1)',
    borderRadius: 10,
    fontSize: 12,
    color: BLUE,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginRight: 4,
  },
  postActionView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  postActionImage: {
    height: 20,
    width: 20,
  },
  favoritesCountText: {
    marginLeft: 5,
    fontWeight: '400',
    color: LIGHT_GRAY_105,
    fontSize: 14,
  },
  commentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  loginUserName: {
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
  },
  commentInput: {
    height: 40,
    flex: 1,
    paddingLeft: 10,
    paddingRight: 50,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: LIGHT_GRAY_105,
    color: LIGHT_GRAY_105,
  },
  postText: {
    fontWeight: '600',
    fontSize: 14,
    color: BLUE,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
});
