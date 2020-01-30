/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable keyword-spacing */
import React, { useState, useEffect } from 'react';
import { Animated, StatusBar } from 'react-native';
import { screenWidth, screenHeight, notchHeight } from '../../utils/metrics';


export default function Transition({ image, position, callback }) {
    const [pageY] = useState(new Animated.Value(position.pageY));
    const [pageX] = useState(new Animated.Value(position.pageX));
    const [width] = useState(new Animated.Value(position.width));
    const [height] = useState(new Animated.Value(position.height));
    const [bottomHeight] = useState(new Animated.Value(0));
    const bottomHeightDest = (screenHeight - position.height);

    useEffect(() => {
        if (position.state === 'animateIn') {
            Animated.timing(pageY, {
                toValue: notchHeight,
                duration: 1000,
            }).start();
            Animated.timing(pageX, {
                toValue: 0,
                duration: 1000,
            }).start();
            Animated.timing(width, {
                toValue: screenWidth,
                duration: 1000,
            }).start();
            Animated.timing(height, {
                toValue: screenHeight,
                duration: 1000,
            }).start();
            Animated.timing(bottomHeight, {
                toValue: bottomHeightDest,
                duration: 1000,
            }).start((animation) => {
                if (animation.finished) {
                    callback();
                }
            });
        }
        else {
            Animated.timing(pageY, {
                toValue: position.pageY,
                duration: 1000,
            }).start();
            Animated.timing(pageX, {
                toValue: position.pageX,
                duration: 1000,
            }).start();
            Animated.timing(width, {
                toValue: position.width,
                duration: 1000,
            }).start();
            Animated.timing(height, {
                toValue: position.height,
                duration: 1000,
            }).start();
            Animated.timing(bottomHeight, {
                toValue: 0,
                duration: 1000,
            }).start((animation) => {
                if (animation.finished) {
                    callback();
                }
            });
        }
    }, [pageY, width, height, pageX, position.state, callback, bottomHeight, position.height, bottomHeightDest, position.pageY, position.pageX, position.width]);

    return (
        <Animated.View style={{
            position: 'absolute',
            width,
            height,
            transform: [{ translateY: pageY }, { translateX: pageX }],
        }} >
            <Animated.Image
                source={{ uri: image.source.uri }}
                style={{
                    resizeMode: 'cover',
                    width: '100%',
                    height: position.height,
                }} />
            <Animated.View style={{ height: bottomHeight, width: '100%', backgroundColor: '#f2f2f2' }} />
        </Animated.View>
    );
}



