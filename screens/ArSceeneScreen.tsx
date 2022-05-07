import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {ViroARSceneNavigator} from '@viro-community/react-viro/components/AR/ViroARSceneNavigator'
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SpeedDial } from 'react-native-elements';
import { View } from '../components/Themed';
import { useAppDispatch } from '../hooks/hooks';
import { RootStackParamList } from '../types';
import  {ARScene}  from './ar'
import { actionCreators as pathActions } from '../state/ducks/Path';
import {actionCreators as markerActions} from '../state/ducks/marker'
import RNRestart from 'react-native-restart';

type Props = NativeStackScreenProps<RootStackParamList, 'ArSceeneScreen'>;

export default function ArSceeneScreen({ route, navigation }: Props) {
  const [open, setOpen] = useState(false);
  const dispatch= useAppDispatch();

  return (
    <View style={localStyles.outer} >
    <ViroARSceneNavigator
   // autofocus={true}
   style={localStyles.arView}
    initialScene={{
      scene: ARScene,
    }}
  />
  <SpeedDial
    isOpen={open}
    icon={{ name: 'gears', color: '#fff' ,type:"font-awesome" }}
    openIcon={{ name: 'close', color: '#fff',type:"font-awesome"  }}
    onOpen={() => setOpen(!open)}
    onClose={() => setOpen(!open)}
  >
    <SpeedDial.Action
      icon={{ name: 'exit-outline', color: '#fff',type:"ionicon" }}
      title="Exit"
      onPress={() => {
        RNRestart.Restart();
      }}
    />
    <SpeedDial.Action
      icon={{ name: 'exchange', color: '#fff' ,type:"font-awesome" }}
      title="change direction"
      onPress={() => {
        dispatch(pathActions.reset())
        navigation.navigate("ListWayPoint")
      }}
    />
  </SpeedDial>
    </View>
  );
}

var localStyles = StyleSheet.create({
  outer : {
    flexDirection: 'column',
    flex : 1,
  },
floatingMenuButtonStyle: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 35
},
  arView: {
    flex:1,
  },

});
