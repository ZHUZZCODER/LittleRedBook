import HeartIcon from '@/components/WaterfallFlowList/c-cpns/HeartIcon';
import React, {memo} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text, Image, TextInput} from 'react-native';
import IconEditComment from '@/assets/images/icon_edit_comment.png';
import IconCollection from '@/assets/images/icon_collection.png';
import IconCollectionSelected from '@/assets/images/icon_collection_selected.png';
import IconComment from '@/assets/images/icon_comment.png';
import type {ArticleComment} from '@/store/articleDetails';

interface IProps {
  children?: ReactNode;
  detailComment: {
    favoriteCount: number;
    collectionCount: number;
    isFavorite: boolean;
    isCollection: boolean;
    comments?: ArticleComment[];
  };
}

const BottomBar: FC<IProps> = props => {
  const {
    detailComment: {
      favoriteCount,
      collectionCount,
      isCollection,
      isFavorite,
      comments,
    },
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image source={IconEditComment} style={styles.editImg} />
        <TextInput
          style={styles.editInput}
          placeholder="说点什么"
          placeholderTextColor={'#333'}
        />
      </View>
      <HeartIcon defaultValue={isFavorite} whSize={30} />
      <Text style={styles.countTx}>{favoriteCount}</Text>
      <Image
        source={isCollection ? IconCollectionSelected : IconCollection}
        style={styles.iconImg}
      />
      <Text style={styles.countTx}>{collectionCount}</Text>
      <Image source={IconComment} style={styles.iconImg}></Image>
      <Text style={styles.countTx}>{comments?.length || 0}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64,
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  inputContainer: {
    height: 40,
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginRight: 12,
  },
  editImg: {
    width: 20,
    height: 20,
    //设置图标颜色
    tintColor: '#333',
  },
  editInput: {
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'center',
    paddingVertical: 0,
  },
  countTx: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  iconImg: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 12,
  },
});

export default memo(BottomBar);
