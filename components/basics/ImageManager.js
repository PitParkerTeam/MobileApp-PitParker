import { View, Image, Button, Text } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";



export default function ImageManager({ imageHandler }) {
  const [permissionInfo, requestPermisson] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState("");
  const verifyPermission = async () => {
    if (permissionInfo.granted) {
      return true;
    }
    const requestPermissionResponse = await requestPermisson();
    return requestPermissionResponse.granted;
  };
  const takeImageHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        return;
      }
      const result = await ImagePicker.launchCameraAsync();
      // if (!result.canceled) {setImageUri(result.assets[0].uri)}
      setImageUri(result.assets[0].uri);
      imageHandler(result.assets[0].uri);
    } catch (err) {
      console.log("Image taking error ", err);
    }
  };
  return (
    <View>
      <Text style={{fontSize: 20, }}> Image </Text>

      <Button title="Take an Image" onPress={takeImageHandler} />
      <Icon name="camera-outline" size={24} />
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
      ) : (
        <Text> No image yet!</Text>
      )}
    </View>
  );
}