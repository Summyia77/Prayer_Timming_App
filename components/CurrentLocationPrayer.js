import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, Alert } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const PrayerTimesComponent = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [areaName, setAreaName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upcomingPrayer, setUpcomingPrayer] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null); // State for next prayer
  const route = useRoute();

  const selectedMethod = route.params.selectedMethod;

  const fetchPrayerTimes = async (latitude, longitude, method) => {
    try {
      // Fetching location name using reverse geocoding
      const location = await Location.reverseGeocodeAsync({ latitude, longitude });
   

      // Fetching prayer times using latitude, longitude, and selected method
      const prayerTimesResponse = await axios.get(
        `http://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=${method}&month=${new Date().getMonth() + 1}&year=${new Date().getFullYear()}`,
      );
      setPrayerTimes(prayerTimesResponse.data.data[new Date().getDate() - 1].timings);
    } catch (error) {
      console.error('Error fetching prayer times:', error);
    } finally {
      setLoading(false);
    }
  };

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Location Permission', 'Permission to access location was denied. Prayer times cannot be fetched without location access.');
      setLoading(false);
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    // Fetching prayer times based on the selected method
    fetchPrayerTimes(latitude, longitude, selectedMethod);
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (prayerTimes) {
      const currentTime = new Date();
      let upcoming = null;
      let next = null; // Temporary variable for next prayer

      const formattedPrayerTimes = Object.keys(prayerTimes).map(prayer => ({
        name: prayer,
        time: prayerTimes[prayer],
        date: new Date(currentTime.toDateString() + ' ' + prayerTimes[prayer])
      }));

      // Sorting the prayer times by date
      formattedPrayerTimes.sort((a, b) => a.date - b.date);

      for (let i = 0; i < formattedPrayerTimes.length; i++) {
        if (formattedPrayerTimes[i].date > currentTime) {
          upcoming = formattedPrayerTimes[i].name;
          next = formattedPrayerTimes[i]; // Assign the next prayer
          break;
        }
      }

      if (!upcoming) {
        upcoming = formattedPrayerTimes[0].name;  // If no upcoming prayer is found, set to the first prayer of the next day
        next = formattedPrayerTimes[0]; // Assign the first prayer of the next day as next prayer
      }

      setUpcomingPrayer(upcoming);
      setNextPrayer(next); // Set the next prayer state
    }
  }, [prayerTimes]);

  const handleRefresh = () => {
    setLoading(true);
    requestLocationPermission();
  };

  return (
    <ImageBackground source={require("../Images/islamic-wallpaper-islamic-posters_941097-23439.avif")} style={{ flex: 1, justifyContent: 'center', height:850 }}>
      <Image source={require("../Images/museum_7808152.png")} style={{ height: 100, width: 90, position: "absolute", top: 10, left: 10 }} />

      <View style={{ position: "relative", top: 60, left: 70, paddingBottom: 10 }}>

        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <View>
            {prayerTimes ? (
              <View>
                {Object.keys(prayerTimes).map((prayer) => (
                  <Text key={prayer} style={{ color: upcomingPrayer === prayer ? 'red' : 'black', paddingBottom: 6, left: -25, fontSize: 20 }}>
                    {prayer}: {prayerTimes[prayer]}
                  </Text>
                ))}
               
              </View>
            ) : (
              <Text>No prayer times available</Text>
            )}
          </View>
        )}
      </View>
     
      <TouchableOpacity onPress={handleRefresh}>
        <Text style={{ position: "absolute", bottom: -90, right: 50, borderColor: "#6E260E", borderWidth: 2, borderRadius: 6, backgroundColor: "#6E260E", color: "white", height: 40, width: 80, paddingTop: 7, paddingLeft: 13 }}>
          Refresh
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default PrayerTimesComponent;
