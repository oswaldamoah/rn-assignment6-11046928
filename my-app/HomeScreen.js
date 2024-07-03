import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView, Text } from 'react-native';
import Product from './Product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const productList = [
      { id: 1, name: 'Office Wear', image: require('./assets/dress1.png'), description: 'reversible angora cardigan', price: 120 },
      { id: 2, name: 'Black', image: require('./assets/dress2.png'), description: 'reversible angora cardigan', price: 120 },
      { id: 3, name: 'Church Wear', image: require('./assets/dress3.png'), description: 'reversible angora cardigan', price: 120 },
      { id: 4, name: 'Lamerei', image: require('./assets/dress4.png'), description: 'reversible angora cardigan', price: 120 },
      { id: 5, name: '21WN', image: require('./assets/dress5.png'), description: 'reversible angora cardigan', price: 120 },
      { id: 6, name: 'Lopo', image: require('./assets/dress6.png'), description: 'reversible angora cardigan', price: 120 },
      { id: 7, name: '21WN', image: require('./assets/dress7.png'), description: 'reversible angora cardigan', price: 120 },
      { id: 8, name: 'Lame', image: require('./assets/dress8.png'), description: 'reversible angora cardigan', price: 120 },
    ];
    setProducts(productList);
  }, []);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartItems = await AsyncStorage.getItem('cart');
        if (cartItems) {
          setCart(JSON.parse(cartItems));
        } else {
          setCart([]);  // Ensure the cart is empty if no items are found in storage
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadCart();
  }, []);

  const addToCart = async (product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    let updatedCart;

    if (existingProductIndex > -1) {
      // Increment quantity if product already exists in the cart
      updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // Add new product with quantity 1 if not in the cart
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { /* Add your filter functionality here */ }}>
          <Icon name="menu" size={28} color="#000" />
        </TouchableOpacity>
        <Image source={require('./assets/Logo.png')} style={styles.logo} />
        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={() => { /* Add your search functionality here */ }}>
            <Icon name="search" size={28} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
            <Icon name="shopping-cart" size={28} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.storyHeader}>
        <Text style={styles.storyText}>OUR STORY</Text>
        <View style={styles.storyIcons}>
          <TouchableOpacity onPress={() => { /* Add your list view functionality here */ }}>
            <Icon name="view-list" size={28} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { /* Add your menu functionality here */ }}>
            <Icon name="filter-list" size={28} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Product product={item} addToCart={addToCart} />
        )}
        contentContainerStyle={styles.productList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'center',
  },
  rightIcons: {
    flexDirection: 'row',
  },
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  storyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  storyIcons: {
    flexDirection: 'row',
  },
  productList: {
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default HomeScreen;
