import React, { FC, memo } from 'react';
import Header from '../../components/Header';
import Paragraph from '../../components/Paragraph';
import { View } from 'react-native';

const Settings: FC = () => {
    return (
        <View>
            <Header>Settings screen</Header>
            <Paragraph>
                Your amazing app starts here. Open you favourite code editor and start
                editing this project.
            </Paragraph>
        </View>
    )
};

export default memo(Settings);
