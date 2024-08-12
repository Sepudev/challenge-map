import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  DeviceEventEmitter,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {SepumapView} from 'react-native-sepumap';
import { Colors } from '../constants/Colors';
import {Benefit, data} from '../constants/data';
import BenefitCard from '../components/benefit-card';

const markers = [
  {latitude: 37.763007, longitude: -122.41737, title: 'Pizza'},
  {latitude: 37.759722, longitude: -122.423608, title: 'Burger'},
  {latitude: 37.769771, longitude: -122.431793, title: 'Tacos'},
  {latitude: 37.7747, longitude: -122.409347, title: 'Italiano'},
];

const MapView = () => {
  const carouselRef = useRef<FlatList<Benefit> | null>(null);
  const [selectedBenefits, setSelectedBenefits] = useState<Benefit[]>([]);
  const [isMapLoading, setIsMapLoading] = useState(true);

  useEffect(() => {
    const loadMap = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsMapLoading(false);
    };

    loadMap();

    const initialMarker = markers[0];
    const initialPlace = data.find(
      place => place.title === initialMarker.title,
    );

    if (initialPlace) {
      setSelectedBenefits(initialPlace.benefits);
    }

    const eventListener = DeviceEventEmitter.addListener(
      'onMarkerClick',
      event => {
        const {title} = event;
        const foundPlace = data.find(place => place.title === title);

        if (foundPlace) {
          setSelectedBenefits(foundPlace.benefits);
          locateAtStart();
        }
      },
    );
    return () => {
      eventListener.remove();
    };
  }, []);

  const locateAtStart = () => {
    carouselRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  const renderItem = ({item}: {item: Benefit}) => {
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
      <View style={styles.bottomContainer}>
        {isMapLoading ? (
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
    backgroundColor:Colors.background,
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
});

export default MapView;
