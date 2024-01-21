import React, {memo} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import type {UserInfo} from '@/store/user';
import IconAdd from '@/assets/images/icon_add.png';
import IconQrCode from '@/assets/images/icon_qrcode.png';
import IconMan from '@/assets/images/icon_male.png';
import IconFemale from '@/assets/images/icon_female.png';
import type {Info} from '@/store/mine';
import {observer} from 'mobx-react';
import {useStore} from '@/store';
import {isObject} from '@/utils/type';
import IconSetting from '@/assets/images/icon_setting.png';
import type {LayoutChangeEvent} from 'react-native';

interface IProps {
  children?: ReactNode;
  layoutCb?: (e: LayoutChangeEvent) => void;
}

const MineInfo: FC<IProps> = props => {
  const {layoutCb} = props;
  const {
    userStore: {userInfo},
    mineStore: {info},
  } = useStore();

  return (
    <View
      style={styles.container}
      onLayout={(e: LayoutChangeEvent) => {
        layoutCb?.(e);
      }}>
      {isObject<UserInfo>(userInfo) && (
        <>
          <View style={styles.userInfoBox}>
            <Image src={userInfo.avatar} style={styles.avatarImg} />
            <Image source={IconAdd} style={styles.iconAddImg} />
            <View style={styles.infoNameBox}>
              <Text style={styles.nickNameTx}>{userInfo.nickName}</Text>
              <View style={styles.orCodeBox}>
                <Text style={styles.orCodeTx}>
                  小红书号: {userInfo.redBookId}
                </Text>
                <Image source={IconQrCode} style={styles.orCodeImg} />
              </View>
            </View>
          </View>
          <Text style={styles.infoDesc}>个人简介信息内容热更新</Text>
          <View style={styles.sexBox}>
            <Image
              source={userInfo.sex === 'male' ? IconMan : IconFemale}
              style={styles.sexImg}
            />
          </View>
        </>
      )}
      {isObject<Info>(info) && (
        <View style={styles.followFans}>
          <View style={styles.infoItem}>
            <Text style={styles.infoCount}>{info.followCount ?? 2}</Text>
            <Text style={styles.infoTitle}>关注</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoCount}>{info.fans}</Text>
            <Text style={styles.infoTitle}>粉丝</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoCount}>{info.favorateCount}</Text>
            <Text style={styles.infoTitle}>获赞与收藏</Text>
          </View>
          <View style={styles.divider}></View>
          <TouchableOpacity style={styles.settingBtn}>
            <Text style={styles.settingTx}>编辑资料</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingBtn}>
            <Image source={IconSetting} style={styles.settingImg} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  userInfoBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 96,
  },
  avatarImg: {
    width: 96,
    height: 96,
    resizeMode: 'cover',
    borderRadius: 48,
  },
  iconAddImg: {
    width: 28,
    height: 28,
    marginLeft: -28,
    marginBottom: 2,
  },
  infoNameBox: {
    marginLeft: 20,
    justifyContent: 'center',
    height: '100%',
  },
  nickNameTx: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  orCodeBox: {
    flexDirection: 'row',
    marginTop: 16,
  },
  orCodeTx: {
    fontSize: 12,
    color: '#bbb',
  },
  orCodeImg: {
    width: 12,
    height: 12,
    marginLeft: 6,
    tintColor: '#bbb',
    position: 'relative',
    top: 3,
  },
  divider: {
    flex: 1,
  },
  infoDesc: {
    fontSize: 14,
    color: 'white',
    marginTop: 20,
  },
  sexBox: {
    width: 32,
    height: 24,
    backgroundColor: '#ffffff50',
    borderRadius: 12,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sexImg: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
  followFans: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 28,
    paddingHorizontal: 16,
  },
  infoItem: {
    alignItems: 'center',
    paddingRight: 16,
  },
  infoCount: {
    fontSize: 18,
    color: 'white',
  },
  infoTitle: {
    fontSize: 12,
    color: '#ddd',
    marginTop: 6,
  },
  settingBtn: {
    height: 32,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  settingTx: {
    fontSize: 14,
    color: '#ffffff',
  },
  settingImg: {
    width: 20,
    height: 20,
    tintColor: '#ffffff',
  },
});

export default memo(observer(MineInfo));
