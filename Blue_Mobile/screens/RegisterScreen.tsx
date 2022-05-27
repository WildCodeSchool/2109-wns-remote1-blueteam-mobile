import React, { memo, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import { Navigation } from './types';
import {
    emailValidator,
    passwordValidator,
    nameValidator,
} from '../core/utils';

type Props = {
    navigation: Navigation;
};

interface IUserRegister {
    firstname: string;
    lastname: string;
    email: string;
    job: string;
    password: string;
}

const REGISTER = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      id
    }
  }
`;

const RegisterScreen = ({ navigation }: Props) => {
    const [register] = useMutation<
        { register: { _id: string } }, // server answer
        { data: IUserRegister } // data sent to server
    >(REGISTER);

    const [firstname, setFirstname] = useState({ value: '', error: '' });
    const [lastname, setLastname] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [job, setJob] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });

    const onSubmit = () => {
        const nameError = nameValidator(firstname.value);
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);

        if (emailError || passwordError || nameError) {
            setFirstname({ ...firstname, error: nameError });
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        }

        const newUser = {
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            job: job.value,
            password: password.value,
        };
      
        register({ variables: { data: newUser } });
      
        navigation.navigate('Dashboard');
    };

    return (
    <Background>

        <Header>Create Account</Header>

        <TextInput
            label="Firstname"
            returnKeyType="next"
            value={firstname.value}
            onChangeText={text => setFirstname({ value: text, error: '' })}
            error={!!firstname.error}
            errorText={firstname.error}
            autoComplete="firstname"
        />

        <TextInput
            label="Lastname"
            returnKeyType="next"
            value={lastname.value}
            onChangeText={text => setLastname({ value: text, error: '' })}
            error={!!lastname.error}
            errorText={lastname.error}
            autoComplete="lastname"
        />

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
            label="Job"
            returnKeyType="next"
            value={job.value}
            onChangeText={text => setJob({ value: text, error: '' })}
            error={!!job.error}
            errorText={job.error}
            autoComplete="job"
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

        <Button mode="contained" onPress={onSubmit} style={styles.button}>
            Sign Up
        </Button>

        <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
        </View>
    </Background>
);
};

const styles = StyleSheet.create({
    label: {
        color: theme.colors.secondary,
    },
    button: {
        marginTop: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});

export default memo(RegisterScreen);