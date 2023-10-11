import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import * as Location from "expo-location";

export default function Position() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [message, setMessage] = useState("Haetaan sijaintia...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      try {
        if (status !== "granted") {
          setMessage("Sijaintia ei saatu.");
        } else {
          const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setMessage("Sijainti saatu");
        }
      } catch (error) {
        setMessage("Virhe sijainnin haussa.");
        console.error(error);
      }
      setIsLoading(false);
    })()
  }, []);

  return (
    <View>
      <Text style={styles.coords}>Koordinaatit: {latitude.toFixed(3)} leveys, {longitude.toFixed(3)} pituus</Text>
          <Text style={{alignSelf: "center", fontSize: 20, color: isLoading ? "red" : "green"}}>{message}</Text>
          {isLoading === false &&
          <View style={styles.weatherContainer}>
          <Weather latitude={latitude} longitude={longitude} />
          </View>
          }
    </View>
  );
}

const styles = StyleSheet.create({
    coords: {
      fontSize: 20,
      color: "blue",
    },
    weatherContainer: {
        alignItems: "center",
        marginTop: 20,
      },
  });