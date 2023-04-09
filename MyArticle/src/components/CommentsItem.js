import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Images} from '../assets/images';
import {timeAgo} from '../helpers';
import {useSelector} from 'react-redux';
import {LIGHT_GRAY_105} from '../styles';

export const CommentsItem = ({
  comment,
  index,
  handleDeleteComment = () => {},
}) => {
  const user = useSelector(state => state.userDetails.user_data ?? '');
  return (
    <View key={comment.id + index} style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <FastImage
            style={styles.authorImage}
            source={{uri: comment?.author?.image}}
          />
          <View style={styles.contentContainer}>
            <View style={styles.contentSubView}>
              <Text style={styles.authorName}>{comment?.author?.username}</Text>
              <Text style={styles.createdAtText}>
                {timeAgo(comment?.createdAt)}
              </Text>
            </View>
            <Text style={styles.commentText}>{comment?.body}</Text>
          </View>
        </View>
        {user?.username == comment?.author?.username && (
          <TouchableOpacity
            onPress={() => handleDeleteComment(comment?.id)}
            style={styles.deleteIconView}>
            <FastImage
              style={styles.deleteImage}
              source={Images.delete}
              resizeMode="contain"
              tintColor={LIGHT_GRAY_105}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.horizontalDivider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  imageContainer: {flexDirection: 'row'},
  authorImage: {
    height: 28,
    width: 28,
    borderRadius: 28 / 2,
  },
  authorName: {
    fontWeight: '600',
    color: LIGHT_GRAY_105,
    fontSize: 12,
  },
  commentText: {
    marginTop: 4,
    fontWeight: '600',
    color: LIGHT_GRAY_105,
    fontSize: 14,
  },
  createdAtText: {
    marginLeft: 8,
    fontWeight: '400',
    color: LIGHT_GRAY_105,
    fontSize: 12,
  },
  horizontalDivider: {
    marginTop: 10,
    width: '100%',
    height: 1,
    borderColor: LIGHT_GRAY_105,
    borderTopWidth: 0.5,
    alignSelf: 'center',
  },
  deleteIconView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  deleteImage: {
    height: 20,
    width: 20,
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {marginLeft: 10},
  contentSubView: {flexDirection: 'row', alignItems: 'center'},
});
