import { ViroARScene } from '@viro-community/react-viro/components/AR/ViroARScene'
import { ViroTrackingStateConstants } from '@viro-community/react-viro/components/ViroConstants'
import { Viro3DPoint } from '@viro-community/react-viro/dist/components/Types/ViroUtils';
import { ViroPolyline } from '@viro-community/react-viro/components/ViroPolyline'

import { useEffect, useState } from 'react';
import CompassHeading from 'react-native-compass-heading';
import { useAppSelector } from '../../hooks/hooks';
import { RootState } from '../../types';
import { gpsToXyz } from '../../utils'

let arrayFromMapScreen: Viro3DPoint[]
export const ARScene = () => {
  const marker = useAppSelector((state: RootState) => state.marker)
  const path = useAppSelector((state: RootState) => state.path)



  function onInitialized(state: any, reason: any) {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      arrayFromMapScreen = gpsToXyz(path, marker)
      //console.log(arrayFromMapScreen)
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }


  return (

    <ViroARScene onTrackingUpdated={onInitialized}>

      <ViroPolyline
        position={[0, 0, -2]}
        points={ 
          //[[0,0,0],[-4.5469801977990745,0,3.558357379174872],[-1.7081394167243755,0,-8.154725730074372]]
          arrayFromMapScreen
        }
        thickness={0.3}
      />
    </ViroARScene>
  );

}
