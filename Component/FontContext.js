// logique pour ajouter le style de police telecharger

import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [loaded, error] = useFonts({
    'InriaSerif': require('../assets/fonts/InriaSerif-Light.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return (
    <FontContext.Provider value={{ loaded, error }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFontContext = () => {
  return useContext(FontContext);
};
