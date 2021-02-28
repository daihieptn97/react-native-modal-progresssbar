import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

let check = 0;

const ModalProcess = () => {
  const [percent, setPercent] = useState<number>(0);


  const widthAmin = useRef(new Animated.Value(0)).current;
  const opacityAmin = useRef(new Animated.Value(0)).current;

  const onAddPercent = () => {
    setPercent((num) => num + 5);
  };

  const onStartWidthAnimation = () => {
    Animated.timing(widthAmin, {
      useNativeDriver: false,
      toValue: percent,
      duration: 300,
      easing: Easing.linear,
    }).start();
  };

  useEffect(() => {
    if (percent > 0 && check === 0 || percent <= 0 && check === 1) {
      check = (percent > 0 && check === 0) ? 1 : 0;
      Animated.sequence([
        Animated.timing(opacityAmin, {
          useNativeDriver: false,
          toValue: 30,
          duration: 600,
          easing: Easing.bounce,
        }),
        Animated.timing(widthAmin, {
          useNativeDriver: false,
          toValue: percent,
          duration: 300,
          easing: Easing.linear,
        }),
      ]).start();
      // onOpacityProcess();
    } else
      onStartWidthAnimation();
  }, [percent]);

  useEffect(() => {
    if (percent === 5 || percent === 10 || percent === 15) {
      setPercent(num => num + 5);
    }
  }, [percent]);

  const widthAni = widthAmin.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={{ justifyContent: "center", flex: 1, marginHorizontal: 14 }}>
      <Text>
        Hello
      </Text>
      <TouchableOpacity style={styles.btn} onPress={onAddPercent}>
        <Text style={styles.txtWhite}>Add percent</Text>
      </TouchableOpacity>

      <Animated.View style={[styles.wrapProcess, { height: opacityAmin }]}>
        <Animated.View style={[styles.process, { width: widthAni }]} />
        <Text style={styles.txtPercent}>{percent}%</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapProcess: {
    backgroundColor: "brown",
    height: 0,
    width: "100%",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  process: { backgroundColor: "green", height: 30, position: "absolute", left: 0 },
  txtPercent: { color: Colors.white, fontWeight: "bold" }, btn: {
    backgroundColor: "brown",
    justifyContent: "center",
    paddingVertical: 12,
    alignItems: "center",
    width: "60%",
    alignSelf: "center",
    marginVertical: 20,
    borderRadius: 11,
  }, txtWhite: { color: "white", fontWeight: "bold" },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "powderblue",
  },
  fadingText: {
    fontSize: 28,
    textAlign: "center",
    margin: 10,
  },

});

export default ModalProcess;
