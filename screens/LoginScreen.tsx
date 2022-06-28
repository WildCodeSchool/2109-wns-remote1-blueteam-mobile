import React, { memo, useContext, useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { TouchableOpacity, StyleSheet, Text, View, ToastAndroid } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import { Navigation } from './types';
import * as SecureStore from 'expo-secure-store';
import userContext from '../context/userContext';

type Props = {
    navigation: Navigation;
};

const LOGIN = gql`
    query Login($data: LoginInput!) {
        login(data: $data) {
            id
            firstname
            lastname
            email
            job
            role
            token
        }
    }
`;

const LoginScreen = ({ navigation }: Props) => {
    const [, setUser] = useContext(userContext);
    const [logUserIn, { error, data }] = useLazyQuery(LOGIN);

    if (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }

    useEffect(() => {
        const saveValue = async (key: string, value: string) => {
            await SecureStore.setItemAsync(key, value);
        };
        
        const login = data?.login;

        if (login) {
            const { token, ...user } = login;

            if (user && token) {
                setUser(user);
                saveValue('token', token);
            };
        };

    }, [data?.login]);

    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });

    const onSubmit = () => {
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);

        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        }

        logUserIn({ variables: { data: { email: email.value, password: password.value } } });
    };

    return (
        <Background>
            <Logo />
            <Header>Welcome back.</Header>
            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={text => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry={true}
                autoComplete="password"
            />
            <View style={styles.forgotPassword}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPasswordScreen')}
                >
                    <Text style={styles.label}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>
            <Button mode="contained" onPress={onSubmit}>
                Login
            </Button>
            <View style={styles.row}>
                <Text style={styles.label}>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    label: {
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});

export default memo(LoginScreen);