import { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Avatar, ListItem, SearchBar } from "react-native-elements";
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { RootState, WayPoint } from '../types';
import { actionCreators as pathActions } from '../state/ducks/Path';
export default function ListWayPoints() {

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const marker=useAppSelector((state:RootState)=>state.marker)
  const path=useAppSelector((state:RootState)=>state.path)

  const dispatch=useAppDispatch()
  useEffect(
    ()=>{
      console.log(path)
    },[path]
  )
  useEffect(() => {
    fetch(`http://192.168.1.14:3000/marker/endpoints/${marker.id}`)
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson.endPoints);
        setMasterDataSource(responseJson.endPoints);
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
      onPress={() => toAR(item)}
    >
      <ListItem.Content>
        <Avatar source={{ uri: item.image }} />

        <ListItem.Title>{item.name}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
 
  const renderHeader = () => {
    return <SearchBar
      onChangeText={(text?: string) => searchFilterFunction(text)}
      onClear={(text?: any) => searchFilterFunction('')}
      placeholder="Type Here..."
      value={search}
   />;
  };



  const toAR = (item:any) => {
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
          onPress: () => Emerce(item),
        },
      ],
      { cancelable: false },
    );
  };
  const Emerce = (item:any) => {
    console.log({markerID: marker.id, endPointID: item.id})
    fetch(`http://192.168.1.14:3000/marker/Path`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query:{markerID: marker.id, endPointID: item.id}})
    })
    .then((response)=>response.json())
    .then((res)=>{
      console.log(res)
      dispatch(pathActions.create(res.path))
    })
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
      {renderHeader()}
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={filteredDataSource}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorView}
        
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingTop:50,
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