import React, { FC, memo, useState } from 'react';
import Header from '../../components/Header';
import Paragraph from '../../components/Paragraph';
import { ScrollView, View, Text, StyleSheet, StatusBar, TouchableOpacity, FlatList } from 'react-native';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694addfg0f-3da1-471dfg-bd96-145571e29d72',
        title: 'Fourth Item',
    },
    {
        id: '58addfg0f-3da1-471fg-bd96-145571d72',
        title: 'Fifth Item',
    },
    {
        id: '58adg0f-3dftuya1-471g-bd96-1471d72',
        title: 'Sixth Item',
    },
    {
        id: '58addfgg0f-gf-471g-bddfg96-147dfg1d72',
        title: 'Seventh Item',
    },
    {
        id: '58ad0f-3dfta1-471g-bd96-dfgdfgd',
        title: 'Eighth Item',
    },
    {
        id: '58g0f-3dfta1-47dd1g-bd96-1471d72',
        title: 'Ninth Item',
    },
  ];
  
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );
  
  const Team: FC = () => {
    const [selectedId, setSelectedId] = useState(null);
  
    const renderItem = ({ item }) => {
      const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
      const color = item.id === selectedId ? 'white' : 'black';
  
      return (
        <Item
          item={item}
          onPress={() => setSelectedId(item.id)}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      );
    };
  

    return (
        <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
        />
    )
};

export default memo(Team);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });