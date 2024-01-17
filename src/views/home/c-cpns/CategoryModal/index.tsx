import React, {
  memo,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import type {FC, ReactNode} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  StatusBar,
  TouchableOpacity,
  Image,
  LayoutAnimation,
} from 'react-native';
import ChannelNav from '../ChannelNav';
import IconArrow from '@/assets/images/icon_arrow.png';
import CategoryBtnList from '../CategoryBtnList';
import {observer} from 'mobx-react';
import {useStore} from '@/store';
import {Category} from '@/store/home';
import LocalStorage from '@/utils/storage';

interface IProps {
  children?: ReactNode;
}

export interface CategoryModalRef {
  visible: boolean;
  handleShowModal(): void;
  handleCloseModal(): void;
}

const CategoryModal = forwardRef<CategoryModalRef, IProps>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [editCategory, setEditCategory] = useState<Category[]>();
  const [addCategory, setAddCategory] = useState<Category[]>();
  //编辑模式
  const [isChannelEdit, setIsChannelEdit] = useState<boolean>(false);
  const {
    // homeStore: {categoryList, changeCategoryData, changeIsSetting},
    homeStore,
  } = useStore();
  const {categoryList, changeCategoryData, changeIsSetting} = homeStore;

  useEffect(() => {
    if (!!categoryList.length) {
      const editList = categoryList.filter(({isAdd}) => isAdd);
      const addList = categoryList.filter(({isAdd}) => !isAdd);
      setEditCategory(editList);
      setAddCategory(addList);
    }
  }, [categoryList]);
  useImperativeHandle(ref, () => ({
    visible,
    handleCloseModal,
    handleShowModal,
  }));
  const handleShowModal = useCallback(() => {
    setVisible(true);
  }, []);
  const handleCloseModal = useCallback(() => {
    setVisible(false);
  }, []);

  const handleChanneLEidt = useCallback(
    (category: Category) => {
      let editCategoryResult;
      let addCategoryResult;
      if (isChannelEdit) {
        if (category.isAdd) {
          editCategoryResult = editCategory?.filter(
            ({name}) => name !== category.name,
          );
          category.isAdd = false;
          addCategoryResult = [...addCategory!, category];
        } else {
          category.isAdd = true;
          editCategoryResult = [...editCategory!, category];
          addCategoryResult = addCategory?.filter(
            ({name}) => name !== category.name,
          );
        }
        setAddCategory(addCategoryResult);
        setEditCategory(editCategoryResult);
      }
    },
    [editCategory, addCategory, isChannelEdit],
  );

  const handleComfirm = useCallback(() => {
    if (isChannelEdit) {
      const categoryData = [...editCategory!, ...addCategory!];
      //完成编辑
      LocalStorage.setCache('categoryList', categoryData);
      //修改数据一定不能解构，不然就会修改数据无法更新
      homeStore.changeCategoryData(categoryData);
    }
    setIsChannelEdit(!isChannelEdit);
  }, [isChannelEdit, editCategory, addCategory, homeStore.changeCategoryData]);
  return (
    <Modal
      visible={visible}
      //淡入
      animationType="fade"
      //透明
      transparent={true}
      //是否位于状态栏下方
      statusBarTranslucent={true}
      //关闭
      onRequestClose={handleCloseModal}>
      <View style={styles.container}>
        <View style={styles.content}>
          <ChannelNav navTitle="我的频道" subTitle="点击进入频道">
            <TouchableOpacity onPress={handleComfirm} style={styles.editBtn}>
              <Text style={styles.editTx}>
                {isChannelEdit ? '完成编辑' : '进入编辑'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={styles.closeBtn}>
              <Image source={IconArrow} style={styles.closeImg} />
            </TouchableOpacity>
          </ChannelNav>
          {editCategory && !!editCategory.length && (
            <CategoryBtnList
              categroyList={editCategory}
              isChannelEdit={true}
              isEdit={isChannelEdit}
              handleEidtFn={handleChanneLEidt}
            />
          )}
          <ChannelNav navTitle="推荐频道" subTitle="点击添加频道" />
          {addCategory && !!addCategory.length && (
            <CategoryBtnList
              categroyList={addCategory}
              isChannelAdd={true}
              isEdit={isChannelEdit}
              handleEidtFn={handleChanneLEidt}
            />
          )}
        </View>
        <View style={styles.mask}></View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: 'white',
    //加上状态栏高度
    marginTop: 48 + (StatusBar.currentHeight || 0),
  },
  editBtn: {
    paddingHorizontal: 10,
    height: 28,
    backgroundColor: '#EEE',
    borderRadius: 14,
    justifyContent: 'center',
  },
  editTx: {
    fontSize: 13,
    color: '#3050ff',
  },
  closeBtn: {
    padding: 16,
  },
  closeImg: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    transform: [
      {
        rotate: '90deg',
      },
    ],
  },
  mask: {
    flex: 1,
    backgroundColor: '#00000060',
  },
});

export default memo(observer(CategoryModal));
