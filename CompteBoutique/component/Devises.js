import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

// Exemple d'API pour obtenir toutes les devises
const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

// Fonction pour obtenir les symboles des devises
const getCurrencySymbol = (code) => {
  const symbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CNY: '¥',
    AUD: 'A$',
    CAD: 'CAD$',
    CHF: 'CHF',
    SEK: 'kr',
    NOK: 'kr',
    DKK: 'kr',
    ZAR: 'R',
    INR: '₹',
    RUB: '₽',
    BRL: 'R$',
    MXN: '$',
    
  };
  return symbols[code] || code; // Retourne le symbole ou le code si le symbole n'existe pas
};

const Devises = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [filteredCurrencies, setFilteredCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(API_BASE_URL);
        const data = await response.json();
        const currencyList = Object.keys(data.rates).map((code) => ({
          code,
          symbol: getCurrencySymbol(code),
        }));
        setCurrencies(currencyList);
        setFilteredCurrencies(currencyList);
      } catch (error) {
        console.error('Erreur lors de la récupération des devises:', error);
      }
    };
    fetchCurrencies();
  }, []);

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text) {
      const filtered = currencies.filter((currency) =>
        currency.code.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCurrencies(filtered);
    } else {
      setFilteredCurrencies(currencies);
    }
  };

  const selectCurrency = (currency) => {
    setSelectedCurrency(currency);
  };

  const handleFinish = () => {
    if (selectedCurrency) {
      alert(`Devise sélectionnée: ${selectedCurrency.code} (${selectedCurrency.symbol})`);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#333"
          onPress={() => navigation.goBack()}
          style={styles.backIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une devise"
          value={searchTerm}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredCurrencies}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.currencyItem,
              selectedCurrency?.code === item.code && styles.selectedCurrencyItem,
            ]}
            onPress={() => selectCurrency(item)}
          >
            <Text style={styles.currencyText}>
              {item.symbol} - {item.code}
            </Text>
            {selectedCurrency?.code === item.code && (
              <AntDesign name="checkcircle" size={20} color="#007AFF" />
            )}
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
        <Text style={styles.finishButtonText}>Terminer</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Devises;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backIcon: {
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal:20
  },
  currencyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginHorizontal:20
  },
  selectedCurrencyItem: {
    backgroundColor: '#e6f7ff',
  },
  currencyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  finishButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal:20
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
