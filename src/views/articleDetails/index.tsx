import React, {memo, useEffect, useMemo} from 'react';
import type {FC, ReactNode} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import DetailNav from './c-cpns/detailNav';
import {observer} from 'mobx-react';
import {useStore} from '@/store';
import {useRoute} from '@react-navigation/native';
import {isDefined} from '@/utils/type';
import type {NavigationScreenRoute} from '@/router';
import DetailSwiper from './c-cpns/detailSwiper';
import TitleInfo from './c-cpns/titleInfo';
import Comment from './c-cpns/comment';
import BottomBar from './c-cpns/bottomBar';

interface IProps {
  children?: ReactNode;
}

const ArticleDetails: FC<IProps> = props => {
  const {
    articleDetials,
    userStore: {userInfo},
  } = useStore();
  const {detail} = articleDetials;
  const {params} = useRoute<NavigationScreenRoute>();

  useEffect(() => {
    if (isDefined(params?.id)) {
      articleDetials.requestDetailData(params!.id);
    }
  }, [params?.id, articleDetials]);

  const detailCommentContent = useMemo(() => {
    const commentLength = detail?.comments?.length ?? 0;
    return commentLength ? `共${commentLength}条评论` : `暂无评论`;
  }, [detail?.comments]);

  return (
    <View style={styles.container}>
      {!!detail && (
        <>
          <DetailNav
            navInfo={{
              avatarUrl: detail.avatarUrl,
              userName: detail.userName,
            }}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <DetailSwiper imageList={detail.images} />
            <View style={styles.detailMsg}>
              <TitleInfo
                titleInfo={{
                  title: detail.title,
                  desc: detail.desc,
                  tag: detail.tag,
                  dateTime: detail.dateTime,
                  location: detail.location,
                }}
              />
              <Text style={styles.totalCommentTx}>{detailCommentContent}</Text>
              <View style={styles.inputBox}>
                {userInfo?.avatar && (
                  <Image src={userInfo.avatar} style={styles.inputAvatarImg} />
                )}
                <TextInput
                  placeholder="说点什么吧，万一火了呢～"
                  placeholderTextColor={'#bbb'}
                  style={styles.commentInput}
                />
              </View>
              {detail.comments && !!detail.comments.length && (
                <View>
                  {detail.comments.map((comment, index) => {
                    return (
                      <Comment
                        key={index}
                        commentData={comment}
                        isShowDivider={true}>
                        {!!comment.children?.length &&
                          comment.children.map((childComment, childIndex) => {
                            return (
                              <Comment
                                key={childIndex}
                                commentData={childComment}
                                isShowDivider={false}
                              />
                            );
                          })}
                      </Comment>
                    );
                  })}
                </View>
              )}
            </View>
            <BottomBar detailComment={detail} />
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  detailMsg: {
    paddingHorizontal: 16,
  },
  totalCommentTx: {
    fontSize: 14,
    color: '#666',
    marginTop: 20,
  },
  inputBox: {
    padding: 16,
    paddingLeft: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAvatarImg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  commentInput: {
    flex: 1,
    height: 32,
    borderRadius: 16,
    marginLeft: 12,
    backgroundColor: '#f0f0f0',
    fontSize: 14,
    color: '#333',
    textAlignVertical: 'center',
    paddingVertical: 0,
    paddingHorizontal: 12,
  },
  commentBox: {
    paddingTop: 16,
    paddingBottom: 32,
  },
});

export default memo(observer(ArticleDetails));
