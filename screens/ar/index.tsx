import {ViroARScene} from '@viro-community/react-viro/components/AR/ViroARScene'
import {ViroTrackingStateConstants} from '@viro-community/react-viro/components/ViroConstants'
import {ViroPolyline} from '@viro-community/react-viro/components/ViroPolyline'
import {ViroSphere} from '@viro-community/react-viro/components/ViroSphere'

import { useEffect, useState } from 'react';
import { Alert, Linking, PermissionsAndroid, Platform, ToastAndroid } from 'react-native';
import appConfig from '../../app.json';
import CompassHeading from 'react-native-compass-heading';


import Geolocation from 'react-native-geolocation-service';

export const ARScene = () => {
const [x,setX]=useState(0)
const [y,setY]=useState(0)

const [y1,setY1]=useState(0)

const [x1,setX1]=useState(0)

const [compassHeading, setCompassHeading] = useState(0);
useEffect(()=>{
  CompassHeading.start(3, ({heading, accuracy}) => {
    setCompassHeading(heading);
  });
            setX(transformGpsToAR(33.8773130086098,10.120244358567275).x)
            setY(transformGpsToAR(33.8773130086098,10.120244358567275).z)
            setX1(transformGpsToAR(33.877484007205986,10.120725063201865).x)
            setY1(transformGpsToAR(33.877484007205986,10.120725063201865).z)
    CompassHeading.stop()
},[])


  function onInitialized(state:any, reason:any) {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {

    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  const latLongToMerc = (latDeg: number, longDeg: number) => {
    // From: https://gist.github.com/scaraveos/5409402
    const longRad = (longDeg / 180.0) * Math.PI;
    const latRad = (latDeg / 180.0) * Math.PI;
    const smA = 6378137.0;
    const xmeters = smA * longRad;
    const ymeters = smA * Math.log((Math.sin(latRad) + 1) / Math.cos(latRad));

    return { x: xmeters, y: ymeters };
  };
  const transformGpsToAR = (latObj:number, longObj:number) => {
    const deviceObjPoint = latLongToMerc(latObj, longObj);
    const mobilePoint = latLongToMerc(33.877219, 10.120644);

    const objDeltaY = deviceObjPoint.y - mobilePoint.y;
    const objDeltaX = deviceObjPoint.x - mobilePoint.x;

    if (Platform.OS ="android") {
      let degree = -60;
      let angleRadian = (degree * Math.PI) / 180;

      console.log('Using degree => ', degree);
      console.log('Angle radian => ', angleRadian);

      let newObjX = objDeltaX * Math.cos(angleRadian) - objDeltaY * Math.sin(angleRadian);
      let newObjY = objDeltaX * Math.sin(angleRadian) + objDeltaY * Math.cos(angleRadian);

      console.log('old delta => ', { x: objDeltaX, z: -objDeltaY });
      console.log('new delta => ', { x: newObjX, z: -newObjY });

      return { x: newObjX, z: -newObjY };
    }

    return { x: objDeltaX, z: -objDeltaY };
  };
  return (
   
    <ViroARScene onTrackingUpdated={onInitialized}>

      <ViroPolyline
    position={[0, -1, -2]}
    points={[
      // [transformGpsToAR(33.877219, 10.120644).x,0, transformGpsToAR(33.877219, 10.120644).z],
      // [transformGpsToAR(33.8773130086098,10.120244358567275).x,0,transformGpsToAR(33.8773130086098,10.120244358567275).z],
      [0,0,-0.2],
      [0,0,3.75],
      [12.5,0,3.75],
      [12.5,0,0]

      
    ]}
  
    
    thickness={0.3}
/>
    </ViroARScene>
  );

  }
