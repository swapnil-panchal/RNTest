import React from 'react';
import { FC, useState } from 'react';
import { FlatList } from 'react-native';
import { Image, StyleSheet, View, RefreshControl } from 'react-native';
import deviceInfo from 'react-native-device-info';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import UserDataFav from '../Components/UserDataFav';
import { actionTypes } from '../Constants';
import { useAppSelector } from '../Store/hooks';
const deviceHasNotch = deviceInfo.hasNotch();

export interface userDetails {
  name: string;
  profileImg: string;
  location: string;
  favorite: boolean;
}

const FavoriteController: FC = () => {

  const dispatch = useDispatch();
  const {characters} = useAppSelector(state => state.Characters);
  const [isFetching, SetisFetching] = useState(false)

  const addToFavouriteHandler = (item: any, index: number) => {

    let data:Array<userDetails> = [...characters]
    data[index].favorite = !data[index].favorite

    dispatch({
      type: actionTypes.GET_CHARACTERS,
      payload: data
    });
  };

  const onRefresh = () => {
    SetisFetching(true)
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'icon_infinite_logo' }}
        resizeMode="contain"
        style={{
          width: wp('12%'),
          height: wp('12%'),
          tintColor: '#E9518D',
          marginTop: hp('1.5%'),
        }}
      />

      <FlatList
        contentContainerStyle={styles.mainView}
        showsVerticalScrollIndicator={false}
        data={characters}
        renderItem={({ item, index }) => {
          if (item.favorite) {
            return (
              <UserDataFav
                key={index}
                userProfileImage={item.profileImg}
                userName={item.name}
                favorite={item.favorite}
                favoriteClick={() => addToFavouriteHandler(item, index)}
              />
            );
          } else return null
        }}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => onRefresh}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: deviceHasNotch ? hp('4%') : 0,
    paddingHorizontal: wp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainView: {
    flexGrow: 1,
    backgroundColor: '#F5F5FA',
    marginHorizontal: wp('4%'),
    marginTop: hp('2%'),
    paddingHorizontal: wp('6%'),
    paddingTop: hp('3%'),
    width: wp('90%'),
  },
});

export default FavoriteController;
