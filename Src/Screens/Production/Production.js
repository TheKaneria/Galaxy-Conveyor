import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import colors from '../../Utils/colors';
import metrics from '../../Utils/metrics';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Productcom from '../../Components/Productcom';
import {Dropdown} from 'react-native-element-dropdown';
import SimpleToast from 'react-native-simple-toast';
import {useProductContext} from '../../Context/production_context';

const time = [
  {id: 1, name: 'Daily'},
  {id: 2, name: 'Monthly'},
  {id: 3, name: 'Current FY'},
];
const reporttype = [
  {id: 1, name: 'Daily Production'},
  {id: 2, name: 'Open Planning'},
];

const Production = props => {
  const [duration, setDuration] = useState(1);
  const [report, setReport] = useState(1);
  const [getcode, setCode] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const {
    GetProduct,
    product_loading,
    product_array,
    GetCodeData,
    code_array,
    Cleardata,
  } = useProductContext();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      GetCodeData(props);
    });
    return unsubscribe;
  }, [props]);

  const [getview, SetView] = useState(false);

  const Submit = () => {
    if (duration === '') {
      SimpleToast.show('Select Duration');
    } else if (report === '') {
      SimpleToast.show('Select Report');
    } else {
      const fromdata = new FormData();
      fromdata.append('report_type', report);
      fromdata.append('duration', duration);
      fromdata.append('item_id', getcode);
      GetProduct(props, fromdata);
      SetView(true);
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    Cleardata();
    setDuration(1);
    setReport(1);
    setCode('');
    SetView(false);
    GetCodeData(props)
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.themecolor} barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => props.navigation.goBack(null)}>
          <MaterialIcons
            name="arrow-back"
            size={25}
            color={colors.themecolor1}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Production Report</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.themecolor1]}
          />
        }>
        <View style={{}}>
          <Dropdown
            style={{
              height: 50,
              marginBottom: '5%',
              backgroundColor: '#fff',
              borderRadius: 8,
              paddingHorizontal: 8,
              marginTop: '5%',
              borderColor: colors.themecolor,
              borderWidth: 1,
              marginHorizontal: '2%',
            }}
            placeholderStyle={{
              paddingHorizontal: '3%',
              color: colors.themecolor,
              fontSize: 15,
              fontFamily: 'NunitoSans_10pt-SemiBold',
            }}
            selectedTextStyle={{
              color: colors.themecolor,
              fontSize: 16,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: '3%',
            }}
            dropdownPosition="auto"
            itemContainerStyle={{
              backgroundColor: colors.whitesomke,
              borderColor: colors.whitesomke,
            }}
            itemTextStyle={{
              color: colors.themecolor,
              fontFamily: 'NunitoSans_10pt-SemiBold',
            }}
            data={time}
            maxHeight={300}
            labelField="name"
            valueField="id"
            placeholder={'Select Duration'}
            value={duration}
            onChange={item => {
              setDuration(item.id);
            }}
          />
        </View>
        <View style={{}}>
          <Dropdown
            style={{
              height: 50,
              marginBottom: '2%',
              backgroundColor: '#fff',
              borderRadius: 8,
              paddingHorizontal: 8,
              // marginTop: '2%',
              borderColor: colors.themecolor,
              borderWidth: 1,
              marginHorizontal: '2%',
            }}
            placeholderStyle={{
              paddingHorizontal: '3%',
              color: colors.themecolor,
              fontSize: 15,
              fontFamily: 'NunitoSans_10pt-SemiBold',
            }}
            selectedTextStyle={{
              color: colors.themecolor,
              fontSize: 16,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: '3%',
            }}
            dropdownPosition="auto"
            itemContainerStyle={{
              backgroundColor: colors.whitesomke,
              borderColor: colors.whitesomke,
            }}
            itemTextStyle={{
              color: colors.themecolor,
              fontFamily: 'NunitoSans_10pt-SemiBold',
            }}
            data={reporttype}
            maxHeight={300}
            labelField="name"
            valueField="id"
            placeholder={'Select Report'}
            value={report}
            onChange={item => {
              setReport(item.id);
            }}
          />
        </View>

        <View style={{}}>
          <Dropdown
            style={{
              height: 50,
              marginBottom: '2%',
              backgroundColor: '#fff',
              borderRadius: 8,
              paddingHorizontal: 8,
              marginTop: '2%',
              borderColor: colors.themecolor,
              borderWidth: 1,
              marginHorizontal: '2%',
            }}
            placeholderStyle={{
              paddingHorizontal: '3%',
              color: colors.themecolor,
              fontSize: 15,
              fontFamily: 'NunitoSans_10pt-SemiBold',
            }}
            selectedTextStyle={{
              color: colors.themecolor,
              fontSize: 16,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: '3%',
            }}
            search
            searchPlaceholder="Search Item Code & Name"
            dropdownPosition="auto"
            itemContainerStyle={{
              backgroundColor: colors.whitesomke,
              borderColor: colors.whitesomke,
            }}
            itemTextStyle={{
              color: colors.themecolor,
              fontFamily: 'NunitoSans_10pt-SemiBold',
            }}
            data={code_array}
            maxHeight={300}
            labelField="item"
            valueField="id"
            placeholder={'Select Item Code & Name'}
            value={getcode}
            onChange={item => {
              setCode(item.id);
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            Submit();
          }}
          style={{
            backgroundColor: colors.themecolor,
            padding: '4%',
            paddingHorizontal: '5%',
            alignSelf: 'flex-end',
            marginHorizontal: '2%',
            borderRadius: 10,
          }}>
          {product_loading ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            <Text
              style={{
                color: colors.white,
                fontWeight: 'bold',
              }}>
              Load
            </Text>
          )}
        </TouchableOpacity>
        <FlatList
          data={product_array}
          contentContainerStyle={{
            justifyContent: 'space-between',
          }}
          initialNumToRender={20}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return <Productcom item={item} navigation={props.navigation} />;
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  alignItems: 'center',
                }}>
                {getview ? <Text>No Data Found...!!!</Text> : null}
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Production;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.themecolor,
    height: metrics.HEIGHT * 0.08,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: colors.white,
    fontFamily: 'NunitoSans_10pt-ExtraBold',
    fontSize: 20,
  },
  logoutButton: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
