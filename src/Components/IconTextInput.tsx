import React from 'react';
import {FC} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';

IconSLI.loadFont();

interface props {
  borderColor: string;
  iconcolor: string;
  iconName: string;
  inputprops: TextInputProps;
}

const IconTextInput: FC<props> = ({
  borderColor,
  iconcolor,
  iconName,
  inputprops,
}: props) => {
  return (
    <View
      style={{
        ...styles.inputView,
        borderColor: borderColor,
      }}>
      <IconSLI name={iconName} color={iconcolor} size={20} style={styles.iconView}/>
      <TextInput style={styles.textInput} {...inputprops}  />
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'row',
    width: '100%',
    height: hp('5%'),
    borderBottomWidth: 1,
    marginBottom: wp('1.5%'),
  },
  textInput: {
    borderColor: 'transparent',
    borderWidth: 1.5,
    width: '90%',
    fontSize: wp('4%'),
    paddingLeft: wp('3%'),
    paddingBottom: wp('1%'),
    color: '#000000'
  },
  iconView: {
    paddingBottom: wp('1%')
  }
});

export default IconTextInput;
