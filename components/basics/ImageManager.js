import { TouchableOpacity, View, Image, Button, Text } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, TEXT_STYLES } from "../../common";

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
      <Text
        style={{
          ...TEXT_STYLES.title[500],
          marginBottom: 8,
        }}
      >
        {" "}
        Image{" "}
      </Text>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />)}
              <TouchableOpacity onPress={takeImageHandler}>
          <View
            style={{
              width: 59,
              height: 59,
              borderWidth: 2,
              borderColor: "#D3D3D3",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              marginVertical: 4,
            }}
          >
            <Text
              style={{
                fontSize: 70,
                color: "#808080",
                textAlign: "center",
                lineHeight: 65,
              }}
            >
              +
            </Text>
          </View>
        </TouchableOpacity>
    </View>
  );
}
