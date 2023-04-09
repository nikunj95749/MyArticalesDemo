import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Images} from '../assets/images';
import {timeAgo} from '../helpers';
import {getComment, postComment} from '../resources/baseServices/article';
import SmallLoader from './Loader/SmallLoader';

export const PostItem = ({post, navigation}) => {
  const [comment, setComment] = useState('');
  const [loader, setLoader] = useState(false);

  const handleAddComment = async () => {
    setLoader(true);
    const commentData = {comment: {body: comment}};
    const res = await postComment(commentData, `/${post?.slug}/comments`);
    if (res.data) {
      setComment('');
      setLoader(false);
    }
  };
  return (
    <View key={post.id} style={styles.postView}>
      <View style={styles.flexDirectionRow}>
        <FastImage
          style={styles.authorImage}
          source={{uri: post?.author?.image}}
        />
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
      <View style={{paddingLeft: 4}}>
        <Text style={styles.postTitle}>{post?.title}</Text>
        <Text style={styles.postDescription}>{post?.description}</Text>
      </View>
      <View style={styles.postActionView}>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
          <FastImage
            style={styles.postActionImage}
            source={post?.favorited ? Images.fillHeart : Images.heart}
            resizeMode="contain"
            tintColor={'#c2c2c2'}
          />
          {post?.favoritesCount != 0 && (
            <Text style={styles.favoritesCountText}>
              {post?.favoritesCount}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Comments', {slug: post?.slug})}
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: 15}}>
          <FastImage
            style={styles.postActionImage}
            source={Images.comment}
            resizeMode="contain"
            tintColor={'#c2c2c2'}
          />
          {post?.commentCount != 0 && (
            <Text style={styles.favoritesCountText}>{post?.commentCount}</Text>
          )}
        </TouchableOpacity>
      </View>
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
          {loader ? (
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
    color: '#c2c2c2',
    fontSize: 16,
  },
  authorFollowerText: {
    marginLeft: 10,
    fontWeight: '400',
    color: '#c2c2c2',
    fontSize: 14,
  },
  postTitle: {
    marginTop: 15,
    fontWeight: '600',
    fontSize: 14,
    color: '#c2c2c2',
  },
  postDescription: {
    marginTop: 10,
    fontWeight: '400',
    fontSize: 14,
    color: '#c2c2c2',
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
    color: '#c2c2c2',
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
    borderColor: '#c2c2c2',
    color: '#c2c2c2',
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
