import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Images} from '../assets/images';
import {timeAgo} from '../helpers';
import {useSelector} from 'react-redux';

export const CommentsItem = ({comment, index, handleDeleteComment}) => {
  const user = useSelector(state => state.profileData.user_data ?? '');
  return (
    <View key={comment.id + index} style={styles.postView}>
      <View style={styles.flexDirectionRow}>
        <View style={{flexDirection: 'row'}}>
          <FastImage
            style={styles.authorImage}
            source={{uri: comment?.author?.image}}
          />
          <View style={{marginLeft: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
              tintColor={'#c2c2c2'}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.horizontalDivider} />
    </View>
  );
};

const styles = StyleSheet.create({
  postView: {
    paddingTop: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  authorImage: {
    height: 28,
    width: 28,
    borderRadius: 28 / 2,
  },
  authorName: {
    fontWeight: '600',
    color: '#c2c2c2',
    fontSize: 12,
  },
  commentText: {
    marginTop: 4,
    fontWeight: '600',
    color: '#c2c2c2',
    fontSize: 14,
  },
  createdAtText: {
    marginLeft: 8,
    fontWeight: '400',
    color: '#c2c2c2',
    fontSize: 12,
  },
  horizontalDivider: {
    marginTop: 10,
    width: '100%',
    height: 1,
    borderColor: '#c2c2c2',
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
  flexDirectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
