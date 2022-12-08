import React, {FC, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import deviceInfo from 'react-native-device-info';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import IconTextInput from '../Components/IconTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Props} from '../Navigation/StackParamsList';
import {useNavigation} from '@react-navigation/native';

IconSLI.loadFont();

const deviceHasNotch = deviceInfo.hasNotch();

const LoginController: FC = () => {
  const navigation = useNavigation<Props>();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [focused, setFocused] = useState<'email' | 'password' | ''>('');

  const handleLoginClick = () => {
    if (email.toLocaleLowerCase() === 'reactnative@jetdevs.com' && password === 'jetdevs@123') {
    
      AsyncStorage.setItem('isUserLoggedIn', 'true');
      navigation.navigate('Dashboard');
    } else {
      if (email !== 'reactnative@jetdevs.com')
        Alert.alert('Email is incorrect');
      else Alert.alert('Email and password are incorrect');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '60%',
          }}>
          <Text style={styles.loginText}>LOGIN</Text>

          <View style={{marginTop: wp('5%')}}>
            <IconTextInput
              borderColor={focused === 'email' ? '#E9518D' : '#E5E6ED'}
              iconName="envelope"
              iconcolor={focused === 'email' ? '#E9518D' : '#D7D8E0'}
              inputprops={{
                keyboardType: 'email-address',
                value: email,
                onChangeText: setEmail,
                placeholder: 'Email',
                placeholderTextColor: '#E5E6ED',
                onFocus: () => setFocused('email'),
                autoCapitalize:'none',
              }}
            />

            <IconTextInput
              borderColor={focused === 'password' ? '#E9518D' : '#E5E6ED'}
              iconName="lock"
              iconcolor={focused === 'password' ? '#E9518D' : '#D7D8E0'}
              inputprops={{
                keyboardType: 'default',
                secureTextEntry: true,
                value: password,
                onChangeText: setPassword,
                placeholder: 'Password',
                placeholderTextColor: '#E5E6ED',
                onFocus: () => setFocused('password'),
              }}
            />
          </View>

          <TouchableOpacity
            style={{...styles.loginBtnContainer, backgroundColor: !email && !password?'#D7D8E0':'#E9518D',}}
            disabled={(!email && !password)}
            activeOpacity={0.6}
            onPress={handleLoginClick}>
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infiniteLogoImgView}>
        <Image
          source={{uri: 'icon_infinite_logo'}}
          resizeMode="contain"
          style={{width: wp('12%'), height: wp('12%'), tintColor: '#E9518D'}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5FA',
    paddingVertical: deviceHasNotch ? hp('4%') : 0,
    paddingHorizontal: wp('2%'),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  infiniteLogoImgView: {
    alignSelf: 'center',
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    padding: wp('3%'),
    justifyContent: 'center',
    position: 'absolute',
    top: hp('13%'),
  },
  mainView: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    borderRadius: 5,
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('3%'),
    width: '90%',
    height: '80%',
    alignItems: 'flex-end',
    marginBottom: hp('5%'),
  },
  loginText: {
    color: '#4C4C4C',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginTop: hp('5%'),
  },
  loginBtnContainer: {
    paddingVertical: hp('1.75%'),
    borderRadius: 6,
  },
  loginBtnText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default LoginController;
