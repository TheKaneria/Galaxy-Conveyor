import {
  ActivityIndicator,
  Alert,
  BackHandler,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../Utils/colors';
import metrics from '../../Utils/metrics';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import moment from 'moment';
import {RadioButton} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useServicesContext} from '../../Context/services_context';
import SimpleToast from 'react-native-simple-toast';
import {useLeadContext} from '../../Context/Lead_context';
import Geolocation from 'react-native-geolocation-service';

const TYPE = [
  {id: 2, type: 'Custom', value: 'custom'},
  {id: 1, type: 'Master', value: 'master'},
];

const AddLeadScreen = props => {
  const {
    Customerlist,
    customer_array,
    Countrylist,
    country_array,
    Statelist,
    state_array,
    Citylist,
    city_array,
    Typeofcustomerlist,
    toc_array,
    Typeofindustry,
    toi_array,
    Zonelist,
    zone_array,
    Segmentlist,
    segment_array,
    Sourcelist,
    source_array,
    Stagelist,
    stage_array,
  } = useServicesContext();
  const {createLead, createlead_loading, updateLead} = useLeadContext();
  const [isedit, setIsEdit] = useState(false);
  const [mainid, setMainId] = useState('');

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {});
    return unsubscribe;
  }, [props]);

  useEffect(() => {
    requestLocationPermission();
    Customerlist(props);
    Countrylist(props);
    Typeofcustomerlist(props);
    Typeofindustry(props);
    Zonelist(props);
    Segmentlist(props);
    Sourcelist(props);
    Stagelist(props);
    const item = props.route.params.item;
    if (item) {
      setMainId(item.id);
      setdate(item?.date || new Date());
      setCustomerType(item?.customer_type);
      if (item?.customer_type == 1) {
        setCustomerid(item.master_customer || '');
      } else {
        setName(item?.custom_customer || '');
      }
      setAddress(item?.address1 || '');
      setAddress2(item?.address2 || '');
      setAddress3(item?.address3 || '');
      setCountry(item?.country || '');
      AddState(item?.country);
      setState(item?.state || '');
      AddCity(item?.state);
      setCity(item?.city || '');
      setPinCode(item?.pincode || '');
      setGstno(item?.gstin || '');
      setTypeOfCustomer(item?.type_of_customer_id || '');
      setTypeOfIndustry(item?.primary_type_of_industry_id || '');
      setZone(item?.zone || '');
      if (item?.segment) {
        const segmentArray = item.segment.split(',').map(item => item.trim());
        setSegment(segmentArray);
      } else {
        setSegment([]);
      }
      setLeadSource(item?.lead_source_id || '');
      setLeadStage(item?.lead_stage_id || '');
      setBusinessOpportunity(item?.probable_business_opportunity || '');
      setValue(item?.rating || '');
      setWebsite(item?.website || '');
      if (item?.leadchild && item.leadchild.length > 0) {
        const formatted = item.leadchild.map(item => ({
          opportunity: item.name ?? '',
          designation: item.designation ?? '',
          contact: item.number ?? '',
          email: item.email ?? '', // 👈 add
          numberLandline: item.number_landline ?? '',
        }));
        setContactPersons(formatted);
      } else {
        setContactPersons([
          {
            opportunity: '',
            designation: '',
            contact: '',
            email: '',
            numberLandline: '',
          },
        ]);
      }
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, []);

  const [isdatepicker, setdatepicker] = useState(false);
  const [getdate, setdate] = useState(new Date());

  const showdatepicker = () => {
    setdatepicker(true);
  };

  const hidedatepicker = () => {
    setdatepicker(false);
  };
  const handleConfirmdate = date => {
    setdate(date);
    hidedatepicker();
  };

  const [customerType, setCustomerType] = useState(2);
  const [customerid, setCustomerid] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPinCode] = useState('');
  const [gstno, setGstno] = useState('');
  const [typeofcustomer, setTypeOfCustomer] = useState('');
  const [typeofindustry, setTypeOfIndustry] = useState('');
  const [zone, setZone] = useState('');
  const [segment, setSegment] = useState([]);
  const [leadSource, setLeadSource] = useState('');
  const [leadStage, setLeadStage] = useState('');
  const [businessOpportunity, setBusinessOpportunity] = useState('');
  const [value, setValue] = useState('');
  const [location, setLocation] = useState(null);
  const [website, setWebsite] = useState('');
  const [contactPersons, setContactPersons] = useState([
    {
      opportunity: '',
      designation: '',
      contact: '',
      email: '',
      numberLandline: '',
    },
  ]);

  const handleAdd = () => {
    setContactPersons([
      ...contactPersons,
      {
        opportunity: '',
        designation: '',
        contact: '',
        email: '',
        numberLandline: '',
      },
    ]);
  };

  const handleRemove = index => {
    if (contactPersons.length > 1) {
      const updated = [...contactPersons];
      updated.splice(index, 1);
      setContactPersons(updated);
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...contactPersons];
    updated[index][field] = value;
    setContactPersons(updated);
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission denied');
        modal();
        return;
      }
      getLocation();
    } else {
      // Geolocation.requestAuthorization('always');
      // Geolocation.getCurrentPosition(
      //   async position => {
      //     await AsyncStorage.setItem(
      //       'lat',
      //       JSON.stringify(position.coords.latitude),
      //     );
      //     await AsyncStorage.setItem(
      //       'long',
      //       JSON.stringify(position.coords.longitude),
      //     );
      //     setLocation(position.coords);
      //     if (attendance_session_id || getattendid) {
      //       props.navigation.navigate('QRScannerOut');
      //     } else {
      //       props.navigation.navigate('Scan');
      //     }
      //   },
      //   error => {
      //     console.log(error.code, error.message);
      //     modal();
      //   },
      //   {
      //     enableHighAccuracy: true,
      //     timeout: 15000,
      //     maximumAge: 10000,
      //     showLocationDialog: true,
      //   },
      // );
      // return;
    }
  };

  const getLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          resolve,
          error => reject(new Error(error.message)),
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      });

      setLocation(position.coords);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const modal = () => {
    Alert.alert(
      'SORRY!',
      'Location permission is mandatory to find stores near your area.',
      [
        {
          text: 'Exit',
          onPress: () => BackHandler.exitApp(),
          style: 'cancel',
        },
        {text: 'Retry', onPress: () => requestLocationPermission()},
      ],
    );
  };

  const AddState = id => {
    const formadata = new FormData();
    formadata.append('country_id', id);
    Statelist(formadata, props);
  };

  const AddCity = id => {
    const formadata = new FormData();
    formadata.append('state_id', id);
    Citylist(formadata, props);
  };
  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  // const isValidLandline = number => {
  //   const landlineRegex = /^[0-9]{10}$/;
  //   return landlineRegex.test(number);
  // };
  const isValidWebsite = url => {
    const urlRegex =
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
    return urlRegex.test(url);
  };
  const checkLead = () => {
    if (!getdate) {
      SimpleToast.show('Select Date..!!!');
    } else if (!customerType) {
      SimpleToast.show('Select Customer Type..!!!');
    } else if (customerType == 1 && !customerid) {
      SimpleToast.show('Select Customer..!!!');
    } else if (customerType == 2 && !name) {
      SimpleToast.show('Enter Customer Name..!!!');
    } else if (!address) {
      SimpleToast.show('Enter Address1..!!!');
    } else if (!country) {
      SimpleToast.show('Select Country..!!!');
    } else if (!state) {
      SimpleToast.show('Select State..!!!');
    } else if (!city) {
      SimpleToast.show('Select City..!!!');
    } else if (!pincode) {
      SimpleToast.show('Enter Pincode..!!!');
    } else if (!typeofcustomer) {
      SimpleToast.show('Select Type Of Customer..!!!');
    } else if (!typeofindustry) {
      SimpleToast.show('Select Primary Type of Industry..!!!');
    } else if (!zone) {
      SimpleToast.show('Select Zone..!!!');
    } else if (segment.length == 0) {
      SimpleToast.show('Select Segment..!!!');
    } else if (!leadSource) {
      SimpleToast.show('Select Lead Source..!!!');
    } else if (!leadStage) {
      SimpleToast.show('Select Lead Stage..!!!');
    } else if (
      contactPersons.some(
        person =>
          person.email &&
          person.email.trim() !== '' &&
          !isValidEmail(person.email.trim()),
      )
    ) {
      SimpleToast.show('Enter Valid Email..!!!');
    } else if (
      website &&
      website.trim() !== '' &&
      !isValidWebsite(website.trim())
    ) {
      SimpleToast.show('Enter Valid Website..!!!');
    } else {
      if (isedit) {
        Editlead();
      } else {
        Addlead();
      }
    }
  };

  const Addlead = () => {
    const formadata = new FormData();
    formadata.append('date', moment(getdate).format('YYYY-MM-DD'));
    formadata.append('customer_type', customerType);
    if (customerType == 1) {
      formadata.append('master_customer', customerid);
    } else {
      formadata.append('custom_customer', name);
    }
    formadata.append('address1', address);
    formadata.append('address2', address2);
    formadata.append('address3', address3);
    formadata.append('country', country);
    formadata.append('state', state);
    formadata.append('city', city);
    formadata.append('pincode', pincode);
    formadata.append('gstin', gstno);
    formadata.append('type_of_customer_id', typeofcustomer);
    formadata.append('primary_type_of_industry_id', typeofindustry);
    formadata.append('zone', zone);
    for (let i = 0; i < segment.length; i++) {
      formadata.append('segment[' + i + ']', segment[i]);
    }
    formadata.append('lead_source_id', leadSource);
    formadata.append('lead_stage_id', leadStage);
    formadata.append('probable_business_opportunity', businessOpportunity);
    formadata.append('rating', value);
    formadata.append('website', website);
    for (let i = 0; i < contactPersons.length; i++) {
      formadata.append('name[' + i + ']', contactPersons[i].opportunity);
      formadata.append('designation[' + i + ']', contactPersons[i].designation);
      formadata.append('number[' + i + ']', contactPersons[i].contact);
      formadata.append('email[' + i + ']', contactPersons[i].email);
      formadata.append(
        'number_landline[' + i + ']',
        contactPersons[i].numberLandline,
      );
    }
    formadata.append('latitude', location.latitude);
    formadata.append('longitude', location.longitude);

    // console.log('formadata', JSON.stringify(formadata, null, 2));

    createLead(formadata, props);
  };

  const Editlead = () => {
    const formadata = new FormData();
    formadata.append('id', mainid);
    formadata.append('date', moment(getdate).format('YYYY-MM-DD'));
    formadata.append('customer_type', customerType);
    if (customerType == 1) {
      formadata.append('master_customer', customerid);
    } else {
      formadata.append('custom_customer', name);
    }
    formadata.append('address1', address);
    formadata.append('address2', address2);
    formadata.append('address3', address3);
    formadata.append('country', country);
    formadata.append('state', state);
    formadata.append('city', city);
    formadata.append('pincode', pincode);
    formadata.append('gstin', gstno);
    formadata.append('type_of_customer_id', typeofcustomer);
    formadata.append('primary_type_of_industry_id', typeofindustry);
    formadata.append('zone', zone);
    for (let i = 0; i < segment.length; i++) {
      formadata.append('segment[' + i + ']', segment[i]);
    }
    formadata.append('lead_source_id', leadSource);
    formadata.append('lead_stage_id', leadStage);
    formadata.append('probable_business_opportunity', businessOpportunity);
    formadata.append('rating', value);
    formadata.append('website', website);
    for (let i = 0; i < contactPersons.length; i++) {
      formadata.append('name[' + i + ']', contactPersons[i].opportunity);
      formadata.append('designation[' + i + ']', contactPersons[i].designation);
      formadata.append('number[' + i + ']', contactPersons[i].contact);
      formadata.append('email[' + i + ']', contactPersons[i].email);
      formadata.append(
        'number_landline[' + i + ']',
        contactPersons[i].numberLandline,
      );
    }
    formadata.append('latitude', location.latitude);
    formadata.append('longitude', location.longitude);

    updateLead(formadata, props);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <StatusBar
        backgroundColor={colors.themecolor}
        barStyle={'light-content'}
      />
      <ScrollView>
        <View
          style={{
            backgroundColor: colors.themecolor,
            height: metrics.HEIGHT * 0.08,
            paddingHorizontal: 20,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 45,
              backgroundColor: colors.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => props.navigation.goBack(null)}>
            <MaterialIcons
              name="arrow-back"
              size={25}
              color={colors.themecolor1}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: colors.white,
              fontFamily: 'NunitoSans_10pt-ExtraBold',
              fontSize: 20,
            }}>
            {isedit ? 'EDIT LEAD' : 'ADD LEAD'}
          </Text>
        </View>

        <View
          style={{marginHorizontal: '2%', marginTop: metrics.HEIGHT * 0.02}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Date<Text style={{color: 'red'}}>*</Text>
          </Text>
          <TouchableOpacity
            onPress={showdatepicker}
            style={{
              height: 50,
              marginBottom: '5%',
              backgroundColor: '#fff',
              borderRadius: 8,
              paddingHorizontal: 8,
              marginTop: '2%',
              borderColor: colors.themecolor,
              borderWidth: 1,
              marginHorizontal: '2%',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: getdate ? colors.black : colors.black,
                marginHorizontal: '2%',
                fontSize: 16,
              }}>
              {moment(getdate).format('DD/MM/YYYY') === 'Invalid date'
                ? 'DD/MM/YYYY'
                : moment(getdate).format('DD/MM/YYYY')}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isdatepicker}
            mode="date"
            onConfirm={handleConfirmdate}
            onCancel={hidedatepicker}
          />
        </View>
        <View
          style={{marginHorizontal: '2%', marginTop: metrics.HEIGHT * 0.01}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Customer Type<Text style={{color: 'red'}}>*</Text>
          </Text>
          <View style={{}}>
            <Dropdown
              style={{
                height: 50,
                marginBottom: '5%',
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
                color: colors.black,
                fontSize: 16,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                paddingHorizontal: '3%',
              }}
              dropdownPosition="auto"
              itemContainerStyle={{
                backgroundColor: colors.whitesomke,
              }}
              itemTextStyle={{
                color: colors.themecolor,
                fontFamily: 'NunitoSans_10pt-SemiBold',
              }}
              data={TYPE}
              labelField="type"
              valueField="id"
              placeholder={'Select Type'}
              value={customerType}
              onChange={item => {
                setCustomerType(item.id);
                setCustomerid('');
                setAddress('');
                setAddress2('');
                setAddress3('');
                setCountry('');
                setState('');
                setCity('');
                setPinCode('');
                setGstno('');
                setName('');
              }}
            />
          </View>
        </View>
        <View
          style={{marginHorizontal: '2%', marginTop: metrics.HEIGHT * 0.01}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Customer<Text style={{color: 'red'}}>*</Text>
          </Text>
          {customerType == 1 ? (
            <View style={{}}>
              <Dropdown
                style={{
                  height: 50,
                  marginBottom: '5%',
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
                  color: colors.black,
                  fontSize: 16,
                  fontFamily: 'NunitoSans_10pt-SemiBold',
                  paddingHorizontal: '3%',
                }}
                dropdownPosition="auto"
                itemContainerStyle={{
                  backgroundColor: colors.whitesomke,
                }}
                itemTextStyle={{
                  color: colors.themecolor,
                  fontFamily: 'NunitoSans_10pt-SemiBold',
                }}
                search
                searchPlaceholder="Search Customer Name"
                data={customer_array}
                labelField="customer_name"
                valueField="customer_name"
                placeholder={'Select Customer'}
                value={customerid}
                onChange={item => {
                  setCustomerid(item.customer_name);
                  setAddress(item.address1);
                  setAddress2(item.address2);
                  setAddress3(item.address3);
                  setCountry(Number(item?.country));
                  AddState(Number(item?.country));
                  setState(Number(item?.state));
                  AddCity(Number(item?.state));
                  setCity(Number(item?.city));
                  setPinCode(item?.pincode);
                  setGstno(item?.gstin);
                }}
              />
            </View>
          ) : null}
          {customerType == 2 ? (
            <View
              style={{
                marginHorizontal: '2%',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: colors.themecolor,
                marginTop: '2%',
                marginBottom: '5%',
              }}>
              <TextInput
                placeholder="Enter Customer Name"
                placeholderTextColor={colors.black}
                style={{
                  fontSize: 16,
                  color: colors.black,
                }}
                keyboardType="default"
                value={name}
                onChangeText={text => {
                  setName(text);
                }}
              />
            </View>
          ) : null}
        </View>
        <View
          style={{marginHorizontal: '2%', marginTop: metrics.HEIGHT * 0.01}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Address 1<Text style={{color: 'red'}}>*</Text>
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
            }}>
            <TextInput
              placeholder="Enter Address"
              placeholderTextColor={colors.black}
              style={{
                fontSize: 16,
                color: colors.black,
              }}
              keyboardType="default"
              value={address}
              onChangeText={text => {
                setAddress(text);
              }}
            />
          </View>
        </View>
        <View
          style={{marginHorizontal: '2%', marginTop: metrics.HEIGHT * 0.01}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Address 2
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
            }}>
            <TextInput
              placeholder="Enter Address 2"
              placeholderTextColor={colors.black}
              style={{
                fontSize: 16,
                color: colors.black,
              }}
              keyboardType="default"
              value={address2}
              onChangeText={text => {
                setAddress2(text);
              }}
            />
          </View>
        </View>
        <View
          style={{marginHorizontal: '2%', marginTop: metrics.HEIGHT * 0.01}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Address 3
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
            }}>
            <TextInput
              placeholder="Enter Address 3"
              placeholderTextColor={colors.black}
              style={{
                fontSize: 16,
                color: colors.black,
              }}
              keyboardType="default"
              value={address3}
              onChangeText={text => {
                setAddress3(text);
              }}
            />
          </View>
        </View>
        <View
          style={{marginHorizontal: '2%', marginTop: metrics.HEIGHT * 0.01}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Country<Text style={{color: 'red'}}>*</Text>
          </Text>
          <Dropdown
            style={{
              height: 50,
              marginBottom: '5%',
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
              color: colors.black,
              fontSize: 16,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: '3%',
            }}
            dropdownPosition="auto"
            itemContainerStyle={{
              backgroundColor: colors.whitesomke,
            }}
            itemTextStyle={{
              color: colors.themecolor,
              fontFamily: 'NunitoSans_10pt-SemiBold',
            }}
            search
            searchPlaceholder="Search Country Name"
            data={country_array}
            labelField="name"
            valueField="id"
            placeholder={'Select Country'}
            value={country}
            onChange={item => {
              setCountry(item.id);
              AddState(item.id);
            }}
          />
        </View>
        <View
          style={{marginHorizontal: '2%', marginTop: metrics.HEIGHT * 0.01}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            State<Text style={{color: 'red'}}>*</Text>
          </Text>
          <Dropdown
            style={{
              height: 50,
              marginBottom: '5%',
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
              color: colors.black,
              fontSize: 16,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: '3%',
            }}
            dropdownPosition="auto"
            itemContainerStyle={{
              backgroundColor: colors.whitesomke,
            }}
            itemTextStyle={{
              color: colors.themecolor,
              fontFamily: 'NunitoSans_10pt-SemiBold',
            }}
            search
            searchPlaceholder="Search State Name"
            data={state_array}
            labelField="name"
            valueField="id"
            placeholder={'Select State'}
            value={state}
            onChange={item => {
              setState(item.id);
              AddCity(item.id);
            }}
          />
        </View>
        <View
          style={{marginHorizontal: '2%', marginTop: metrics.HEIGHT * 0.01}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            City<Text style={{color: 'red'}}>*</Text>
          </Text>
          <Dropdown
            style={{
              height: 50,
              marginBottom: '5%',
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
              color: colors.black,
              fontSize: 16,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: '3%',
            }}
            dropdownPosition="auto"
            itemContainerStyle={{
              backgroundColor: colors.whitesomke,
            }}
            itemTextStyle={{
              color: colors.themecolor,
              fontFamily: 'NunitoSans_10pt-SemiBold',
            }}
            search
            searchPlaceholder="Search City Name"
            data={city_array}
            labelField="name"
            valueField="id"
            placeholder={'Select City'}
            value={city}
            onChange={item => {
              setCity(item.id);
            }}
          />
        </View>

        <View
          style={{marginHorizontal: '2%', marginTop: metrics.HEIGHT * 0.01}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Pin Code<Text style={{color: 'red'}}>*</Text>
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
            }}>
            <TextInput
              placeholder="Enter Pin Code"
              placeholderTextColor={colors.black}
              style={{
                fontSize: 16,
                color: colors.black,
              }}
              keyboardType="number-pad"
              value={pincode}
              onChangeText={text => {
                setPinCode(text);
              }}
            />
          </View>
        </View>
        <View
          style={{marginHorizontal: '2%', marginTop: metrics.HEIGHT * 0.01}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            GST No.
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
            }}>
            <TextInput
              placeholder="Enter GST No."
              placeholderTextColor={colors.black}
              style={{
                fontSize: 16,
                color: colors.black,
              }}
              keyboardType="default"
              value={gstno}
              onChangeText={text => {
                setGstno(text);
              }}
            />
          </View>
        </View>

        <View
          style={{marginHorizontal: '2%', marginTop: metrics.HEIGHT * 0.01}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Type of Customer<Text style={{color: 'red'}}>*</Text>
          </Text>
          <View style={{}}>
            <Dropdown
              style={{
                height: 50,
                marginBottom: '5%',
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
                color: colors.black,
                fontSize: 16,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                paddingHorizontal: '3%',
              }}
              dropdownPosition="auto"
              itemContainerStyle={{
                backgroundColor: colors.whitesomke,
              }}
              itemTextStyle={{
                color: colors.themecolor,
                fontFamily: 'NunitoSans_10pt-SemiBold',
              }}
              search
              searchPlaceholder="Search"
              data={toc_array}
              labelField="name"
              valueField="id"
              placeholder={'Select'}
              value={typeofcustomer}
              onChange={item => {
                setTypeOfCustomer(item.id);
              }}
            />
          </View>
        </View>
        <View
          style={{marginHorizontal: '2%', marginTop: metrics.HEIGHT * 0.01}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Primary Type Of Industry<Text style={{color: 'red'}}>*</Text>
          </Text>
          <View style={{}}>
            <Dropdown
              style={{
                height: 50,
                marginBottom: '5%',
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
                color: colors.black,
                fontSize: 16,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                paddingHorizontal: '3%',
              }}
              dropdownPosition="auto"
              itemContainerStyle={{
                backgroundColor: colors.whitesomke,
              }}
              itemTextStyle={{
                color: colors.themecolor,
                fontFamily: 'NunitoSans_10pt-SemiBold',
              }}
              search
              searchPlaceholder="Search"
              data={toi_array}
              labelField="name"
              valueField="id"
              placeholder={'Select'}
              value={typeofindustry}
              onChange={item => {
                setTypeOfIndustry(item.id);
              }}
            />
          </View>
        </View>
        <View
          style={{marginHorizontal: '2%', marginTop: metrics.HEIGHT * 0.01}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Zone<Text style={{color: 'red'}}>*</Text>
          </Text>
          <View style={{}}>
            <Dropdown
              style={{
                height: 50,
                marginBottom: '5%',
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
                color: colors.black,
                fontSize: 16,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                paddingHorizontal: '3%',
              }}
              dropdownPosition="auto"
              itemContainerStyle={{
                backgroundColor: colors.whitesomke,
              }}
              itemTextStyle={{
                color: colors.themecolor,
                fontFamily: 'NunitoSans_10pt-SemiBold',
              }}
              search
              searchPlaceholder="Search"
              data={zone_array}
              labelField="zone"
              valueField="zone"
              placeholder={'Select'}
              value={zone}
              onChange={item => {
                setZone(item.zone);
              }}
            />
          </View>
        </View>
        <View
          style={{marginHorizontal: '2%', marginTop: metrics.HEIGHT * 0.01}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Segment<Text style={{color: 'red'}}>*</Text>
          </Text>
          <View style={{}}>
            <MultiSelect
              style={{
                height: 50,
                marginBottom: '5%',
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
                color: colors.black,
                fontSize: 16,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                paddingHorizontal: '3%',
              }}
              dropdownPosition="auto"
              itemContainerStyle={{
                backgroundColor: colors.whitesomke,
              }}
              itemTextStyle={{
                color: colors.themecolor,
                fontFamily: 'NunitoSans_10pt-SemiBold',
              }}
              activeColor={'#87b1ed'}
              search
              searchPlaceholder="Search"
              data={segment_array}
              labelField="segment"
              valueField="segment"
              placeholder={'Select'}
              value={segment}
              onChange={item => {
                setSegment(item);
              }}
            />
          </View>
        </View>
        <View
          style={{marginHorizontal: '2%', marginTop: metrics.HEIGHT * 0.01}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Lead Source<Text style={{color: 'red'}}>*</Text>
          </Text>
          <View style={{}}>
            <Dropdown
              style={{
                height: 50,
                marginBottom: '5%',
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
                color: colors.black,
                fontSize: 16,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                paddingHorizontal: '3%',
              }}
              dropdownPosition="auto"
              itemContainerStyle={{
                backgroundColor: colors.whitesomke,
              }}
              itemTextStyle={{
                color: colors.themecolor,
                fontFamily: 'NunitoSans_10pt-SemiBold',
              }}
              data={source_array}
              labelField="name"
              valueField="id"
              placeholder={'Select'}
              value={leadSource}
              onChange={item => {
                setLeadSource(item.id);
              }}
            />
          </View>
        </View>
        <View
          style={{marginHorizontal: '2%', marginTop: metrics.HEIGHT * 0.01}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Lead Stage<Text style={{color: 'red'}}>*</Text>
          </Text>
          <View style={{}}>
            <Dropdown
              style={{
                height: 50,
                marginBottom: '5%',
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
                color: colors.black,
                fontSize: 16,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                paddingHorizontal: '3%',
              }}
              dropdownPosition="auto"
              itemContainerStyle={{
                backgroundColor: colors.whitesomke,
              }}
              itemTextStyle={{
                color: colors.themecolor,
                fontFamily: 'NunitoSans_10pt-SemiBold',
              }}
              data={stage_array}
              labelField="name"
              valueField="id"
              placeholder={'Select'}
              value={leadStage}
              onChange={item => {
                setLeadStage(item.id);
              }}
            />
          </View>
        </View>

        <View
          style={{marginHorizontal: '2%', marginTop: metrics.HEIGHT * 0.01}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Probable Business Opportunity
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
            }}>
            <TextInput
              placeholder="Probable Business Opportunity"
              placeholderTextColor={colors.black}
              style={{
                fontSize: 16,
                color: colors.black,
              }}
              keyboardType="default"
              value={businessOpportunity}
              onChangeText={text => {
                setBusinessOpportunity(text);
              }}
            />
          </View>
        </View>
        <View
          style={{marginHorizontal: '2%', marginTop: metrics.HEIGHT * 0.01}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Rating
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              marginTop: '2%',
              marginBottom: '5%',
            }}>
            <RadioButton.Group
              onValueChange={newValue => setValue(newValue)}
              value={value}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 10,
                  }}>
                  <RadioButton value="A" />
                  <Text style={{fontWeight: 'bold', color: colors.black}}>
                    A
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 10,
                  }}>
                  <RadioButton value="B" />
                  <Text style={{fontWeight: 'bold', color: colors.black}}>
                    B
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="C" />
                  <Text style={{fontWeight: 'bold', color: colors.black}}>
                    C
                  </Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
        </View>
        <View
          style={{marginHorizontal: '2%', marginTop: metrics.HEIGHT * 0.01}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Website
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
            }}>
            <TextInput
              placeholder="Enter Website"
              placeholderTextColor={colors.black}
              style={{fontSize: 16, color: colors.black}}
              keyboardType="default"
              value={website}
              onChangeText={text => {
                setWebsite(text);
              }}
            />
          </View>
        </View>
        <View
          style={{marginHorizontal: '2%', marginTop: metrics.HEIGHT * 0.005}}>
          {contactPersons.map((person, index) => (
            <View
              key={index}
              style={{
                marginBottom: 20,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: colors.themecolor,
                padding: 8,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    color: colors.themecolor,
                    fontSize: 18,
                    fontFamily: 'NunitoSans_10pt-SemiBold',
                  }}>
                  Contact Person<Text style={{color: 'red'}}>*</Text>
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity onPress={handleAdd}>
                    <Ionicons
                      name="add-circle-outline"
                      size={24}
                      color={colors.themecolor}
                    />
                  </TouchableOpacity>
                  {contactPersons.length > 1 && (
                    <TouchableOpacity
                      onPress={() => handleRemove(index)}
                      style={{marginLeft: 10}}>
                      <Ionicons
                        name="remove-circle-outline"
                        size={24}
                        color="red"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Opportunity Field */}
              <View
                style={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: colors.themecolor,
                  marginBottom: '5%',
                  paddingHorizontal: 8,
                }}>
                <TextInput
                  placeholder="Enter Contact Person Name"
                  placeholderTextColor={colors.black}
                  style={{fontSize: 16, color: colors.black}}
                  value={person.opportunity}
                  onChangeText={text =>
                    handleChange(index, 'opportunity', text)
                  }
                />
              </View>

              {/* Designation Field */}
              <Text
                style={{
                  color: colors.themecolor,
                  fontSize: 18,
                  fontFamily: 'NunitoSans_10pt-SemiBold',
                  paddingHorizontal: 8,
                }}>
                Designation
              </Text>
              <View
                style={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: colors.themecolor,
                  marginTop: '2%',
                  marginBottom: '5%',
                  paddingHorizontal: 8,
                }}>
                <TextInput
                  placeholder="Enter Designation"
                  placeholderTextColor={colors.black}
                  style={{fontSize: 16, color: colors.black}}
                  value={person.designation}
                  onChangeText={text =>
                    handleChange(index, 'designation', text)
                  }
                />
              </View>

              {/* Contact Field */}
              <Text
                style={{
                  color: colors.themecolor,
                  fontSize: 18,
                  fontFamily: 'NunitoSans_10pt-SemiBold',
                  paddingHorizontal: 8,
                }}>
                Contact No.
              </Text>

              <View
                style={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: colors.themecolor,
                  marginTop: '2%',
                  marginBottom: '5%',
                  paddingHorizontal: 8,
                }}>
                <TextInput
                  placeholder="Enter Contact No."
                  placeholderTextColor={colors.black}
                  style={{fontSize: 16, color: colors.black}}
                  keyboardType="phone-pad"
                  value={person.contact}
                  onChangeText={text => handleChange(index, 'contact', text)}
                />
              </View>
              {/* Email Field */}
              <Text
                style={{
                  color: colors.themecolor,
                  fontSize: 18,
                  fontFamily: 'NunitoSans_10pt-SemiBold',
                  paddingHorizontal: 8,
                }}>
                Email
              </Text>
              <View
                style={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: colors.themecolor,
                  marginTop: '2%',
                  marginBottom: '5%',
                  paddingHorizontal: 8,
                }}>
                <TextInput
                  placeholder="Enter Email"
                  placeholderTextColor={colors.black}
                  style={{fontSize: 16, color: colors.black}}
                  keyboardType="email-address"
                  value={person.email}
                  onChangeText={text => handleChange(index, 'email', text)}
                />
              </View>

              {/* Landline Field */}
              <Text
                style={{
                  color: colors.themecolor,
                  fontSize: 18,
                  fontFamily: 'NunitoSans_10pt-SemiBold',
                  paddingHorizontal: 8,
                }}>
                Landline No.
              </Text>
              <View
                style={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: colors.themecolor,
                  marginTop: '2%',
                  marginBottom: '5%',
                  paddingHorizontal: 8,
                }}>
                <TextInput
                  placeholder="Enter Landline No."
                  placeholderTextColor={colors.black}
                  style={{fontSize: 16, color: colors.black}}
                  keyboardType="phone-pad"
                  value={person.numberLandline}
                  onChangeText={text =>
                    handleChange(index, 'numberLandline', text)
                  }
                />
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => {
            checkLead();
          }}
          disabled={createlead_loading ? true : false}
          style={{
            marginTop: metrics.HEIGHT * 0.04,
            backgroundColor: colors.themecolor,
            marginHorizontal: '25%',
            borderRadius: 10,
            paddingVertical: '4%',
            marginBottom: metrics.HEIGHT * 0.02,
            bottom: 5,
          }}>
          {createlead_loading ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            <Text
              style={{
                color: colors.white,
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 16,
              }}>
              SUBMIT
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddLeadScreen;

const styles = StyleSheet.create({});
