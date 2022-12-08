import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React from "react";
import PitButton from "./PitButton";
import { COLORS, TEXT_STYLES } from "../../common";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const icons = {
  Home: "home-outline",
  MyPits: "star-circle-outline",
  SavedPits: "star-circle-outline",
  MyParking: "history",
  Account: "account-circle-outline",
};

const AddTab = ({ navigation }) => {
  return (
    <PitButton
      onPress={() => navigation.navigate("AddNewParking")}
      style={styles.button}
      type="primary"
      text="+"
      textStyle={styles.buttonText}
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

  const tabColor = isFocused ? COLORS.TINT[100] : COLORS.BASE[60];
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      style={{ alignItems: "center", width: "21%" }}
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
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingBottom: 15,
    borderTopColor: COLORS.BASE[40],
    borderTopWidth: 1,
  },
  button: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    height: 50,
    padding: 0,
    margin: 0,
  },
  buttonText: {
    fontSize: 45,
    textAlign: "center",
    fontWeight: TEXT_STYLES.title[600],
    lineHeight: 45,
  },
});
