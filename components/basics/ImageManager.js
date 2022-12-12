import {
  TouchableOpacity,
  View,
  Image,
  Button,
  Text,
  StyleSheet,
} from "react-native";
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
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        imageHandler(result.assets[0].uri);
      }
    } catch (err) {
      console.log("Image taking error ", err);
    }
  };
  return (
    <View>
      <Text style={styles.label}>Image</Text>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <TouchableOpacity onPress={takeImageHandler}>
        <View style={styles.plusContainer}>
          <Text style={styles.plusSign}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    ...TEXT_STYLES.title[500],
    marginBottom: 8,
  },
  image: {
    width: 200,
    height: 200,
  },
  plusContainer: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: COLORS.BASE[40],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginVertical: 4,
  },
  plusSign: {
    fontSize: 70,
    color: COLORS.BASE[60],
    textAlign: "center",
    lineHeight: 65,
  },
});
