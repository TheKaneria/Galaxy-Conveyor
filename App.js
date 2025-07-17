import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Navigation from './Src/Navigation';
import {Loginprovider} from './Src/Context/login_context';
import {Salesprovider} from './Src/Context/sales_context';
import {Productprovider} from './Src/Context/production_context';
import {Tadaprovider} from './Src/Context/tada_context';
import {Leadprovider} from './Src/Context/Lead_context';
import {Servicesprovider} from './Src/Context/services_context';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const App = () => {
  useEffect(() => {
    PushNotification.createChannel(
      {
        channelName: 'channel',
        channelId: 'channel',
        playSound: false,
        soundName: 'default',
        vibrate: true,
      },
      created => console.log(`createChannel returned '${created}'`),
    );
    messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        bigPictureUrl: remoteMessage.notification.android?.imageUrl,
        smallIcon: remoteMessage.notification.android?.imageUrl,
        channelId: 'channel',
        repeatTime: 1,
        id: '123',
      });
    });
  }, []);

  return (
    <Loginprovider>
      <Salesprovider>
        <Productprovider>
          <Tadaprovider>
            <Leadprovider>
              <Servicesprovider>
                <Navigation />
              </Servicesprovider>
            </Leadprovider>
          </Tadaprovider>
        </Productprovider>
      </Salesprovider>
    </Loginprovider>
  );
};

export default App;
