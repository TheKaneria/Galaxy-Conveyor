import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Shimmer from 'react-native-shimmer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = props => {
  const [animation, setAnimation] = useState('zoomIn');
  //   useEffect(() => {
  //     setTimeout(() => {
  //       props.navigation.navigate('Login');
  //     }, 2000);
  //   }, []);

  useEffect(() => {
    checklogin();
  }, []);

  const handleAnimationStart = () => {
    // Trigger "zoom out" after the initial "zoom in"
    setTimeout(() => {
      setAnimation(customZoomOut);
    }, 2000); // Delay before zooming out
  };

  const checklogin = async () => {
    setTimeout(async () => {
      var islogins = await AsyncStorage.getItem('islogin');

      if (islogins === 'true') {
        props.navigation.replace('MainTab');
      } else {
        props.navigation.replace('Login');
      }
    }, 3000);
  };

  const customZoomOut = {
    0: {
      opacity: 1,
      scale: 1.0,
    },
    1: {
      opacity: 0,
      scale: 4.5,
    },
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{width: '90%', alignSelf: 'center', alignItems: 'center'}}>
        <Animatable.Image
          animation={animation}
          duration={1000}
          resizeMode="center"
          style={{height: 100, width: '95%'}}
          easing={'ease-in-out'}
          source={require('../Assets/LogoC1.png')}
          useNativeDriver={true}
          onAnimationBegin={handleAnimationStart}
          iterationCount={1}
        />
      </View>
    </View>
  );
};

export default SplashScreen;
