import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import PitButton from "./PitButton";
import { COLORS } from "../common";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const icons = {
  Home: "home-outline",
  MyPits: "star-circle-outline",
  SavedPits: "star-circle-outline",
  Parking: "history",
  Account: "account-circle-outline",
};

const AddTab = ({ navigation }) => {
  return (
    <PitButton
      onPress={() => navigation.navigate("AddNewParking")}
      style={{ width: 50 }}
      type="primary"
      text="+"
    ></PitButton>
  );
};
const Tab = (props) => {
  const { route, index, descriptors, navigation, state } = props;
  if (route.name == "Add") return <AddTab {...props} />;
  const { options } = descriptors[route.key];
  const label = options.tabBarLabel
    ? options.tabBarLabel
    : options.title
    ? options.title
    : route.name;

  const isFocused = state.index === route.idx;

  const onPress = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      // The `merge: true` option makes sure that the params inside the tab screen are preserved
      navigation.navigate({ name: route.name, merge: true });
    }
  };

  const tabColor = isFocused ? COLORS.TINT[100] : COLORS.BASE[60]
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      style={{ alignItems: "center" }}
    >
      <Icon name={icons[route.name]} size={24} color={tabColor} />
      <Text
        style={{
          color: tabColor,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default function BottomTab({ state, descriptors, navigation }) {
  const { routes } = state;
  const [home, saved, history, account] = routes.map((route, idx) => ({
    ...route,
    idx,
  }));
  const add = {
    name: "Add",
    key: "add",
    params: undefined,
    idx: 5,
  };
  const newRoutes = [home, saved, add, history, account];
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding:15,
          paddingTop:0,
          borderTopColor:COLORS.BASE[40],
          borderTopWidth:1,
        }}
      >
        {newRoutes.map((route) => (
          <Tab
            descriptors={descriptors}
            route={route}
            navigation={navigation}
            state={state}
            key={route.key}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}
