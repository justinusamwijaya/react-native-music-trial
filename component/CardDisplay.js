import React from 'react'
import { Text, View, StyleSheet, Image, Linking } from 'react-native'
import Card from './common/Card.js'

const styles = StyleSheet.create({
    textStyle: {
      color: 'white',
      position: 'absolute',
      fontSize: 14,
      bottom: 5,
      right: 10,
      zIndex: 3
    },
    overlayStyle: {
      height:'100%',
      width:'100%',
      backgroundColor: 'rgba(0, 0, 0, .3)',
      position: 'absolute',
      top: 0,
      bottom: 0,
      zIndex: 2
    },
    viewStyle: {
      flex: 1,
      justifyContent:'center',
      alignItems: 'center'
    },
    thumbnailStyle: {
      height:'100%',
      width:'100%',
      position: 'absolute',
      top: 0,
      bottom: 0,
      zIndex: 1
    },
});

const CardDisplay = ({ albumLength, album }) => {
  return (
      <Card song={album.soundFile} totalCards={albumLength} order={album.order}>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>{album.title}</Text>
          <View style={styles.overlayStyle}></View>
          <Image style={styles.thumbnailStyle} source={{uri: album.backgroundImg}} />
        </View>
      </Card>
  )
}

export default CardDisplay;
