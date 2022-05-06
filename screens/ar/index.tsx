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
        points={ //[[  0,  0,  0, ],[ -2.609334934988446, 0, -7.5479119967879,],[   -21.674805141469523,   0,   -1.0738344235304957,],[   -20.15947461428783,   0,   9.441592760491002,],]
        arrayFromMapScreen
        }
        thickness={0.3}
      />
    </ViroARScene>
  );

}
