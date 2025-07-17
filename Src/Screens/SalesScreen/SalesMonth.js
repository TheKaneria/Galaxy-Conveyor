import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import metrics from '../../Utils/metrics';
import colors from '../../Utils/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const SalesMonth = props => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: colors.themecolor,
          height: metrics.HEIGHT * 0.08,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingHorizontal: 20,
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <FontAwesome6 name="angle-left" color={colors.white} size={25} />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: metrics.WIDTH * 0.1,
            color: colors.white,
            fontFamily: 'NunitoSans_10pt-Bold',
            fontSize: 20,
          }}>
          Sales Current Month
        </Text>
      </View>
    </View>
  );
};

export default SalesMonth;

const styles = StyleSheet.create({});
