/* eslint-disable prettier/prettier */
/* eslint-disable keyword-spacing */
import React, { useState, useEffect } from 'react';
import { View, Image, SafeAreaView, StyleSheet, BackHandler, Animated, PanResponder, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { screenHeight } from '../utils/metrics';

export default function Detail({ route }) {
    const navigation = useNavigation();
    const {image} = route.params;
    const [opacity] = useState(new Animated.Value(1));
    const [topRadius] = useState(new Animated.Value(0));
    const [axisY] = useState(new Animated.Value(0));
    const [scaleValue] = useState(new Animated.Value(1));

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => {
            const heightMoved = evt.nativeEvent.pageY < Math.floor(screenHeight * 0.25);
            Animated.timing(topRadius, {
                toValue: 30,
                duration: 1000,
            }).start();
            Animated.timing(scaleValue, {
                toValue: 0.95,
                duration: 300,
                useNativeDriver: true,
            }).start();
            return heightMoved;
        },

        onPanResponderMove: (evt, gestureState) => {
            Animated.timing(axisY, {
                toValue: gestureState.moveY,
                duration: 1,
                useNativeDriver: true,
            }).start();
        },

        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
            if (Math.floor(gestureState.moveY) >= screenHeight / 3) {
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }).start(() => {
                    navigation.navigate('Home', {opacity: true});
                });
              } else {
                Animated.timing(axisY, {
                  toValue: 0,
                  duration: 250,
                  useNativeDriver: true,
                }).start();
                Animated.timing(topRadius, {
                    toValue: 0,
                    duration: 700,
                }).start();
                Animated.timing(scaleValue, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.bezier(.17,1.23,1,1),
                    useNativeDriver: true,
                }).start();
              }
        },
    });

    BackHandler.addEventListener('hardwareBackPress', function () {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 1,
        }).start(() => {
            navigation.navigate('Home', { back: true });
        });
        return true;
    });

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View {...panResponder.panHandlers} style={{
                opacity: opacity,
                transform: [{ translateY: axisY }, { scale: scaleValue }]}}>
                <Animated.Image source={{ uri: image.source.uri }} style={[styles.image, { height: image.height / 2, borderTopLeftRadius: topRadius, borderTopRightRadius: topRadius }]} />
                <Animated.View style={[styles.bottomView]}>
                    <Animated.Text style={[styles.heading, { opacity }]}>Breanna Johnson</Animated.Text>
                    <Animated.Text style={[styles.paragraph, { opacity }]}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing  elit.
                        Maecenas justo tellus, faucibus non augue in,
                        aliquam suscipit ex. In euismod sit amet turpis ut
                        viverra. Quisque fermentum ligula nec metus posuere,
                        quis pulvinar massa dictum. Sed gravida vitae neque
                        sit amet pellentesque. Duis sed tempus mi.
                        Nunc consectetur consequat lacus, vel efficitur magna
                        euismod sagittis. Nullam elementum felis eget ligula
                        dignissim, non congue neque egestas.
                </Animated.Text>
                </Animated.View>
            </Animated.View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        backgroundColor: '#f2f2f2',
    },
    image: {
        width: '100%',
        resizeMode: 'cover',
    },
    bottomView: {
        width: '90%',
        marginRight: '5%',
        marginLeft: '5%',
        paddingTop: 50,
        overflow: 'hidden',
    },
    heading: {
        fontWeight: 'bold',
        marginBottom: 30,
        fontSize: 20,
    },
    paragraph: {
        fontSize: 15,
    },
});

