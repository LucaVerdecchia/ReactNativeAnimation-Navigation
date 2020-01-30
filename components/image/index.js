import React, {useRef} from 'react';
import {Image, TouchableWithoutFeedback, StyleSheet, View} from 'react-native';

export default function ImageButton({imageObj, handlePress}) {
  const imageRef = useRef();

  return (
    <>
      <TouchableWithoutFeedback onPress={() => handlePress(imageObj, imageRef)}>
        <View style={[styles.imageContainer, {height: imageObj.height / 2}]}>
          <Image
            style={styles.image}
            source={{uri: imageObj.source.uri}}
            ref={imageRef}
          />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    display: 'flex',
    flexBasis: 1,
    flex: 1,
    position: 'relative',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
});
