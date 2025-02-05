import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,ImageBackground,Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PrayerTimesScreen = () => {
  // State variables
  const [selectedCity, setSelectedCity] = useState('Karachi'); // Selected city for prayer times
  const [prayerTimes, setPrayerTimes] = useState({}); // Prayer times for the selected city
  const [nextPrayer, setNextPrayer] = useState(''); // Next prayer time
  const [selectedGregorianDate, setSelectedGregorianDate] = useState(''); // Selected Gregorian date
  const [hijriDate, setHijriDate] = useState(''); // Hijri date corresponding to the selected Gregorian date

  // useEffect hook to fetch prayer times when selectedCity changes
  useEffect(() => {
    fetchPrayerTimes(selectedCity);
  }, [selectedCity]);

  // useEffect hook to convert Gregorian date to Hijri when selectedGregorianDate changes
  useEffect(() => {
    convertGregorianToHijri(selectedGregorianDate);
  }, [selectedGregorianDate]);

  // Function to fetch prayer times for the selected city
  const fetchPrayerTimes = async (city) => {
    try {
      const response = await fetch(`http://api.aladhan.com/v1/calendarByCity?city=${city}&country=Pakistan&method=2`);
      if (!response.ok) {
        throw new Error('Failed to fetch prayer times');
      }
      const data = await response.json();
      if (data.code === 200) {
        setPrayerTimes(data.data[0].timings);
        calculateNextPrayer(data.data[0].timings);
      } else {
        throw new Error('Failed to fetch prayer times');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to calculate the next prayer time and remaining time
  const calculateNextPrayer = (timings) => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTimestamp = currentHour * 60 + currentMinute;

    let nextPrayerTime = null;
    let nextPrayerName = null;

    // Iterate through each prayer time and find the next upcoming one
    for (const [prayer, time] of Object.entries(timings)) {
      const [hour, minute] = time.split(':');
      const prayerTimestamp = parseInt(hour, 10) * 60 + parseInt(minute, 10);

      if (prayerTimestamp > currentTimestamp) {
        if (!nextPrayerTime || prayerTimestamp < nextPrayerTime) {
          nextPrayerTime = prayerTimestamp;
          nextPrayerName = prayer;
        }
      }
    }

    if (nextPrayerTime !== null && nextPrayerName !== null) {
      const remainingMinutes = nextPrayerTime - currentTimestamp;
      const remainingHours = Math.floor(remainingMinutes / 60);
      const remainingMinutesFormatted = remainingMinutes % 60;
      const remainingTime = `${remainingHours}h ${remainingMinutesFormatted}m`;
      setNextPrayer({ prayer: nextPrayerName, time: remainingTime });
    } else {
      setNextPrayer('');
    }
  };

  // Function to convert Gregorian date to Hijri
  const convertGregorianToHijri = async (gregorianDate) => {
    try {
      // Replace the URL with your actual API endpoint for Gregorian to Hijri conversion
      const response = await fetch(`http://api.example.com/convert?gregorianDate=${gregorianDate}`);
      if (!response.ok) {
        throw new Error('Failed to convert Gregorian to Hijri');
      }
      const data = await response.json();
      setHijriDate(data.hijriDate);
    } catch (error) {
      console.error(error);
    }
  };

  // Render function
  return ( 
   
    <ImageBackground source={require("../Images/islamic-wallpaper-islamic-posters_941097-23439.avif")} style={{ flex: 1, justifyContent: 'center', height:850 }}>
      <Image source={require("../Images/museum_7808152.png")} style={{ height: 100, width: 90, position: "absolute", top: 10, left: 10 }} />

      <View style={styles.container}>
        {/* City selector */}
        <View style={styles.citySelector}>
          <Text style={styles.label}>Select City:</Text>
          <Picker
            selectedValue={selectedCity}
            onValueChange={(itemValue) => setSelectedCity(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Karachi" value="Karachi" />
            <Picker.Item label="Lahore" value="Lahore" />
            <Picker.Item label="Attock" value="Attock" />
            <Picker.Item label="RawalPindi" value="RawalPindi" />
            <Picker.Item label="Faislabad" value="Faislabad" />
            <Picker.Item label="Jand" value="Jand" />
            <Picker.Item label="Peshawar" value="Peshawar" />
            <Picker.Item label="Mardan" value="Mardan" />
          </Picker>
        </View>
        {/* Header section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Prayer Times - {selectedCity}</Text>
          {nextPrayer && (
            <Text style={styles.nextPrayer}>Next Prayer: {nextPrayer.prayer} - {nextPrayer.time}</Text>
          )}
        </View>
        {/* Prayer times display */}
        <View style={styles.prayerTimes}>
          {Object.entries(prayerTimes).map(([prayer, time]) => (
            <View key={prayer} style={styles.prayerTimeItem}>
              <Text style={styles.prayerName}>{prayer}</Text>
              <Text>{time}</Text>
            </View>
          ))}
        </View>
       
      </View>
    </ImageBackground>
  
  );
};

// Styles
const styles = StyleSheet.create({
 
  container: {
    top:100,
    flexGrow: 1,
    backgroundColor: 'transparent',
    padding: 16,
  },
  citySelector: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: "#7B3F00",
    backgroundColor:"#FAF6EF",
    padding:10
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  nextPrayer: {
    fontSize: 16,
    color: '#007bff',
  },
  prayerTimes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  prayerTimeItem: {
    width: '48%',
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  prayerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dateConverter: {
    marginTop: 24,
    borderTopWidth: 1,
    paddingTop: 16,
  },
});

export default PrayerTimesScreen;
