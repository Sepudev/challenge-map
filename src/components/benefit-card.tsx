import * as React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';

interface CardProps {
  promo: string;
  img: string;
  title: string;
  description: string;
  address: string;
}

const BenefitCard: React.FC<CardProps> = ({
  promo,
  img,
  title,
  description,
  address,
}) => (
  <View style={styles.container}>
    <View style={styles.promoContainer}>
      <Text style={styles.promoText}>{promo}</Text>
    </View>
    <Image source={{uri: img}} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    <Text style={styles.address}>{address}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: Colors.secondary,
    position: 'relative',
  },
  promoContainer: {
    position: 'absolute',
    top: 10,
    right: 12,
    backgroundColor: Colors.primary,
    padding: 5,
    borderRadius: 5,
    zIndex: 10,
  },
  image: {
    marginTop: 30,
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
    color: '#fff',
  },
  description: {
    marginTop: 5,
    opacity: 0.6,
    fontSize: 13,
    color: '#EEEDED',
    marginBottom: 6,
  },
  promoText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: 'bold',
  },
  address: {
    fontSize: 13,
    color: Colors.primary,
  },
});

export default BenefitCard;
