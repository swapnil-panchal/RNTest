import React from 'react';
import {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import IconAD from 'react-native-vector-icons/AntDesign';
import IconIC from 'react-native-vector-icons/Ionicons';

IconIC.loadFont();

interface props {
  userProfileImage: string;
  userName: string;
  userLocation: string;
  favorite: boolean;
  favoriteClick: Function;
}

const UserDataView: FC<props> = ({
  userProfileImage,
  userName,
  userLocation,
  favorite,
  favoriteClick,
}: props) => {
  return (
    <View style={{...styles.flexRow, ...styles.container}}>
      <View style={styles.profileImgView}>
        <Image
          source={{uri: userProfileImage}}
          resizeMode="contain"
          style={{width: '100%', height: '100%'}}
        />
      </View>

      {/* name and location view */}
      <View style={{marginLeft: '15%', alignItems: 'flex-start'}}>
        <Text style={styles.nameText}>{userName}</Text>
        <View style={{...styles.flexRow, justifyContent: 'flex-start'}}>
          <IconIC name="location-sharp" size={14} color={'#8C8C8C'} />
          <Text style={{fontSize: wp('2.75%'), marginStart: wp('0.75%'), color: '#000000'}}>
            {userLocation}
          </Text>
        </View>
      </View>

      {/* favorite star view */}
      <TouchableOpacity
        style={{alignItems: 'flex-start'}}
        activeOpacity={0.6}
        onPress={() => favoriteClick()}>
        <IconAD
          name={favorite ? 'star' : 'staro'}
          size={18}
          color={'#E9518D'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    width: '100%',
    marginBottom: hp('1%'),
    backgroundColor: '#FFFFFF',
    paddingVertical: wp('4.5%'),
    borderRadius: 6,
    paddingHorizontal: wp('4%'),
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
  profileImgView: {
    borderRadius: 100,
    width: wp('13%'),
    height: wp('13%'),
    overflow: 'hidden',
    position: 'absolute',
    left: -10,
  },
  nameText: {textAlign: 'left', fontSize: wp('4.5%'), fontWeight: '500', color: '#000000'},
});

export default UserDataView;
