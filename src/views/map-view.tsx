import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  DeviceEventEmitter,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import { SepumapView } from 'react-native-sepumap';
import { Colors } from '../constants/Colors';
import { Benefit, data } from '../constants/data';
import BenefitCard from '../components/benefit-card';

const markers = [
  { latitude: 37.763007, longitude: -122.41437, title: 'Pizza' },
  { latitude: 37.759722, longitude: -122.423608, title: 'Burger' },
  { latitude: 37.769771, longitude: -122.426793, title: 'Tacos' },
  { latitude: 37.7747, longitude: -122.409347, title: 'Italiano' },
];

const MapView = () => {
  const carouselRef = useRef<FlatList<Benefit> | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isLoadingBenefits, setIsLoadingBenefits] = useState(true);
  const [isFlatListVisible, setIsFlatListVisible] = useState(false);
  const [selectedBenefits, setSelectedBenefits] = useState<Benefit[]>([]);

  useEffect(() => {
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

  return (
    <View>
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
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default MapView;
