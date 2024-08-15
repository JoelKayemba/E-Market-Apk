import React from 'react';
import { View, StyleSheet } from 'react-native';
import PhoneInput from 'react-native-phone-input';

const CustomPhoneInput = ({
  defaultValue = '',
  onChangePhoneNumber = () => {},
  containerStyle = {},
  textInputStyle = {},
}) => {
  const phoneInput = React.useRef(null);

  React.useEffect(() => {
    if (phoneInput.current) {
      phoneInput.current.selectCountry('cd'); // Code ISO 3166-1 alpha-2 pour la RDC
    }
  }, []);

  return (
    <View style={[styles.container, containerStyle]}>
      <PhoneInput
        ref={phoneInput}
        value={defaultValue}
        onChangePhoneNumber={onChangePhoneNumber}
        style={[styles.phoneInput, textInputStyle]}
        textProps={{
          placeholder: 'Numéro de téléphone',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CustomPhoneInput;
