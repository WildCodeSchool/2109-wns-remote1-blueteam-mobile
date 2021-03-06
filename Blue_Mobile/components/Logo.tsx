import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
    <Image source={require('../assets/images/blue_logo.png')} style={styles.image} />
);

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
    },
});

export default memo(Logo);