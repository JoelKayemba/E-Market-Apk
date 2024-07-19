import React from 'react';
import { View } from 'react-native';
import PhoneInput from 'react-native-phone-input';

const CustomPhoneInput = ({
  defaultValue = '',
  defaultCode = 'us',
  onChangePhoneNumber = () => {},
  containerStyle = {},
  textInputStyle = {},
}) => {
  const phoneInput = React.useRef(null);

  React.useEffect(() => {
    if (phoneInput.current) {
      phoneInput.current.setValue(defaultValue);
      phoneInput.current.selectCountry(defaultCode);
    }
  }, [defaultValue, defaultCode]);

  return (
    <PhoneInput
      ref={phoneInput}
      initialCountry={defaultCode}
      defaultValue={defaultValue}
      onChangePhoneNumber={onChangePhoneNumber}
      style={[containerStyle, textInputStyle]}
    />
  );
};

export default CustomPhoneInput;
