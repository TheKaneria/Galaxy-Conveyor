import React from 'react';
import {View, Text} from 'react-native';
import colors from '../Utils/colors';

export default function Productcom(props) {
  const item = props.item;

  return (
    <View
      style={{
        marginHorizontal: '1%',
        borderRadius: 15,
      }}>
      <View
        style={{
          borderWidth: 0.7,
          borderColor: '#fff',
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
            borderColor: '#fff',
          }}>
          <View
            style={{
              width: '18%',
              justifyContent: 'center',
            }}>
            <View
              style={{
                borderRightWidth: 0.7,
                borderColor: '#fff',
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  paddingVertical: '7%',
                  paddingHorizontal: '0.7%',
                  color: '#f2f2f2',
                  textAlign: 'center',
                  fontFamily: 'NunitoSans_10pt-Regular',
                }}>
                {item?.count ? item?.count : 0}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '40%',
              justifyContent: 'center',
              flex: 1,
            }}>
            <View
              style={{
                borderRightWidth: 0.7,
                borderColor: '#fff',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  paddingVertical: '7%',
                  paddingHorizontal: '0.7%',
                  color: '#f2f2f2',
                  textAlign: 'center',
                  fontFamily: 'NunitoSans_10pt-Regular',
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
                fontFamily: 'NunitoSans_10pt-Regular',
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
            borderColor: '#fff',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <View
              style={{
                borderRightWidth: 0.7,
                borderColor: '#fff',
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  paddingVertical: '7%',
                  paddingHorizontal: '0.7%',
                  fontFamily: 'NunitoSans_10pt-Regular',
                  color: '#f2f2f2',
                  textAlign: 'center',
                }}>
                {item?.date ? item?.date : 0}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 2,
            }}>
            <View
              style={{
                borderRightWidth: 0.7,
                borderColor: '#fff',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  paddingVertical: '7%',
                  paddingHorizontal: '2%',
                  fontFamily: 'NunitoSans_10pt-Regular',
                  color: '#f2f2f2',
                  textAlign: 'center',
                }}>
                {item?.itemname ? item?.itemname : 0}
              </Text>
            </View>
          </View>

          <View
            style={{
              // width: '18%',
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#FFFF',
                fontFamily: 'NunitoSans_10pt-Regular',
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
