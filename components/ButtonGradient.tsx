import React, { useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const runningBorderPath = (radius: number, strokeWidth: number) => {
  const offset = strokeWidth / 2;

  return `
    M ${radius + offset}, ${offset}
    A ${radius - offset}, ${radius - offset}, 0, 1, 1, ${radius + offset}, ${
    radius * 2 - offset
  }
    A ${radius - offset}, ${radius - offset}, 0, 1, 1, ${
    radius + offset
  }, ${offset}
  `;
};

interface ButtonProps {
  size?: number;
  color?: string;
  onPress?: () => void;
}

const RoundButtonGradient: React.FC<ButtonProps> = ({
  size = 40,
  color = "#F2DAE9",
  onPress,
}) => {
  const radius = size / 2;
  const strokeWidth = 4;
  const runningBorderData = runningBorderPath(radius, strokeWidth);
  const perimeter = 2 * Math.PI * radius;

  const segmentLength = 80;
  const gapLength = perimeter - segmentLength;

  const offset = useSharedValue(0);
  const translateX = useSharedValue(0);

  useEffect(() => {
    // Start the animation automatically when the component mounts
    translateX.value = withTiming(-5);
    offset.value = withRepeat(
      withTiming(perimeter, {
        duration: 20000,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    return () => {
      // Reset values when the component unmounts
      offset.value = 0;
      translateX.value = withTiming(0);
    };
  }, []);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: offset.value,
    };
  });

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={[
          styles.pressable,
          {
            backgroundColor: color,
            width: size,
            height: size,
            borderRadius: radius,
          },
        ]}>
        <Animated.View style={[styles.iconContainer]}>
          <Ionicons name="add" size={size / 2} color={"#0065ff"} />
        </Animated.View>
        <Svg width={size} height={size} style={styles.svg}>
          <Defs>
            <LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0%" stopColor="red" />
              <Stop offset="16.6%" stopColor="orange" />
              <Stop offset="33.3%" stopColor="#ff0" />
              <Stop offset="50%" stopColor="green" />
              <Stop offset="66.6%" stopColor="blue" />
              <Stop offset="83.3%" stopColor="purple" />
              <Stop offset="100%" stopColor="red" />
            </LinearGradient>
          </Defs>
          <AnimatedPath
            d={runningBorderData}
            strokeLinecap="round"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${segmentLength},${gapLength}`}
            animatedProps={animatedProps}
          />
        </Svg>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  pressable: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    top: "25%",
    left: "25%",
    // transform: [{ translateX: -10 }, { translateY: -16 }],
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default RoundButtonGradient;
