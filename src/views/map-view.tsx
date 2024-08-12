import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  DeviceEventEmitter,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SepumapView } from 'react-native-sepumap';
import { Colors } from '../constants/Colors';
import { Benefit, data } from '../constants/data';
import BenefitCard from '../components/benefit-card';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logoutIcon = require('../assets/images/logout.png');

const markers = [
  { latitude: 37.763007, longitude: -122.41437, title: 'Pizza' },
  { latitude: 37.759722, longitude: -122.423608, title: 'Burger' },
  { latitude: 37.769771, longitude: -122.426793, title: 'Tacos' },
  { latitude: 37.7747, longitude: -122.409347, title: 'Italiano' },
];

const MapView = () => {
  const navigation = useNavigation();
  const carouselRef = useRef<FlatList<Benefit> | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isLoadingBenefits, setIsLoadingBenefits] = useState(true);
  const [isFlatListVisible, setIsFlatListVisible] = useState(false);
  const [selectedBenefits, setSelectedBenefits] = useState<Benefit[]>([]);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setUsername(user.displayName || user.email);
    }

    const eventListener = DeviceEventEmitter.addListener(
      'onMarkerClick',
      event => {
        const { title } = event;
        const foundPlace = data.find(place => place.title === title);

        if (foundPlace) {
          setSelectedBenefits(foundPlace.benefits);
          setIsFlatListVisible(true);

          if (isFirstLoad) {
            setIsLoadingBenefits(true);
            setIsFirstLoad(false);
            setTimeout(() => {
              setIsLoadingBenefits(false);
            }, 150);
          }
          locateAtStart();
        }
      },
    );
    return () => {
      eventListener.remove();
    };
  }, [isFirstLoad]);

  const locateAtStart = () => {
    carouselRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  const renderItem = ({ item }: { item: Benefit }) => {
    return (
      <BenefitCard
        promo={item.promo}
        img={item.img}
        title={item.title}
        description={item.description}
        address={item.address}
      />
    );
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await auth().signOut();
      //@ts-ignore
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <SepumapView style={styles.map} markers={markers} />
      <View style={[styles.bottomContainer, { backgroundColor: isFlatListVisible ? Colors.background : Colors.secondary }]}>
        {isFlatListVisible ? (
          <>
            {isLoadingBenefits ? (
              <ActivityIndicator
                size={35}
                color={Colors.primary}
                style={styles.loader}
              />
            ) : (
              <FlatList
                ref={carouselRef}
                data={selectedBenefits}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.carousel}
              />
            )}
          </>
        ) : (
          <View style={styles.initialContainer}>
            <Text style={styles.initialText}>
              Selecciona un marcador para ver sus beneficios
            </Text>
          </View>
        )}
      </View>
      <TouchableOpacity activeOpacity={0.9} style={styles.logoutButton} onPress={handleLogout}>
        <Image source={logoutIcon} style={styles.logoutIcon} />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.username}>Bienvenido, {username ?? ''}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  carousel: {
    height: 260,
    width: 370,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  loader: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialContainer: {
    height: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialText: {
    color: Colors.background,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
  logoutButton: {
    position: 'absolute',
    top: 18,
    right: 18,
    backgroundColor: Colors.background,
    borderRadius: 50,
    padding: 10,
    elevation: 3,
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    padding: 10,
    elevation: 3,
  },
  username: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.background,
  },
});

export default MapView;
