import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  PermissionsAndroid,
  Platform,
  Linking,
  ActivityIndicator,
} from 'react-native';
import colors from '../../Utils/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import metrics from '../../Utils/metrics';
import {Dropdown} from 'react-native-element-dropdown';
import Modal from 'react-native-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useTadaContext} from '../../Context/tada_context';
import SimpleToast from 'react-native-simple-toast';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ADDTadaScreen = props => {
  const {
    Getexpenselist,
    expenselist,
    ADDTadalist,
    UPDATETadalist,
    add_update_loading,
  } = useTadaContext();

  const [isedit, setIsEdit] = useState(false);
  const [getid, setId] = useState('');
  const [expense, setExpense] = useState('');
  const [amount, setAmount] = useState('');
  const [attachment, setAttachment] = useState('');
  const [isVisible, setisVisible] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [Type, settype] = useState('');
  const [fileName, setfileName] = useState('');
  const [imguri, seturi] = useState('');

  useEffect(() => {
    Getexpenselist(props);
    const item = props.route.params.item;
    if (item) {
      setId(item?.id);
      setExpense(item?.expense_head_id);
      setAmount(item?.amount);
      setAttachment(item?.attachment_full_path);
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [props]);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30,
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }

        setFilePath(response);
        seturi(response.assets[0].uri);
        settype(response.assets[0].type);
        setfileName(response.assets[0].fileName);
        setisVisible(!isVisible);
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 0.5,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }

      setFilePath(response);
      seturi(response.assets[0].uri);

      settype(response.assets[0].type);
      setfileName(response.assets[0].fileName);

      setisVisible(!isVisible);
    });
  };

  const validation = () => {
    if (!expense) {
      SimpleToast.show('Select Expense..!!');
    } else if (!amount) {
      SimpleToast.show('Enter Amount..!!');
    } else {
      if (isedit) {
        EditTada();
      } else {
        AddTaDa();
      }
    }
  };

  const AddTaDa = () => {
    const formdata = new FormData();
    formdata.append('expense_head_id', expense);
    formdata.append('amount', amount);
    if (imguri) {
      formdata.append('attachment', {
        uri: imguri,
        type: Type,
        name: fileName,
      });
    } else {
    }

    ADDTadalist(formdata, props);
  };

  const EditTada = () => {
    const formdata = new FormData();
    formdata.append('id', getid);
    formdata.append('expense_head_id', expense);
    formdata.append('amount', amount);
    if (imguri) {
      formdata.append('attachment', {
        uri: imguri,
        type: Type,
        name: fileName,
      });
    } else {
    }
    UPDATETadalist(formdata, props);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <StatusBar backgroundColor={colors.themecolor} barStyle="light-content" />
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
            width: 45,
            height: 45,
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
          {isedit ? 'EDIT TA/DA' : 'ADD TA/DA'}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{marginHorizontal: '2%', marginTop: metrics.HEIGHT * 0.02}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
            }}>
            Expense Head<Text style={{color: 'red'}}>*</Text>
          </Text>
        </View>
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
            data={expenselist}
            labelField="name"
            valueField="id"
            placeholder={'Select Expense'}
            value={expense}
            onChange={item => {
              setExpense(item.id);
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
            }}>
            Amount<Text style={{color: 'red'}}>*</Text>
          </Text>
        </View>
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
            placeholder="Enter Amount"
            placeholderTextColor={colors.black}
            style={{
              fontSize: 16,
              color: colors.black,
            }}
            keyboardType="number-pad"
            value={amount}
            onChangeText={text => {
              setAmount(text);
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
            }}>
            Bill Upload
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              // setSelectedImageType('panCard');
              setisVisible(true);
            }}
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              padding: '3%',
              marginTop: metrics.HEIGHT * 0.01,
              width: attachment ? '80%' : '95%',
            }}>
            <Text style={{color: colors.black}}>
              {fileName || 'Choose Image'}
            </Text>
          </TouchableOpacity>
          {attachment ? (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(attachment);
              }}
              style={{
                marginHorizontal: '1%',
                padding: '3%',
              }}>
              <FontAwesome
                name="download"
                size={30}
                color={colors.themecolor}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          validation();
        }}
        disabled={add_update_loading ? true : false}
        style={{
          marginTop: 30,
          backgroundColor: colors.themecolor,
          paddingVertical: 12,
          borderRadius: 5,
          alignItems: 'center',
          marginHorizontal: metrics.WIDTH * 0.07,
          marginBottom: 20,
        }}>
        {add_update_loading ? (
          <ActivityIndicator color={colors.white} size="small" />
        ) : (
          <Text
            style={{
              color: colors.white,
              fontFamily: 'Domine-Bold',
              fontSize: 16,
            }}>
            SUBMIT
          </Text>
        )}
      </TouchableOpacity>
      <Modal
        transparent={true}
        isVisible={isVisible}
        onBackButtonPress={() => setisVisible(false)}
        onBackdropPress={() => setisVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              padding: '5%',
              backgroundColor: colors.white,
              width: '100%',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  captureImage('photo');
                }}
                style={{
                  marginBottom: 5,
                  display: 'flex',
                  alignItems: 'center',
                  marginHorizontal: '10%',
                }}>
                <View>
                  <Image
                    source={require('../../Assets/camera_icon.png')}
                    style={{width: 80, height: 80}}
                  />
                </View>
                <View style={{marginTop: 5, marginBottom: 5}}>
                  <Text
                    style={{
                      color: colors.black,
                      fontFamily: 'Kanchenjunga-Bold',
                    }}>
                    Camera
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  chooseFile('photo');
                }}
                style={{
                  marginBottom: 5,
                  display: 'flex',
                  alignItems: 'center',
                  marginHorizontal: '10%',
                }}>
                <View>
                  <Image
                    source={require('../../Assets/gallary_icon.png')}
                    style={{width: 80, height: 80}}
                    resizeMode="contain"
                  />
                </View>
                <View style={{marginTop: 5, marginBottom: 5}}>
                  <Text
                    style={{
                      color: colors.black,
                      fontFamily: 'Kanchenjunga-Bold',
                    }}>
                    Gallery
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ADDTadaScreen;
