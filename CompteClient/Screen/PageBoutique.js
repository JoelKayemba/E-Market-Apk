import React, { useState, useRef } from 'react';
import { StyleSheet, View, FlatList, Text, Animated, SafeAreaView } from 'react-native';
import Publicite from '../Component/Publicite';
import BoutiquePourToi from '../Component/BoutiquePourToi';
import BoutiqueProche from '../Component/BoutiqueProche';
import ClientStyle from '../../Styles/ClientStyle';
import MeilleursBoutique from '../Component/MeilleursBoutique';
import CustomHeader from '../../Component/CustomHeader';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Boutique = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current; // Reference for scroll position

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => { // Simulate network call
      setRefreshing(false);
    }, 2000);
  };

  // Data for sections
  const sections = [
    {
      id: '1', // Unique identifier for each section
      title: 'Recommandation',
      component: <BoutiquePourToi />
    },
    {
      id: '2',
      title: 'Nos Meilleurs Boutiques',
      component: <MeilleursBoutique />
    },
    {
      id: '3',
      title: 'Proche de Vous',
      component: <BoutiqueProche />
    }
  ];

  
  const renderHeader = () => (
    <View>
      <Publicite />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
     
      <Animated.View style={{
        transform: [{
          translateY: scrollY.interpolate({
            inputRange: [0, 200],
            outputRange: [0, -200], 
            extrapolate: 'clamp'
          })
        }],
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
      }}>
        <CustomHeader navigation={navigation} />
      </Animated.View>

      <AnimatedFlatList
        ListHeaderComponent={renderHeader}
        data={sections}
        renderItem={({ item }) => (
            <View key={item.id}>
                <View style={ClientStyle.containerRecommandation}>
                    <Text style={ClientStyle.textPourToi}>{item.title}</Text>
                </View>
                {item.component}
            </View>
        )}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
        )}
        
        contentContainerStyle={{ paddingTop: 150 }}
    />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0
  }
});

export default Boutique;
