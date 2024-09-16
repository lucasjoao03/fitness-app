import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Accelerometer } from "expo-sensors";

const StepCounter = ({ steps, setSteps }) => {
  const [subscription, setSubscription] = useState(null);

  const subscribe = () => {
    setSubscription(
      Accelerometer.addListener(({ x, y, z }) => {
        const totalAcceleration = Math.sqrt(x * x + y * y + z * z);
        if (totalAcceleration > 1.2) {
          setSteps((prevSteps) => prevSteps + 1);
        }
      })
    );
    Accelerometer.setUpdateInterval(1000);
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Passos Dados: {steps}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#e0f7fa",
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default StepCounter;
