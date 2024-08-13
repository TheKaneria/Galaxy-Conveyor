import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../Utils/colors';

const SplashScreen = props => {
  const [animation, setAnimation] = useState('zoomIn');

  const handleAnimationEnd = () => {
    setTimeout(() => {
      setAnimation(customZoomIn);
    }, 1500);
  };
  useEffect(() => {
    checklogin();
  }, []);

  const customZoomIn = {
    0: {
      opacity: 1,
      scale: 1.0,
    },
    1: {
      opacity: 0,
      scale: 4.5,
    },
  };

  const checklogin = async () => {
    setTimeout(async () => {
      var islogins = await AsyncStorage.getItem('islogin');
      console.log('islogins', islogins);

      if (islogins === 'true') {
        props.navigation.replace('DashBoard');
      } else {
        props.navigation.replace('Login');
      }
    }, 3800);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
      }}>
      <View style={{width: '90%', alignSelf: 'center', alignItems: 'center'}}>
        <Animatable.Image
          animation={animation}
          onAnimationEnd={handleAnimationEnd}
          duration={1000}
          easing={'ease-in-out'}
          resizeMode="center"
          style={{height: 100, width: '95%'}}
          source={require('../Assets/Logo1.png')}
          useNativeDriver={true}
          iterationCount={1}
        />
      </View>
    </View>
  );
};

export default SplashScreen;
