import React, {memo, useMemo} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface IProps {
  children?: ReactNode;
  titleInfo: {
    title: string;
    desc: string;
    tag: string[];
    dateTime: string;
    location: string;
  };
}

const TitleInfo: FC<IProps> = props => {
  const {
    titleInfo: {title, desc, tag, dateTime, location},
  } = props;
  const tags = useMemo(() => {
    return tag.map(item => `#${item}`).join('');
  }, [tag]);
  return (
    <>
      <Text style={styles.detailTitle}>{title}</Text>
      <Text style={styles.descTx}>{desc}</Text>
      <Text style={styles.tagTx}>{tags}</Text>
      <Text style={styles.timeTx}>
        {dateTime}
        {location}
      </Text>
      <Text style={styles.line}></Text>
    </>
  );
};

const styles = StyleSheet.create({
  detailTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  descTx: {
    fontSize: 15,
    color: '#333',
    marginTop: 6,
  },
  tagTx: {
    fontSize: 15,
    color: '#305090',
    marginTop: 6,
  },
  timeTx: {
    fontSize: 12,
    color: '#bbb',
    marginVertical: 16,
  },
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#eee',
  },
});

export default memo(TitleInfo);
