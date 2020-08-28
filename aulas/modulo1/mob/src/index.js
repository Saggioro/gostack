import React, {useState, useEffect} from 'react';

import { View,Text, StyleSheet, StatusBar, FlatList } from 'react-native';

import api from './services/api';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response.data);
      setRepositories(response.data);
    });
  }, []);

  const styles = StyleSheet.create(
    {
      container: {
        flex:1,
        backgroundColor: '#7159c1'
      },
      repository: {
        color: 'white',
        
        
      },
      list: {
        
      }
     
    }
  );

  return (
    <>
    <StatusBar barStyle='light-content' backgroundColor= '#7159c1'></StatusBar>
    <FlatList
        style={styles.container}
        data={repositories}
        keyExtractor={repository => repository.id}
        renderItem={({item: repository}) => (
          <Text style={styles.repository}>{repository.title}</Text>
        )}
        />

    
    
    {/* <View style={styles.container}>
      {repositories.map(repository=> (<Text key={repository.id}>{repository.title}</Text>))}
  </View> */}
    </> 
  );
}