import { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Avatar, ListItem, SearchBar } from "react-native-elements";
import { WayPoint } from '../types';

export default function ListWayPoints() {

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const searchFilterFunction = (text: any): void => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item: WayPoint) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  const renderItem = ({ item }: any) => (
    <ListItem style={styles.listItemsFormat}
      onPress={() => toAR()}
    >
      <ListItem.Content>
        <Avatar source={{ uri: item.image }} />

        <ListItem.Title>{item.name}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
 
  const renderHeader = () => {
    return <SearchBar
      clearIcon={{ type: 'font-awesome', name: 'clear' }}
      searchIcon={{ type: 'font-awesome', name: 'search' }}
      onChangeText={(text?: string) => searchFilterFunction(text)}
      onClear={(text?: any) => searchFilterFunction('')}
      placeholder="Type Here..."
      value={search}
      platform={'default'} 
      showLoading onCancel={() => { setSearch(''); searchFilterFunction(''); }} 
      lightTheme={false} 
      round={false} 
      cancelButtonTitle={''} 
      cancelButtonProps={{}}
      showCancel={false} 
      onBlur={() => { }} 
      onFocus={() => { }} 
      loadingProps={{}} />;
  };



  const toAR = () => {
    Alert.alert(
      'What do you want to do?',
      'Choose an option',
      [
        {
          text: 'return',
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: 'Emerce the path in the ar sceene',
          onPress: () => Emerce(),
        },
      ],
      { cancelable: false },
    );
  };
  const Emerce = () => {
    // Navigate to the Ar screen
  };
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={filteredDataSource}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorView}
        ListHeaderComponent={renderHeader}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.7 }],
  },
  listItemsFormat: {
    backgroundColor: "red"
  }
});