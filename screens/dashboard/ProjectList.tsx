import React, { FC, memo, useState } from 'react';
import { Text, StyleSheet, StatusBar, TouchableOpacity, FlatList, ToastAndroid } from 'react-native';

import { gql, useQuery } from '@apollo/client';

import Colors from "../../constants/Colors";

import SpinnerLoading from '../../components/SpinnerLoading';
  
interface IProject {
    id: string;
    name: string;
};

interface IProjectListQuery {
    projects: IProject[];
};

const PROJECT_LIST = gql`
    query Projects {
        projects {
            id
            name
        }
    }
`;

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.name}</Text>
    </TouchableOpacity>
);
  
const ProjectList: FC = () => {
    const [selectedId, setSelectedId] = useState(undefined);

    const { loading, error, data } = useQuery<IProjectListQuery>(PROJECT_LIST);
      
    if (loading) {
        return <SpinnerLoading />;
    };

    if (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
    };

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? Colors.light.tabIconSelected : Colors.light.tabIconDefault;
        const color = item.id === selectedId ? Colors.dark.text : Colors.light.text;
    
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
            data={data?.projects}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
        />
    );
};

export default memo(ProjectList);

const styles = StyleSheet.create({
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
});