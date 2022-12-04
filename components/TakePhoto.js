import { View, Image, Button, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function TakePhoto({ imageHandler }) {
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
      setImageUri(result.uri);
      imageHandler(result.uri);
    } catch (err) {
      console.log("Image taking error ", err);
    }
  };

  return (
    <View>
      <Button title="Take an Image" onPress={takeImageHandler} />
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
      ) : (
        <Text> No image yet!</Text>
      )}
    </View>
  );
}