import {ViroARSceneNavigator} from '@viro-community/react-viro/components/AR/ViroARSceneNavigator'
import  {ARScene}  from './ar'


export default function ArSceeneScreen() {
  return (
    <ViroARSceneNavigator
   // autofocus={true}
    initialScene={{
      scene: ARScene,
    }}
  />
    
  );
}


