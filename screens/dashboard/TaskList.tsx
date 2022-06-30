import React, { FC, memo, useState } from 'react';
import { Text, StyleSheet, StatusBar, TouchableOpacity, FlatList, ToastAndroid } from 'react-native';

import { gql, useQuery } from '@apollo/client';

import Colors from "../../constants/Colors";

import SpinnerLoading from '../../components/SpinnerLoading';
  
interface ITask {
    id: string;
    title: string;
};

interface ITaskListQuery {
    tasks: ITask[];
};

const TASK_LIST = gql`
    query Tasks {
        tasks {
            id
            title
        }
    }
`;

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
);
  
const TaskList: FC = () => {
    const [selectedId, setSelectedId] = useState(undefined);

    const { loading, error, data } = useQuery<ITaskListQuery>(TASK_LIST);
      
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
            data={data?.tasks}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
        />
    );
};

export default memo(TaskList);

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