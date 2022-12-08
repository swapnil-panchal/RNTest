import React from 'react';
import { FC, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Image, StyleSheet, View, RefreshControl } from 'react-native';
import deviceInfo from 'react-native-device-info';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, } from 'react-redux';
import UserDataView from '../Components/UserDataViewCard';
import { actionTypes } from '../Constants';
import { useAppSelector } from '../Store/hooks';

const deviceHasNotch = deviceInfo.hasNotch();

export interface userDetails {
  name: string;
  profileImg: string;
  location: string;
  favorite: boolean;
}

const DashboardController: FC = () => {
  const [isFetching, SetisFetching] = useState(false)
  const dispatch = useDispatch();
  const { characters } = useAppSelector(state => state.Characters);

  useEffect(() => {
    getAllCharacters();
  }, []);

  useEffect(() => {
    console.log('yes');

    getAllCharacters();
  }, [isFetching]);

  const onRefresh = () => {
    SetisFetching(true)
  }

  const getAllCharacters = async () => {
    fetch('https://randomuser.me/api/?results=10').then(async response => {
      const res = JSON.parse(await response.text());
      SetisFetching(false)
      const newResponse = res?.results?.map((item: { id: { value: any; }; name: { first: String; last: String; }; picture: { thumbnail: String; }; location: { city: String; country: String; }; }) => {
        return {
          id: item?.id?.value,
          name: `${item?.name?.first} ${item?.name?.last}`,
          profileImg: item?.picture?.thumbnail,
          location: `${item?.location?.city}, ${item?.location?.country}`,
          favorite: false,
        }
      });

      dispatch({
        type: actionTypes.GET_CHARACTERS,
        payload: newResponse
      });
    });
  };

  const addToFavouriteHandler = (index: number) => {

    let data:Array<userDetails> = [...characters]
    data[index].favorite = !data[index].favorite

    dispatch({
      type: actionTypes.GET_CHARACTERS,
      payload: data
    });
  };


  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'icon_infinite_logo' }}
        resizeMode="contain"
        style={{
          width: wp('12%'),
          height: wp('12%'),
          tintColor: '#E9518D',
          marginTop: hp('6%'),
        }}
      />
      <View style={styles.flatlistWrapper}>
        <FlatList
          contentContainerStyle={styles.mainView}
          showsVerticalScrollIndicator={false}
          style={styles.flatListView}
          data={characters}
          renderItem={({ item, index }) => {
            return (
              <UserDataView
                key={index}
                userProfileImage={item.profileImg}
                userName={item.name}
                userLocation={item.location}
                favorite={item.favorite}
                favoriteClick={() => addToFavouriteHandler(index)}
              />
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => onRefresh()}
            />
          }
        />
      </View>
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
  flatlistWrapper: {
    backgroundColor: '#F5F5FA',
    marginHorizontal: wp('4%'),
    marginTop: hp('2%'),
    paddingHorizontal: wp('6%'),
    paddingTop: hp('3%'),
    width: wp('90%'),
  },
  mainView: {
    flexGrow: 1,
    paddingLeft: wp('6%'),
    paddingBottom: hp('8%')
  },
  flatListView: {
    // paddingBottom: 20,

  }
});

export default DashboardController;
function onRefresh() {
  throw new Error('Function not implemented.');
}

function functiongetState(): any {
  throw new Error('Function not implemented.');
}


