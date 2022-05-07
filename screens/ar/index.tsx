import { ViroARScene } from '@viro-community/react-viro/components/AR/ViroARScene'
import { ViroTrackingStateConstants } from '@viro-community/react-viro/components/ViroConstants'
import { ViroPolyline } from '@viro-community/react-viro/components/ViroPolyline'
import { ViroNode } from '@viro-community/react-viro/components/ViroNode'
import { ViroSpotLight } from '@viro-community/react-viro/components/ViroSpotLight'
import { ViroQuad } from '@viro-community/react-viro/components/ViroQuad'
import { Viro3DObject } from '@viro-community/react-viro/components/Viro3DObject'
import { useAppSelector } from '../../hooks/hooks';
import { RootState } from '../../types';
import { ViroAnimations } from '@viro-community/react-viro/components/Animation/ViroAnimations'

export const ARScene = () => {
  const path = useAppSelector((state: RootState) => state.path)


  function onInitialized(state: any, reason: any) {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {

      //console.log(arrayFromMapScreen)
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }
  ViroAnimations.registerAnimations({
    rotate: {
      properties: {
        rotateY: "+=90"
      },
      duration: 250, //.25 seconds
    },
  });

  return (

    <ViroARScene onTrackingUpdated={onInitialized}>

      <ViroPolyline
        position={[0, 0, -2]}
        points={
         // [[0,0,0],[-4.5469801977990745,0,3.558357379174872],[-1.7081394167243755,0,-8.154725730074372]]
        path.xyz
        }
        thickness={0.3}
      />{
    path.xyz&& <ViroNode position={path.xyz[path.xyz.length-1]} dragType="FixedToWorld" onDrag={() => { }} >

        {/* Spotlight to cast light on the object and a shadow on the surface, see
    the Viro documentation for more info on lights & shadows */}
        <ViroSpotLight
          innerAngle={5}
          outerAngle={45}
          direction={[0, -1, -.2]}
          position={path.xyz[path.xyz.length-1]}
          castsShadow={true}
          influenceBitMask={2}
          shadowMapSize={2048}
          shadowNearZ={2}
          shadowFarZ={5}
          shadowOpacity={.7} />

        <Viro3DObject
          source={require('./res/mapPointer.obj')}
          position={path.xyz[path.xyz.length-1]}
          scale={[.2, .2, .2]}
          type="OBJ"
          animation={{name: "rotate", run: true, loop: true}}
          lightReceivingBitMask={3}
          shadowCastingBitMask={2}
          transformBehaviors={['billboardY']} />

        <ViroQuad
          rotation={[-90, 0, 0]}
          width={.5} height={.5}
          lightReceivingBitMask={2} />
      </ViroNode>
}
    </ViroARScene>
  );

}
