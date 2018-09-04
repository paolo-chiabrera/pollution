import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Provider } from 'pollution-data-layer';

import CountriesList from './CountriesList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App = () => (
  <Provider>
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Changes you make will automatically reload.</Text>
      <Text>Shake your phone to open the developer menu.</Text>
      <CountriesList />
    </View>
  </Provider>
);

// export default class App extends Component {
//   render() {
//     return (
//       <Provider>
//         <View style={styles.container}>
//           <Text>Open up App.js to start working on your app!</Text>
//           <Text>Changes you make will automatically reload.</Text>
//           <Text>Shake your phone to open the developer menu.</Text>
//           <CountriesList />
//         </View>
//       </Provider>
//     );
//   }
// }

export default App;
