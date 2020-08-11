import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

import reducers from './reducers'

export const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

import CardDisplay from './component/CardDisplay.js';

const albums = [{
  order: 1,
  title: 'Yummy',
  backgroundImg: 'https://imgsrv.voi.id/x2C3iC0v6zS08SQkzEz8346F8GWMiSvu1UdAdOs2PvA/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy8xNDE2LzIwMjAwMTA0MTUzMC1sYW5kc2NhcGUuY3JvcHBlZF8xNTc4MTI2NzQxLmpwZWc.jpg',
  soundFile: require('./assets/songs/yummy.mp3')
},{
  order: 2,
  title: 'TRNDSTTR',
  backgroundImg: 'https://i.ytimg.com/vi/r7Ve8ExE8YY/maxresdefault.jpg',
  soundFile: require('./assets/songs/trndsttr.mp3')
},{
  order: 3,
  title: 'Love In My Pocket',
  backgroundImg: 'https://i.ytimg.com/vi/qBG-tyMWNeo/maxresdefault.jpg',
  soundFile: require('./assets/songs/loveinmypocket.mp3')
}]

export default class App extends Component {

  renderAlbums() {
    return albums.map(el => <CardDisplay key={el.title} albumLength={albums.length} album={el} />)
  }

  render() {
      return (
        
      <Provider store={store}>
        <View>
          <Text style={styles.titleMargin}>Random Music</Text>
        </View>
        <View style={styles.container}>
          {this.renderAlbums()}
          <StatusBar style="auto" />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleMargin: {
    marginTop: 100,
    marginBottom: 100,
    textAlign: 'center'
  }
});
