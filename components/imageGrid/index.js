/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Animated} from 'react-native';
import images from '../../src/images';
import ImageButton from '../image';
import Transition from '../transition';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

export default function ImageGrid({route}) {
  const imagePressed = useRef();
  const [imageObj, setImageObj] = useState(false);
  const [animate, isAnimating] = useState(false);
  const [imagePosition, setImagePosition] = useState({});
  const [flatListOpacity] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  let {params = {}} = route;
  let {back = null} = params;
  let {opacity = null} = params;

  useFocusEffect(
    React.useCallback(() => {
      if (opacity) {
        Animated.timing(flatListOpacity, {toValue: 1, duration: 600}).start(
          () => {
            route.params = {};
            isAnimating(false);
          },
        );
      } else {
        Animated.timing(flatListOpacity, {toValue: 1, duration: 1}).start();
      }
      if (animate && back) {
        imagePressed.current.measure((x, y, width, height, pageX, pageY) => {
          setImagePosition({
            state: 'animateOut',
            width,
            height,
            pageX,
            pageY,
          });
        });
      }
    }, [animate, back, flatListOpacity, opacity, route.params]),
  );

  function handlePress(image, imageRef) {
    imagePressed.current = imageRef.current;
    imagePressed.current.measure((x, y, width, height, pageX, pageY) => {
      setImagePosition({
        state: 'animateIn',
        width,
        height,
        pageX,
        pageY,
      });

      setImageObj(image);
      isAnimating(true);
    });
  }

  function animationCompleted() {
    if (imagePosition.state === 'animateIn') {
      navigation.navigate('Detail', {image: imageObj});
      Animated.timing(flatListOpacity, {toValue: 0, duration: 1}).start();
    } else {
      route.params = {};
      isAnimating(false);
    }
  }

  function renderFlatList() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Animated.FlatList
            data={images}
            numColumns="2"
            style={{opacity: flatListOpacity}}
            renderItem={({item}) => (
              <ImageButton imageObj={item} handlePress={handlePress} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      {opacity ? (
        renderFlatList()
      ) : (
        <>
          {renderFlatList()}
          {animate && (
            <Transition
              image={imageObj}
              position={imagePosition}
              callback={animationCompleted}
            />
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  flatlist: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});
