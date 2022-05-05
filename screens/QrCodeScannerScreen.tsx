import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useState, useEffect } from 'react';
import { Button, Dimensions, Image, StyleSheet } from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
interface CodeBar{
    type:any,
     data:any
}
const { width } = Dimensions.get('window')
const qrSize = width * 0.3
export default function QrCodeScannerScreen() {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
  
    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    const handleBarCodeScanned = (codebar:CodeBar ) => {
      setScanned(true);
      alert(`Bar code with type ${codebar.type} and data ${codebar.data} has been scanned!`);
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

