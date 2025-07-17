import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
  ImageBackground,
  Image,
  Platform,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import colors from '../Utils/colors';
import Feather from 'react-native-vector-icons/Feather';

export default function Productcom(props) {
  const item = props.item;

  return (
    <View
      style={{
        marginHorizontal: '1%',
        // marginVertical: '1%',
        borderRadius: 15,
      }}>
      <View
        style={{
          borderWidth: 0.7,
          borderColor: '#999999',
          backgroundColor: colors.themecolor,
          marginTop: '3%',
          borderRadius: 10,
          marginBottom: '1%',
          marginHorizontal: '1.5%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            borderBottomWidth: 0.7,
            borderColor: '#999999',
          }}>
          <View
            style={{
              width: '18%',
              justifyContent: 'center',
            }}>
            <View
              style={{
                borderRightWidth: 0.7,
                borderColor: '#999999',

                flex: 1,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  paddingVertical: '7%',
                  paddingHorizontal: '0.7%',

                  color: '#f2f2f2',
                  textAlign: 'center',
                }}>
                {item?.count ? item?.count : 0}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '40%',
              justifyContent: 'center',
            }}>
            <View
              style={{
                borderRightWidth: 0.7,
                borderColor: '#999999',
              }}>
              <Text
                style={{
                  paddingVertical: '7%',
                  paddingHorizontal: '0.7%',

                  flex: 1,
                  color: '#f2f2f2',
                  textAlign: 'center',
                }}>
                {item?.itemcode ? item?.itemcode : 0}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: '38%',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#FFFF',

                paddingVertical: '7%',

                flex: 1,
                textAlign: 'center',
              }}>
              {item?.code ? item?.code : 0}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            borderBottomWidth: 0.7,
            borderColor: '#999999',
          }}>
          <View
            style={{
              width: '22%',
              justifyContent: 'center',
            }}>
            <View
              style={{
                borderRightWidth: 0.7,
                borderColor: '#999999',

                flex: 1,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  paddingVertical: '7%',
                  paddingHorizontal: '0.7%',

                  color: '#f2f2f2',
                  textAlign: 'center',
                }}>
                {item?.date ? item?.date : 0}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '55%',
              justifyContent: 'center',
            }}>
            <View
              style={{
                borderRightWidth: 0.7,
                borderColor: '#999999',
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  paddingVertical: '7%',
                  paddingHorizontal: '2%',

                  color: '#f2f2f2',
                  textAlign: 'center',
                }}>
                {item?.itemname ? item?.itemname : 0}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: '18%',

              flex: 1,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#FFFF',

                paddingVertical: '7%',

                textAlign: 'center',
              }}>
              {item?.mtr_qty ? item?.mtr_qty : 0}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
