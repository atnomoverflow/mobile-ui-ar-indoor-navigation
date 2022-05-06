import { Viro3DPoint } from "@viro-community/react-viro/dist/components/Types/ViroUtils"
import { Platform } from "react-native";

const latLongToMerc = (latDeg: number, longDeg: number) => {
    // From: https://gist.github.com/scaraveos/5409402
    const longRad = (longDeg / 180.0) * Math.PI;
    const latRad = (latDeg / 180.0) * Math.PI;
    const smA = 6378137.0;
    const xmeters = smA * longRad;
    const ymeters = smA * Math.log((Math.sin(latRad) + 1) / Math.cos(latRad));

    return { x: xmeters, y: ymeters };
  };
  const transformGpsToAR = (latObj: number, longObj: number,marker:any) => {
    const deviceObjPoint = latLongToMerc(latObj, longObj);
    const mobilePoint = latLongToMerc(marker.latitude, marker.longitude);
    
    const objDeltaY = deviceObjPoint.y - mobilePoint.y;
    const objDeltaX = deviceObjPoint.x - mobilePoint.x;

    if (Platform.OS = "android") {
      let degree = 60;
      let angleRadian = (degree * Math.PI) / 180;


      let newObjX = objDeltaX * Math.cos(angleRadian) - objDeltaY * Math.sin(angleRadian);
      let newObjY = objDeltaX * Math.sin(angleRadian) + objDeltaY * Math.cos(angleRadian);

      return { x: newObjX, z: -newObjY };
    }

    return { x: objDeltaX, z: -objDeltaY };
  };
export const gpsToXyz =  (path:any,marker:any) => {
    //console.log(marker)
    const aux:Viro3DPoint[]=[[0,0,0],]
    for(let i=0;i<path.length;i++)
    {aux.push([-transformGpsToAR(path[i].latitude,path[i].longitude,marker).x,0,-transformGpsToAR(path[i].latitude,path[i].longitude,marker).z])}
   
    return aux
}