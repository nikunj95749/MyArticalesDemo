import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Images} from '../assets/images';
import {logError, timeAgo} from '../helpers';
import {postComment} from '../resources/baseServices/article';
import {useSelector} from 'react-redux';
import {LIGHT_GRAY_105} from '../styles';
import {EnterCommentPostField} from './EnterCommentPostField';
import useApiErrorsHandler from '../hooks/useApiErrorHandler';

export const PostItem = ({post, navigation}) => {
  const user = useSelector(state => state.userDetails.user_data ?? '');  
  const [loader, setLoader] = useState(false);

  const handleApiErrors = useApiErrorsHandler();

  const handlePostComment = async (data = '') => {
    try {
      setLoader(true);
      const commentData = {comment: {body: data}};
      await postComment(commentData, post?.slug);
    } catch (error) {
      handleApiErrors(error);
      logError(error, 'handlePostComment');
    } finally {
      setLoader(false);
    }
  };

  const handleComment = () => {
    if (user?.username) {
      navigation.navigate('Comments', {slug: post?.slug});
    } else {
      navigation.navigate('Login');
    }
  }

  return (
    <View key={post.id} style={styles.postView}>
      <View style={styles.flexDirectionRow}>
        {post?.author?.image &&<FastImage
          style={styles.authorImage}
          source={{uri: post?.author?.image}}
        />}
        <View>
          <View>
            <Text style={styles.authorName}>{post?.author?.username}</Text>
            <Text style={styles.authorFollowerText}>
              {timeAgo(post?.createdAt)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.tagContainer}>
        {post?.tagList.map(tag => (
          <Text style={styles.tag} key={tag}>
            @{tag}
          </Text>
        ))}
      </View>
      <View style={styles.contentView}>
        <Text style={styles.postTitle}>{post?.title}</Text>
        <Text style={styles.postDescription}>{post?.description}</Text>
      </View>
      <View style={styles.postActionView}>
        <TouchableOpacity style={styles.favoriteContainer}>
          <FastImage
            style={styles.postActionImage}
            source={post?.favorited ? Images.fillHeart : Images.heart}
            resizeMode="contain"
            tintColor={LIGHT_GRAY_105}
          />
          {post?.favoritesCount != 0 && (
            <Text style={styles.favoritesCountText}>
              {post?.favoritesCount}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleComment}
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: 15}}>
          <FastImage
            style={styles.postActionImage}
            source={Images.comment}
            resizeMode="contain"
            tintColor={LIGHT_GRAY_105}
          />
        </TouchableOpacity>
      </View>
      <EnterCommentPostField
        onPost={data => {
          handlePostComment(data);
        }}
        isDisable={!user?.username}
        isLoading={loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  postView: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#0c0f13',
    borderRadius: 15,
  },
  contentView:{paddingLeft: 4},
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
  favoriteContainer:{flexDirection: 'row', alignItems: 'center'},
  tag: {
    overflow: 'hidden',
    backgroundColor: 'rgba(54, 119, 239, 0.1)',
    borderRadius: 10,
    fontSize: 12,
    color: '#3677ef',
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
    paddingLeft: 10,
    paddingRight: 50,
    width: '85%',
    borderRadius: 20,
    alignSelf: 'center',
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: LIGHT_GRAY_105,
    color: LIGHT_GRAY_105,
  },
  postButton: {
    position: 'absolute',
    right: 20,
  },
  postText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#3677ef',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
});
