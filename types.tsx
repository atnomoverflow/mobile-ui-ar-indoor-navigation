/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {store} from './state';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  QrScanner: undefined;
  ArSceeneScreen:  undefined;
  ListWayPoint:undefined;  
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type WayPoint={
  longitude:number;
  laltitude:number;
  name:string;
  image:string;
id:string
}
export type Marker={
  longitude:number;
  laltitude:number;
id:string
}
export type Action={
  type:string,
  payload?:any
}
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch