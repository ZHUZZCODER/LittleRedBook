import {useStore} from '@/store';
import {observer} from 'mobx-react';
import React, {
  memo,
  useCallback,
  useEffect,
  useState,
  useRef,
  ElementRef,
} from 'react';
import type {FC, ReactNode} from 'react';
import type {Category} from '@/store/home';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import IconArrow from '@/assets/images/icon_arrow.png';
import CategoryModal from '../CategoryModal';
import type {CategoryModalRef} from '../CategoryModal';
import HomeStore from '@/store/home';

interface IProps {
  children?: ReactNode;
}

const HeaderCategory: FC<IProps> = props => {
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [isSetting, setIsSetting] = useState<boolean>(false);
  //modal实例
  const categoryModalRef = useRef<CategoryModalRef>(null);
  const {
    homeStore: {categoryList},
  } = useStore();

  useEffect(() => {
    if (!isSetting && !!categoryList.length) {
      setSelectedCategory(categoryList[0]);
      setIsSetting(true);
    }
  }, [categoryList, isSetting]);

  const handleHeaderBtnPress = useCallback((categoryObj: Category) => {
    setSelectedCategory(categoryObj);
  }, []);

  return (
    !!categoryList.length && (
      <View style={styles.container}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {categoryList.map(item => {
            const {name} = item;
            const isSelected = name === selectedCategory?.name;
            return (
              <TouchableOpacity
                onPress={() => handleHeaderBtnPress(item)}
                key={name}
                style={styles.headerBtn}>
                <Text
                  style={[
                    styles.headerBtnTx,
                    isSelected ? styles.headerBtnTxSelected : {},
                  ]}>
                  {name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            categoryModalRef.current?.handleShowModal();
          }}
          style={styles.pullBtn}>
          <Image source={IconArrow} style={styles.pullImg} />
        </TouchableOpacity>

        <CategoryModal ref={categoryModalRef} />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 36,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 6,
  },
  headerBtn: {
    width: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBtnTx: {
    fontSize: 16,
    color: '#999',
  },
  headerBtnTxSelected: {
    color: '#333',
    fontWeight: 'bold',
  },
  pullBtn: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pullImg: {
    width: 18,
    height: 18,
    transform: [{rotate: '-90deg'}],
  },
});

export default memo(observer(HeaderCategory));
