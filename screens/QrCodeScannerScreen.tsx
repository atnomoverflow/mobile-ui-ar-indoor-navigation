import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useState, useEffect } from 'react';
import { Button, Dimensions, Image, StyleSheet } from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import {actionCreators as markerActions} from '../state/ducks/marker'
import { Text, View } from '../components/Themed';

import { useAppDispatch,useAppSelector } from '../hooks/hooks';
import { RootStackParamList, RootState } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
interface CodeBar{
    type:any,
     data:any
}
const { width } = Dimensions.get('window')
const qrSize = width * 0.3
type Props = NativeStackScreenProps<RootStackParamList, 'QrScanner'>;
export default function QrCodeScannerScreen({ route, navigation }: Props) {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
    const dispatch= useAppDispatch();
    const marker=useAppSelector((state:RootState)=>state.marker)
    useEffect(() => {
      dispatch(markerActions.reset());
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
    useEffect(() => {
      if(marker.error) 
      setScanned(false);
      if(marker.fetched)
      navigation.navigate('ListWayPoint')
    } ,[marker]);
    const handleBarCodeScanned = (codebar:CodeBar ) => {
      setScanned(true);
      dispatch(markerActions.fetchMarker(codebar.data))
      
    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[StyleSheet.absoluteFill, styles.container]}
        />
        
        <BarcodeMask edgeColor="#62B1F6" showAnimatedLine/>
          <Image source={require("../assets/images/output-onlinegiftools.gif")} style={styles.qr}  />
        
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  description: {
    fontSize: width * 0.09,
    marginTop: '10%',
    textAlign: 'center',
    width: '70%',
    color: 'white',
  },
  layerTop: {
    flex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  qr: {
    marginTop: '20%',
    marginBottom: '50%',
    marginLeft: '32%',

    width: qrSize,
    height: qrSize,
  },
});

