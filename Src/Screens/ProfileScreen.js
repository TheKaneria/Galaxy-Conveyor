import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import colors from '../Utils/colors';
import metrics from '../Utils/metrics';
import {useLoginContext} from '../Context/login_context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import Modal from 'react-native-modal';
import {
  ACCEPT_HEADER,
  attendance_count_url,
  break_punch_in_url,
  break_punch_out_url,
  get_attendance_url,
  punch_in_url,
  punch_out_url,
} from '../Utils/BaseUrl';

const ProfileScreen = props => {
  const [getindex, SetIndex] = useState(1);
  const currentDate = new Date().toDateString();
  const currentTime = new Date().toLocaleTimeString();
  const {setLogout} = useLoginContext();
  const [modalopen, setModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      GetAttendance();
      GetAttendancecount();
    });

    return unsubscribe;
  }, [props]);

  const [getdata, SetData] = useState('');
  const [load, setload] = useState(false);

  const GetAttendance = async () => {
    setload(true);
    const Token = await AsyncStorage.getItem('token');

    axios
      .get(get_attendance_url, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
          setload(false);
        } else {
          if (res.data.success == 1) {
            SetData(res.data);
            setload(false);
          } else {
            setload(false);
          }
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  const [getcount, SetCount] = useState('');

  const GetAttendancecount = async () => {
    setModalOpen(false);
    setload(true);
    const Token = await AsyncStorage.getItem('token');
    const formdaata = new FormData('');
    formdaata.append('from_date', moment(getdate).format('YYYY-MM-DD'));
    formdaata.append('to_date', moment(getdate1).format('YYYY-MM-DD'));

    axios
      .post(attendance_count_url, formdaata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
          setload(false);
        } else {
          if (res.data.success == 1) {
            SetCount(res.data.data);
            setload(false);
            setModalOpen(false);
          } else {
            setload(false);
          }
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const Punchin = async () => {
    const Token = await AsyncStorage.getItem('token');
    setload(true);

    axios
      .get(punch_in_url, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(async res => {
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
          setload(false);
        } else {
          GetAttendance();
          setload(false);
        }
      })
      .catch(err => {
        console.log('err', err);
        setload(false);
      });
  };

  const BreakPunchIn = async () => {
    const Token = await AsyncStorage.getItem('token');
    setload(true);

    axios
      .get(break_punch_in_url, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(async res => {
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
          setload(false);
        } else {
          GetAttendance();
          setload(false);
        }
      })
      .catch(err => {
        console.log('err', err);
        setload(false);
      });
  };

  const BreakPunchOut = async () => {
    const Token = await AsyncStorage.getItem('token');
    setload(true);

    axios
      .get(break_punch_out_url, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(async res => {
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
          setload(false);
        } else {
          GetAttendance();
          setload(false);
        }
      })
      .catch(err => {
        console.log('err', err);
        setload(false);
      });
  };

  const PunchOut = async () => {
    const Token = await AsyncStorage.getItem('token');
    setload(true);

    axios
      .get(punch_out_url, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(async res => {
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
          setload(false);
        } else {
          GetAttendance();
          setload(false);
        }
      })
      .catch(err => {
        console.log('err', err);
        setload(false);
      });
  };

  const SETLOGOUT = () => {
    AsyncStorage.removeItem('islogin');
    AsyncStorage.removeItem('token');

    AsyncStorage.clear();
    setLogout(props);
  };
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

  const [isdatepicker1, setdatepicker1] = useState(false);
  const [getdate1, setdate1] = useState(new Date());

  const showdatepicker1 = () => {
    setdatepicker1(true);
  };

  const hidedatepicker1 = () => {
    setdatepicker1(false);
  };
  const handleConfirmdate1 = date => {
    setdate1(date);
    hidedatepicker1();
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
      <View
        style={{
          backgroundColor: colors.themecolor,
          height: metrics.HEIGHT * 0.08,
          paddingHorizontal: 20,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: colors.white,
            fontFamily: 'NunitoSans_10pt-ExtraBold',
            fontSize: 20,
          }}>
          PROFILE
        </Text>
      </View>

      {load === true ? (
        <ActivityIndicator
          color={colors.themecolor1}
          size="large"
          style={{flex: 1}}
        />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                backgroundColor: colors.white,
                elevation: 5,
                marginTop: metrics.HEIGHT * 0.02,
                marginHorizontal: '2%',
                borderRadius: 5,
                marginBottom: metrics.HEIGHT * 0.02,
              }}>
              <View
                style={{
                  padding: '5%',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: colors.black,
                    fontWeight: 'bold',
                  }}>
                  Choose your Work/Break Time{' '}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: '15%',
                  marginBottom: metrics.HEIGHT * 0.03,
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    SetIndex(1);
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor:
                      getindex == 1 ? '#c6e9fd' : colors.whitesomke,
                    padding: '4%',
                    borderRadius: 30,
                    paddingHorizontal: '10%',
                    elevation: getindex == 1 ? 5 : 0,
                  }}>
                  <MaterialCommunityIcons
                    name="office-building"
                    color={colors.themecolor}
                    size={25}
                  />
                  <Text
                    style={{
                      color: colors.black,
                      fontWeight: 'bold',
                    }}>
                    {' '}
                    Work
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    SetIndex(2);
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor:
                      getindex == 2 ? '#c6e9fd' : colors.whitesomke,
                    padding: '4%',
                    borderRadius: 30,
                    paddingHorizontal: '10%',
                    elevation: getindex == 2 ? 5 : 0,
                  }}>
                  <MaterialIcons
                    name="sentiment-very-satisfied"
                    color={colors.themecolor}
                    size={25}
                  />
                  <Text
                    style={{
                      color: colors.black,
                      fontWeight: 'bold',
                    }}>
                    {' '}
                    Break
                  </Text>
                </TouchableOpacity>
              </View>
              {getindex == 1 ? (
                <>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: colors.black,
                      fontWeight: 'bold',
                      marginBottom: metrics.HEIGHT * 0.01,
                    }}>
                    {currentDate} {currentTime}
                  </Text>

                  {getdata?.data?.punch_in === null ||
                  getdata?.data === null ? (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          Punchin();
                        }}
                        style={{
                          alignItems: 'center',
                          marginTop: '2%',

                          marginBottom: metrics.HEIGHT * 0.02,
                        }}>
                        <Image
                          source={require('../Assets/fingerprint.png')}
                          style={{
                            height: 100,
                            width: 100,
                          }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          color: colors.black,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          textTransform: 'capitalize',
                          marginBottom: metrics.HEIGHT * 0.02,
                        }}>
                        Tap To FingerPrint Start Your Work
                      </Text>
                    </>
                  ) : null}
                  {getdata?.data?.punch_out === null &&
                  getdata?.data?.break_punch_out !== null &&
                  getdata?.data?.break_punch_in !== null ? (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          PunchOut();
                        }}
                        style={{
                          alignItems: 'center',
                          marginTop: '2%',

                          marginBottom: metrics.HEIGHT * 0.02,
                        }}>
                        <Image
                          source={require('../Assets/fingerprint.png')}
                          style={{
                            height: 100,
                            width: 100,
                          }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          color: colors.black,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          textTransform: 'capitalize',
                          marginBottom: metrics.HEIGHT * 0.02,
                        }}>
                        End Your Work
                      </Text>
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',

                      marginBottom: metrics.HEIGHT * 0.01,
                    }}>
                    <Image
                      source={require('../Assets/Break.png')}
                      style={{
                        height: 100,
                        width: 100,
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: colors.black,
                      fontWeight: 'bold',
                      marginBottom: metrics.HEIGHT * 0.01,
                    }}>
                    {currentDate} {currentTime}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: '25%',
                      marginBottom: metrics.HEIGHT * 0.02,
                    }}>
                    {getdata?.data?.break_punch_out === null &&
                    getdata?.data?.break_punch_in !== null ? (
                      <TouchableOpacity
                        onPress={() => {
                          BreakPunchOut();
                        }}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: colors.white,
                          padding: '3%',
                          borderRadius: 30,
                          paddingHorizontal: '12%',
                          borderColor: '#c6e9fd',
                          borderWidth: 2,
                        }}>
                        <Text
                          style={{
                            color: colors.black,
                            fontWeight: 'bold',
                          }}>
                          {' '}
                          End
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                    {getdata?.data?.break_punch_in === null ? (
                      <TouchableOpacity
                        onPress={() => {
                          BreakPunchIn();
                        }}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: '#c6e9fd',
                          padding: '3%',
                          borderRadius: 30,
                          paddingHorizontal: '12%',
                        }}>
                        <Text
                          style={{
                            color: colors.black,
                            fontWeight: 'bold',
                          }}>
                          {' '}
                          Break
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </>
              )}
            </View>
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                marginHorizontal: '3%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: colors.themecolor,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                Attendance{' '}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.themecolor,
                  paddingHorizontal: '4%',
                  borderRadius: 15,
                }}
                onPress={() => {
                  setModalOpen(true);
                }}>
                <Text
                  style={{
                    color: colors.white,

                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  {moment(getdate).format('DD-MM-YYYY')}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: colors.themecolor,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                {' '}
                To{' '}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.themecolor,
                  paddingHorizontal: '4%',
                  borderRadius: 15,
                }}
                onPress={() => {
                  setModalOpen(true);
                }}>
                <Text
                  style={{
                    color: colors.white,

                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  {moment(getdate1).format('DD-MM-YYYY')}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: '5%',
                marginTop: metrics.HEIGHT * 0.02,
              }}>
              <View
                style={{
                  width: '45%',
                  height: metrics.HEIGHT * 0.12,
                  backgroundColor: '#D7EEE6',
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    marginHorizontal: '5%',
                    marginTop: metrics.HEIGHT * 0.02,
                    color: colors.black,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Total Attendance
                </Text>
                <Text
                  style={{
                    color: '#29BE8F',
                    fontWeight: 'bold',
                    alignSelf: 'flex-end',
                    marginHorizontal: '5%',
                    fontSize: 20,
                    marginTop: metrics.HEIGHT * 0.02,
                  }}>
                  {getcount ? getcount.total_attendance : ''}
                </Text>
              </View>
              <View
                style={{
                  width: '45%',
                  height: metrics.HEIGHT * 0.12,
                  backgroundColor: '#E0EBF4',
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    marginHorizontal: '5%',
                    marginTop: metrics.HEIGHT * 0.02,
                    color: colors.black,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Total Absents
                </Text>
                <Text
                  style={{
                    // color: '#29BE8F',
                    color: '#7A7AFE',
                    fontWeight: 'bold',
                    alignSelf: 'flex-end',
                    marginHorizontal: '5%',
                    fontSize: 20,
                    marginTop: metrics.HEIGHT * 0.02,
                  }}>
                  {getcount ? getcount.total_absent : ''}
                </Text>
              </View>
            </View>
            <Modal
              isVisible={modalopen}
              onBackdropPress={() => {
                setdate(new Date());
                setdate1(new Date());
                setModalOpen(false);
              }}
              onBackButtonPress={() => {
                setdate(new Date());
                setdate1(new Date());
                setModalOpen(false);
              }}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  width: metrics.WIDTH * 0.9,
                  backgroundColor: colors.white,

                  borderRadius: 10,
                }}>
                <View
                  style={{
                    backgroundColor: colors.themecolor,
                    padding: 12,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: colors.white,
                      fontFamily: 'Kanchenjunga-Bold',
                      fontSize: 16,
                    }}>
                    Select Date Range
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setdate(new Date());
                      setdate1(new Date());
                      setModalOpen(false);
                    }}>
                    <AntDesign name="close" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    marginTop: metrics.HEIGHT * 0.01,
                    paddingVertical: '2%',
                    paddingHorizontal: '2%',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Kanchenjunga-Bold',
                      fontSize: 16,
                      color: colors.themecolor,
                    }}>
                    From
                  </Text>
                </View>
                <View
                  style={{
                    marginHorizontal: '2%',
                    paddingVertical: '2%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: '2%',
                    borderRadius: 5,
                  }}>
                  <DateTimePickerModal
                    isVisible={isdatepicker}
                    mode="date"
                    maximumDate={new Date()}
                    onConfirm={handleConfirmdate}
                    onCancel={hidedatepicker}
                  />
                  <FontAwesome
                    name="calendar"
                    size={25}
                    style={{
                      color: colors.themecolor,
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      paddingVertical: '2%',
                    }}
                    onPress={showdatepicker}>
                    <Text
                      style={{
                        color: getdate ? colors.black : colors.black,
                        alignSelf: 'center',
                        marginHorizontal: '5%',
                        fontSize: 16,
                      }}>
                      {moment(getdate).format('DD/MM/YYYY') === 'Invalid date'
                        ? 'DD/MM/YYYY'
                        : moment(getdate).format('DD/MM/YYYY')}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    marginTop: metrics.HEIGHT * 0.01,
                    paddingVertical: '2%',
                    paddingHorizontal: '2%',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Kanchenjunga-Bold',
                      fontSize: 16,
                      color: colors.themecolor,
                    }}>
                    To
                  </Text>
                </View>
                <View
                  style={{
                    marginHorizontal: '2%',
                    paddingVertical: '2%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: '2%',
                    borderRadius: 5,
                  }}>
                  <DateTimePickerModal
                    isVisible={isdatepicker1}
                    maximumDate={new Date()}
                    mode="date"
                    onConfirm={handleConfirmdate1}
                    onCancel={hidedatepicker1}
                  />
                  <FontAwesome
                    name="calendar"
                    size={25}
                    style={{
                      color: colors.themecolor,
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      paddingVertical: '2%',
                    }}
                    onPress={showdatepicker1}>
                    <Text
                      style={{
                        color: getdate1 ? colors.black : colors.black,
                        alignSelf: 'center',
                        marginHorizontal: '5%',
                        fontSize: 16,
                      }}>
                      {moment(getdate1).format('DD/MM/YYYY') === 'Invalid date'
                        ? 'DD/MM/YYYY'
                        : moment(getdate1).format('DD/MM/YYYY')}
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    GetAttendancecount();
                  }}
                  style={{
                    marginTop: 30,
                    backgroundColor: colors.themecolor,
                    paddingVertical: 12,
                    borderRadius: 5,
                    alignItems: 'center',
                    marginHorizontal: metrics.WIDTH * 0.07,
                    marginBottom: 20,
                  }}>
                  <Text
                    style={{
                      color: colors.white,
                      fontFamily: 'Domine-Bold',
                      fontSize: 16,
                    }}>
                    SUBMIT
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              SETLOGOUT();
            }}
            style={{
              marginTop: metrics.HEIGHT * 0.04,
              backgroundColor: colors.themecolor,
              marginHorizontal: '25%',
              borderRadius: 10,
              paddingVertical: '4%',
              marginBottom: metrics.HEIGHT * 0.02,
              bottom: 5,
            }}>
            <Text
              style={{
                color: colors.white,
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 16,
              }}>
              LOGOUT
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
export default ProfileScreen;
