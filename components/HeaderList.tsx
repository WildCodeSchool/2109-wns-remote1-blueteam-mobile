import React, { memo, useState } from 'react';
import { StyleSheet, ToastAndroid, View, Modal, Pressable } from 'react-native';
import { Text, FormControl, Input, Select, CheckIcon } from 'native-base';

import { DocumentNode, gql, useMutation, useQuery } from '@apollo/client';

import Colors from "../constants/Colors";
import SpinnerLoading from './SpinnerLoading';

interface IUser {
    id: string;
    firstname: string;
    lastname: string;
};

interface IUserListQuery {
    teams: IUser[];
};

const USER_LIST = gql`
    query Users {
        users {
            id
            firstname
            lastname
        }
    }
`;

interface Props {
    buttonMessage: string;
    gqlQuery: DocumentNode;
    refetchQuery: DocumentNode;
};

const HeaderList = (props: Props) => {
    const [create, { error: mutationError }] = useMutation(props.gqlQuery, {
       refetchQueries: [{ query: props.refetchQuery }]
    });
    const { loading, error: fetchingError, data: userList } = useQuery<IUserListQuery>(USER_LIST);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState("");
    const [formData, setData] = useState({});
    const [errors, setErrors] = useState({});

    if (loading) {
        return <SpinnerLoading />;
    };

    if (fetchingError) {
        ToastAndroid.show(fetchingError.message, ToastAndroid.SHORT);
    };

    if (mutationError) {
        ToastAndroid.show(mutationError.message, ToastAndroid.SHORT);
    };

    const validate = () => {
        if (formData.name === undefined) {
          setErrors({ ...errors,
            name: 'Name is required'
          });
          return false;
        } else if (formData.name.length < 3) {
          setErrors({ ...errors,
            name: 'Name is too short'
          });
          return false;
        }
    
        return true;
    };
    
    const handlePressSubmit = () => {
        console.log('Submitted');
    };


    const handlePressOpen = () => {
        setIsModalVisible(true);
    };

    const handlePressClose = () => {
        setIsModalVisible(false);
    };

    return (
        <View>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={handlePressOpen}
            >
                <Text style={styles.textStyle}>{props.buttonMessage}</Text>
            </Pressable>
            <Modal
                animationType="slide"
                transparent={false}
                visible={isModalVisible}
                onRequestClose={() => {
                    setIsModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text bold fontSize="xl" mb="4">
                            Create team form
                        </Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={handlePressClose}
                        >
                            <Text style={styles.textStyle}>Return to the list</Text>
                        </Pressable>
                        <FormControl mb="4">
                            <FormControl.Label>Name</FormControl.Label>
                            <Input
                                placeholder='Name'
                                accessibilityLabel='Name'
                                minWidth='200'
                            />
                            <FormControl.Label>Members</FormControl.Label>
                            <Select
                                selectedValue={selectedUser}
                                minWidth='200' accessibilityLabel='Choose member'
                                placeholder='Choose member'
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />
                                }}
                                mt={1}
                                onValueChange={itemValue => setSelectedUser(itemValue)}
                            >
                                {userList?.users.map(user => (
                                    <Select.Item key={user.id} label={`${user.firstname} ${user.lastname}`} value={user.id} />
                                ))}
                            </Select>
                        </FormControl>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={handlePressSubmit}
                        >
                            <Text style={styles.textStyle}>Create</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal> 
        </View>
    );
};

export default memo(HeaderList);

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: Colors.light.background,
    },
    buttonClose: {
      backgroundColor: Colors.light.tabIconDefault,
    },
    textStyle: {
      color: Colors.light.text,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });
