import {StatusBar } from 'expo-status-bar';
import React, {userState, useEffect} from 'react';
import { StyleSheet, Text, View,Button,Image } from 'react-native';
import { Camera } from 'expo-camera';
import { CameraType } from 'expo-camera/build/Camera.types';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = userState(null);
  const [camera,setCamera] = userState(null);
  const [image, setImage] = userState(null);
  const [type, setType] = userState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');
    }) ();
  }, []);


  const takePicture = async () => {
    if (camera){
      const data = await camera.takePictureAsync(null)
      setImage(data.uri);
    }
  }

    if(hasCameraPermission === false){
      return <Text> No Camera Access</Text>
    } 

  return (
    <View style={{flex:1}}>
      <View style={styles.cameraContainer}>
        <Camera ref={ref => setCamera(ref)}
        style ={styles.fixedRatio}
        type={type}
        ratio ={'1:1'}
         />
      </View>

      <Button
        title ="Flip Camera"
        onPress={() => {
          setType (type  === Camera.Constants.Type.back ? Camera.Constants.Type.front: Camera.Constants.Type.back);
        }
        }>
      </Button>

      <Button title ="Take Picture"
      onPress={() => takePicture()}
       ></Button>
       {image && <Image source={{uri: image}} style={{flex:1}} />}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  fixedRatio: {
    flex:1,
    aspectRatio:1
  }
});
