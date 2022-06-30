import React, { memo, useContext } from 'react';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Paragraph from '../../components/Paragraph';
import Button from '../../components/Button';
import {StyleSheet, ToastAndroid, View} from "react-native";
import * as SecureStore from 'expo-secure-store';
import userContext from '../../context/userContext';


const Dashboard = () => {
    const [, setUser] = useContext(userContext);

    const logout = async () => {
        await SecureStore.deleteItemAsync('token');
        setUser(undefined);
    };

    const handlePress = () => {
        logout().catch(error => {
            ToastAndroid.show(error.message, ToastAndroid.SHORT)
        });
    };

    return (
        <View>
            <Header>Let’s start</Header>
            <Paragraph>
                Your amazing app starts here. Open you favourite code editor and start
                editing this project.
            </Paragraph>
            <Button mode="outlined" onPress={handlePress}>
                Logout
            </Button>
        </View>
    )
};

export default memo(Dashboard);
