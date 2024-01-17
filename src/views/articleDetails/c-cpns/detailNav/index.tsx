import React, {memo, useCallback} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import IconArrow from '@/assets/images/icon_arrow.png';
import IconShare from '@/assets/images/icon_share.png';
import {useNavigation} from '@react-navigation/native';
import type {NavigationScreenProps} from '@/router';

interface IProps {
  children?: ReactNode;
  navInfo: {
    avatarUrl: string;
    userName: string;
  };
}

const DetailNav: FC<IProps> = props => {
  const {
    navInfo: {avatarUrl, userName},
  } = props;
  const navigation = useNavigation<NavigationScreenProps>();
  const hanldeBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={hanldeBack} style={styles.leftBar}>
        <Image source={IconArrow} style={styles.barImg} />
      </TouchableOpacity>
      <Image src={avatarUrl} style={styles.avatarImg} />
      <Text style={styles.userNameTx}>{userName}</Text>
      <Text style={styles.attentionBtn}>关注</Text>
      <Image source={IconShare} style={styles.shareImg} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: 'white',
  },
  leftBar: {
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  barImg: {
    width: 20,
    height: 20,
  },
  avatarImg: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  userNameTx: {
    fontSize: 15,
    flex: 1,
    color: '#333',
    marginLeft: 16,
  },
  attentionBtn: {
    paddingHorizontal: 16,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ff2442',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    color: '#ff2442',
  },
  shareImg: {
    width: 28,
    height: 28,
    marginHorizontal: 16,
  },
});

export default memo(DetailNav);
