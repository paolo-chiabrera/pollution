import { DataLayerProvider } from 'pollution-react-data-layer';
import Pusher from 'pusher-js/react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  REACT_APP_AXIOS_BASE_URL,
  REACT_APP_PUSHER_APP_KEY,
} from 'react-native-dotenv';

import CountriesList from './CountriesList';

const config = {
  axios: {
    baseURL: REACT_APP_AXIOS_BASE_URL,
  },
};

const deps = {
  pusher: new Pusher(REACT_APP_PUSHER_APP_KEY, {
    cluster: 'eu',
    encrypted: true
  }),
};

const App = () => (
  <DataLayerProvider config={config} deps={deps}>
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <CountriesList />
    </View>
  </DataLayerProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
