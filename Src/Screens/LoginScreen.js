import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {
  getMessaging,
  getToken,
  onMessage,
  onTokenRefresh,
  requestPermission,
  AuthorizationStatus,
} from '@react-native-firebase/messaging';
import {getApp} from '@react-native-firebase/app';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import * as Animatable from 'react-native-animatable';
import Shimmer from 'react-native-shimmer';
import messaging from '@react-native-firebase/messaging';
import {useLoginContext} from '../Context/login_context';
import colors from '../Utils/colors';

const LoginScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showpass, setShowPass] = useState(false);
  const [fcmToken, setFCMToken] = useState('');
  const {Loginapi, login_loading} = useLoginContext();

  // const messaging = getMessaging(getApp());

  const email_validation =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const Submit = () => {
    if (email === '') {
      Toast.show('Enter Email ID..!!!');
    } else if (!email_validation.test(email)) {
      Toast.show('Enter Valid Email ID..!!!');
    } else if (password === '') {
      Toast.show('Enter password..!!!');
    } else {
      const formdata = new FormData();
      formdata.append('email', email);
      formdata.append('password', password);
      formdata.append('device_token', fcmToken);

      Loginapi(formdata, props);
    }
  };

  useEffect(() => {
    const initFCM = async () => {
      await requestNotificationPermission();
      await checkPermission();

      // Token refresh listener
      const unsubscribe = messaging().onTokenRefresh(token => {
        console.log('FCM Token refreshed:', token);
        setFCMToken(token);
      });

      return unsubscribe;
    };

    initFCM();
  }, []);

  const checkPermission = async () => {
    const authStatus = await messaging().hasPermission();

    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      await getFcmToken();
    } else {
      const granted = await requestUserPermission();
      if (granted) {
        await getFcmToken(); // 🔑 re-fetch after permission granted
      }
    }
  };

  const requestUserPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      console.log('Notification permission:', enabled);
      return enabled;
    } catch (error) {
      console.log('Permission error:', error);
      return false;
    }
  };

  const getFcmToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
        setFCMToken(fcmToken);
      } else {
        console.log('Failed to get FCM token');
      }
    } catch (error) {
      console.log('FCM Token error:', error);
    }
  };

  async function requestNotificationPermission() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission granted (Android)');
      } else {
        console.log('Notification permission denied (Android)');
        return;
      }
    } else if (Platform.OS === 'ios') {
      // iOS handled via requestUserPermission
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

      {/* HEADER LOGO */}
      <Animatable.View
        animation={'fadeInDownBig'}
        style={{
          flex: 2,
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Shimmer opacity={1} animationOpacity={0.3} duration={1500}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Image
              source={require('../Assets/LogoC1.png')}
              resizeMode="contain"
              style={{width: 250, height: 100}}
            />
          </View>
        </Shimmer>
      </Animatable.View>

      {/* MAIN FORM */}
      <Animatable.View
        animation={'fadeInUpBig'}
        style={{
          flex: 4,
          backgroundColor: colors.themecolor,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 70}
          style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <View
              style={{
                width: '90%',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginVertical: '10%',
              }}>
              <Text
                style={{
                  fontFamily: 'NunitoSans_10pt-Bold',
                  color: colors.white,
                  fontSize: 25,
                  fontWeight: 'bold',
                }}>
                Welcome Galaxy Conveyors
              </Text>
            </View>

            <View
              style={{
                width: '95%',
                alignSelf: 'center',
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderRadius: 10,
                paddingVertical: '10%',
              }}>
              {/* EMAIL */}
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  marginBottom: '10%',
                }}>
                <Text
                  style={{
                    fontFamily: 'NunitoSans_10pt-ExtraBold',
                    color: colors.white,
                    marginLeft: 2,
                    fontSize: 16,
                    marginBottom: 5,
                    fontWeight: 'bold',
                  }}>
                  Email
                </Text>
                <TextInput
                  onChangeText={setEmail}
                  placeholder="Enter Your Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={{
                    backgroundColor: 'rgba(255,255,255,1)',
                    paddingLeft: 10,
                    borderRadius: 8,
                    fontSize: 16,
                    fontWeight: '800',
                    color: colors.themecolor,
                  }}
                />
              </View>

              {/* PASSWORD */}
              <View style={{width: '90%', alignSelf: 'center'}}>
                <Text
                  style={{
                    fontFamily: 'NunitoSans_10pt-ExtraBold',
                    color: colors.white,
                    marginLeft: 2,
                    fontSize: 16,
                    marginBottom: 5,
                  }}>
                  Password
                </Text>
                <View
                  style={{
                    backgroundColor: 'rgba(255,255,255,1)',
                    borderRadius: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TextInput
                    onChangeText={setPassword}
                    placeholder="Enter Your Password"
                    secureTextEntry={!showpass}
                    style={{
                      fontSize: 16,
                      marginHorizontal: '2%',
                      color: colors.themecolor,
                      fontWeight: '800',
                      width: '80%',
                    }}
                  />
                  <Ionicons
                    onPress={() => setShowPass(!showpass)}
                    name={showpass ? 'eye' : 'eye-off'}
                    style={{marginHorizontal: '4%'}}
                    color={colors.themecolor}
                    size={25}
                  />
                </View>
              </View>

              {/* LOGIN BUTTON */}
              <TouchableOpacity
                onPress={Submit}
                style={{
                  backgroundColor: colors.themecolor,
                  width: 100,
                  marginTop: '10%',
                  alignItems: 'center',
                  alignSelf: 'center',
                  padding: 10,
                  elevation: 10,
                  borderRadius: 5,
                }}>
                {login_loading ? (
                  <ActivityIndicator color={colors.white} size="small" />
                ) : (
                  <Text
                    style={{
                      fontFamily: 'NunitoSans_10pt-Bold',
                      color: colors.white,
                    }}>
                    LOGIN
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Animatable.View>
    </View>
  );
};

export default LoginScreen;
