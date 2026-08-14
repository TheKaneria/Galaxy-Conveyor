import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Platform,
  PermissionsAndroid,
  Alert,
  BackHandler,
} from 'react-native';
import colors from '../../Utils/colors';
import metrics from '../../Utils/metrics';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useLeadContext} from '../../Context/Lead_context';
import Modal from 'react-native-modal';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import SimpleToast from 'react-native-simple-toast';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Geolocation from 'react-native-geolocation-service';
import {useFocusEffect} from '@react-navigation/native';

const FollowUpDATA = [
  {id: 1, name: 'Pending'},
  {id: 2, name: 'Next Follow-Up'},
  {id: 3, name: 'Interested'},
  {id: 4, name: 'Not Interested'},
  {id: 5, name: 'Cancelled'},
];

const LeadScreen = props => {
  const {
    GetLeadList,
    leadlist,
    lead_loading,
    Getsalesperson,
    salespersonlist,
    DeleteApi,
    deletelead_loading,
    AddAssign,
    assign_loading,
    AddCollaborator,
    collab_loading,
    AddFollowUp,
    followup_loading,
    startmeeting,
    startmeeting_loading,
    endmeeting,
    endmeeting_loading,
    unAssign,
    cancel_assign_loading,
    Removecollaborator,
    remove_collaborator_loading,
    Convertcustomer,
    convert_customer_loading,
  } = useLeadContext();
  const [deletemodal, setDeleteModal] = useState(false);

  const [followupmodal, setFollowUpModal] = useState(false);
  const [followupstatus, setFollowUpStatus] = useState(1);

  const [assignmodal, setAssignModal] = useState(false);
  const [assignstatus, setassignStatus] = useState('');

  const [collaboratormodal, setCollaboratorModal] = useState(false);
  const [collaboratorstatus, setCollaboratorStatus] = useState('');

  const [removeassignmodal, setRemoveAssignModal] = useState(false);
  const [removecollaboratornmodal, setRemoveCollaboratorModal] =
    useState(false);
  const [consvertcustomermodal, setConsvertCustomerModal] = useState(false);

  const [getcancelreason, setCancelReason] = useState('');
  const [getremark, setRemark] = useState('');

  const [meetingmodal, setMeetingModal] = useState(false);
  const [starttime, setStartTime] = useState('');
  const [endtime, setEndTime] = useState('');
  const [time, setTime] = useState('');

  const [mainid, setMainId] = useState('');
  const PAGE_SIZE = 10;
  const [page, setpage] = useState(1);
  const [gettempdata, settempdata] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  useFocusEffect(
    useCallback(() => {
      GetLeadList(props);
      Getsalesperson(props);
    }, []),
  );
  useEffect(() => {
    console.log('=== LEAD LIST COUNT ===', leadlist?.length);
  }, [leadlist]);

  useEffect(() => {
    if (leadlist && leadlist.length > 0) {
      settempdata(leadlist.slice(0, PAGE_SIZE));
      setpage(1);
    } else {
      settempdata([]);
      setpage(1);
    }
  }, [leadlist]);

  useEffect(() => {
    if (!meetingmodal) return;

    const updateClock = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // Set to false for 24-hour format
      });
      setTime(formattedTime);
    };

    updateClock(); // initial call
    const intervalId = setInterval(updateClock, 1000); // update every second

    return () => clearInterval(intervalId); // cleanup
  }, [meetingmodal]);

  const noDataFoundView = () => {
    return (
      <>
        <View
          style={{
            flex: 1,
            height: metrics.HEIGHT * 0.65,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View style={{alignSelf: 'center'}}>
            <AntDesign name="frowno" color={colors.black} size={28} />
          </View>

          <Text
            style={{
              alignSelf: 'center',
              color: colors.black,
              fontSize: 15,
              marginTop: metrics.HEIGHT * 0.1,
            }}>
            Oops, we didn't found any data right now.
          </Text>
        </View>
      </>
    );
  };

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <View
          style={{
            backgroundColor: colors.whitesomke,

            borderRadius: 10,
            paddingVertical: 2,
            //   elevation: 3,
            marginBottom: metrics.HEIGHT * 0.02,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: '3%',
              marginTop: metrics.HEIGHT * 0.01,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome name="hashtag" color={colors.themecolor} size={14} />
              <Text
                style={{
                  color: colors.black,
                  fontFamily: 'NunitoSans_10pt-ExtraBold',
                  fontSize: 14,
                }}>
                {' '}
                {item?.id || ''}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome
                name="calendar"
                color={colors.themecolor}
                size={14}
              />
              <Text
                style={{
                  color: colors.black,
                  fontFamily: 'NunitoSans_10pt-ExtraBold',
                  fontSize: 14,
                }}>
                {' '}
                {item?.date ? moment(item?.date).format('DD-MM-YYYY') : ''}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: '2%',
              marginTop: metrics.HEIGHT * 0.015,
            }}>
            <Text
              style={{
                color: colors.themecolor,
                fontFamily: 'NunitoSans_10pt-ExtraBold',
                fontSize: 16,
              }}>
              Customer Name :{' '}
            </Text>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'NunitoSans_10pt-ExtraBold',
                fontSize: 16,
                width: '60%',
              }}>
              {item?.master_customer
                ? item?.master_customer
                : item?.custom_customer
                ? item?.custom_customer
                : ''}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: '2%',
              marginTop: metrics.HEIGHT * 0.015,
            }}>
            {item?.lead_assign_sales_person_id ? (
              <>
                <Text
                  style={{
                    color: colors.themecolor,
                    fontFamily: 'NunitoSans_10pt-ExtraBold',
                    fontSize: 16,
                  }}>
                  Assign To :{' '}
                </Text>

                <Text
                  style={{
                    color: colors.black,
                    fontFamily: 'NunitoSans_10pt-ExtraBold',
                    fontSize: 16,
                  }}>
                  {item?.assign_to?.name || ''}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setMainId(item?.id);
                    setRemoveAssignModal(true);
                  }}
                  style={{
                    marginHorizontal: '2%',
                  }}>
                  <MaterialIcons
                    name="cancel"
                    color={colors.themecolor1}
                    size={25}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setMainId(item?.id);
                  setAssignModal(true);
                }}
                style={{
                  borderRadius: 20,
                  backgroundColor: colors.themecolor,
                  padding: 5,
                  elevation: 2,
                  paddingHorizontal: '4%',
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontFamily: 'NunitoSans_10pt-ExtraBold',
                    fontSize: 16,
                  }}>
                  Click to Assign
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: '2%',
              marginTop: metrics.HEIGHT * 0.015,
            }}>
            {item?.lead_collaborator_sales_person_id ? (
              <>
                <Text
                  style={{
                    color: colors.themecolor,
                    fontFamily: 'NunitoSans_10pt-ExtraBold',
                    fontSize: 16,
                  }}>
                  Collaborator To :{' '}
                </Text>

                <Text
                  style={{
                    color: colors.black,
                    fontFamily: 'NunitoSans_10pt-ExtraBold',
                    fontSize: 16,
                  }}>
                  {item?.collaborator_to?.name || ''}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setMainId(item?.id);
                    setRemoveCollaboratorModal(true);
                  }}
                  style={{
                    marginHorizontal: '2%',
                  }}>
                  <MaterialIcons
                    name="cancel"
                    color={colors.themecolor1}
                    size={25}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setMainId(item?.id);
                  setCollaboratorModal(true);
                }}
                style={{
                  borderRadius: 20,
                  backgroundColor: '#5867DD',
                  padding: 5,
                  elevation: 2,
                  paddingHorizontal: '4%',
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontFamily: 'NunitoSans_10pt-ExtraBold',
                    fontSize: 16,
                  }}>
                  Click to add Collaborator
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: '2%',
              marginTop: metrics.HEIGHT * 0.015,
            }}>
            <Text
              style={{
                color: colors.themecolor,
                fontFamily: 'NunitoSans_10pt-ExtraBold',
                fontSize: 16,
              }}>
              Follow-Up Status :{' '}
            </Text>
            <Text
              style={{
                color:
                  item?.follow_up_status == 1
                    ? colors.textgrey
                    : item?.follow_up_status == 2
                    ? '#D2691E'
                    : item?.follow_up_status == 3
                    ? 'green'
                    : item?.follow_up_status == 4
                    ? colors.blue
                    : item?.follow_up_status == 5
                    ? 'red'
                    : colors.black,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              {item?.follow_up_status == 1
                ? 'Pending'
                : item?.follow_up_status == 2
                ? 'Next Follow-Up'
                : item?.follow_up_status == 3
                ? 'Interested'
                : item?.follow_up_status == 4
                ? 'Not Interested'
                : item?.follow_up_status == 5
                ? 'Cancelled'
                : ''}
            </Text>
          </View>

          {item?.follow_up_status == 2 ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: '2%',
                  marginTop: metrics.HEIGHT * 0.015,
                }}>
                <Text
                  style={{
                    color: colors.themecolor,
                    fontFamily: 'NunitoSans_10pt-ExtraBold',
                    fontSize: 16,
                  }}>
                  Next Follow-Up Date :{' '}
                </Text>
                <Text
                  style={{
                    color: colors.black,
                    fontFamily: 'NunitoSans_10pt-ExtraBold',
                    fontSize: 16,
                  }}>
                  {item?.follow_up_date
                    ? moment(item?.follow_up_date).format('DD-MM-YYYY')
                    : 'N/A'}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: '2%',
                  marginTop: metrics.HEIGHT * 0.015,
                }}>
                <Text
                  style={{
                    color: colors.themecolor,
                    fontFamily: 'NunitoSans_10pt-ExtraBold',
                    fontSize: 16,
                  }}>
                  Follow-Up Remark :{' '}
                </Text>
                <Text
                  style={{
                    color: colors.black,
                    fontFamily: 'NunitoSans_10pt-ExtraBold',
                    fontSize: 16,
                  }}>
                  {item?.follow_up_remark || 'N/A'}
                </Text>
              </View>
            </>
          ) : null}

          {item?.follow_up_status == 4 ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: '2%',
                  marginTop: metrics.HEIGHT * 0.015,
                }}>
                <Text
                  style={{
                    color: colors.themecolor,
                    fontFamily: 'NunitoSans_10pt-ExtraBold',
                    fontSize: 16,
                  }}>
                  Not Interested Remark :{' '}
                </Text>
                <Text
                  style={{
                    color: colors.black,
                    fontFamily: 'NunitoSans_10pt-ExtraBold',
                    fontSize: 16,
                  }}>
                  {item?.not_interested_remark || 'N/A'}
                </Text>
              </View>
            </>
          ) : null}

          {item?.follow_up_status == 5 ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: '2%',
                  marginTop: metrics.HEIGHT * 0.015,
                }}>
                <Text
                  style={{
                    color: colors.themecolor,
                    fontFamily: 'NunitoSans_10pt-ExtraBold',
                    fontSize: 16,
                  }}>
                  Cancel Reason :{' '}
                </Text>
                <Text
                  style={{
                    color: 'red',
                    fontFamily: 'NunitoSans_10pt-ExtraBold',
                    fontSize: 16,
                  }}>
                  {item?.cancel_reason || 'N/A'}
                </Text>
              </View>
            </>
          ) : null}

          {item?.is_customer === 'true' || item?.is_customer === true ? (
            <>
              <View
                style={{
                  marginHorizontal: '2%',
                  marginTop: metrics.HEIGHT * 0.015,
                }}>
                <Text
                  style={{
                    color: colors.green,
                    fontFamily: 'NunitoSans_10pt-ExtraBold',
                    fontSize: 13,
                  }}>
                  Customer already exists in Customer Master.
                </Text>
              </View>
            </>
          ) : null}

          <View
            style={{
              marginTop: metrics.HEIGHT * 0.01,
              borderTopWidth: 1.2,
              borderColor: colors.themecolor,
              borderStyle: 'dashed',
              marginBottom: metrics.HEIGHT * 0.01,
              marginHorizontal: '2%',
            }}
          />

          <View
            style={{
              paddingVertical: '1%',
              marginHorizontal: '5%',
              alignSelf: 'flex-end',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {item?.lead_assign_sales_person_id ? (
              <>
                {item?.is_customer === 'false' ||
                item?.is_customer === false ? (
                  <TouchableOpacity
                    onPress={() => {
                      setMainId(item?.id);
                      setConsvertCustomerModal(true);
                    }}
                    disabled={convert_customer_loading ? true : false}
                    style={{
                      paddingHorizontal: '4.5%',
                      backgroundColor: colors.white,
                      paddingVertical: '4.5%',
                      elevation: 3,
                      borderRadius: 10,
                      marginHorizontal: '4%',
                    }}>
                    {convert_customer_loading ? (
                      <ActivityIndicator
                        color={colors.themecolor}
                        size="small"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-convert"
                        size={25}
                        color={colors.themecolor}
                      />
                    )}
                  </TouchableOpacity>
                ) : null}
              </>
            ) : null}

            {item?.lead_assign_sales_person_id ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setMainId(item?.id);
                    setStartTime(item?.start_meeting || '');
                    setEndTime(item?.end_meeting || '');
                    setMeetingModal(true);
                  }}
                  style={{
                    paddingHorizontal: '4.5%',
                    backgroundColor: colors.white,
                    paddingVertical: '4.5%',
                    elevation: 3,
                    borderRadius: 10,
                  }}>
                  <Ionicons
                    name="videocam"
                    size={22}
                    color={colors.themecolor}
                  />
                </TouchableOpacity>
              </>
            ) : null}
            <TouchableOpacity
              onPress={() => {
                setMainId(item?.id);
                setFollowUpStatus(item?.follow_up_status);
                setFollowUpModal(true);
              }}
              style={{
                paddingHorizontal: '4.5%',
                backgroundColor: colors.white,
                paddingVertical: '4.5%',
                elevation: 3,
                borderRadius: 10,
                marginHorizontal: '4%',
              }}>
              <AntDesign name="calendar" size={22} color={colors.themecolor} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ViewLeadScreen', {
                  item: item,
                });
              }}
              style={{
                paddingHorizontal: '4%',
                backgroundColor: colors.white,
                paddingVertical: '4%',
                elevation: 3,
                borderRadius: 10,
              }}>
              <AntDesign name="eye" size={25} color={colors.black} />
            </TouchableOpacity>
            {item?.lead_assign_sales_person_id ? null : (
              <>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('AddLeadScreen', {
                      item: item,
                    });
                  }}
                  style={{
                    paddingHorizontal: '4.5%',
                    backgroundColor: colors.white,
                    paddingVertical: '4.5%',
                    elevation: 3,
                    borderRadius: 10,
                    marginHorizontal: '4%',
                  }}>
                  <Feather name="edit" size={22} color={colors.green} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setMainId(item?.id);
                    setDeleteModal(true);
                  }}
                  style={{
                    paddingHorizontal: '4%',
                    backgroundColor: colors.white,
                    paddingVertical: '4%',
                    elevation: 3,
                    borderRadius: 10,
                  }}>
                  <MaterialIcons
                    name="delete"
                    size={25}
                    color={colors.themecolor1}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      );
    },
    [convert_customer_loading, props.navigation],
  );

  const onRefresh = () => {
    GetLeadList(props);
    Getsalesperson(props);
  };
  const hasMoreLeads = gettempdata.length < (leadlist?.length || 0);

  const handleLoadMoreLeads = () => {
    if (!hasMoreLeads || isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextPage = page + 1;
      settempdata(leadlist.slice(0, nextPage * PAGE_SIZE));
      setpage(nextPage);
      setIsLoadingMore(false);
    }, 500);
  };
  const DeleteApicheck = () => {
    const formdata = new FormData();
    formdata.append('id', mainid);
    DeleteApi(formdata, props);
    setDeleteModal(false);
    setMainId('');
  };

  const AddAssignCheck = () => {
    if (!assignstatus) {
      SimpleToast.show('Select Sales Person');
    } else {
      const formdata = new FormData();
      formdata.append('id', mainid);
      formdata.append('lead_assign_sales_person_id', assignstatus);
      AddAssign(formdata, props);
      setAssignModal(false);
      setassignStatus('');
      setMainId('');
    }
  };

  const AddCollaboratorCheck = () => {
    if (!collaboratorstatus) {
      SimpleToast.show('Select Sales Person');
    } else {
      const formdata = new FormData();
      formdata.append('id', mainid);
      formdata.append('lead_collaborator_sales_person_id', collaboratorstatus);
      AddCollaborator(formdata, props);
      setCollaboratorModal(false);
      setCollaboratorStatus('');
      setMainId('');
    }
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

  const AddFollowupCheck = () => {
    const formdata = new FormData();
    formdata.append('id', mainid);
    formdata.append('follow_up_status', followupstatus);
    if (followupstatus == 2) {
      formdata.append('follow_up_date', moment(getdate).format('YYYY-MM-DD'));
      formdata.append('follow_up_remark', getremark);
    } else {
    }
    if (followupstatus == 4) {
      formdata.append('not_interested_remark', getremark);
    } else {
    }
    if (followupstatus == 5) {
      formdata.append('cancel_reason', getcancelreason);
    } else {
    }
    AddFollowUp(formdata, props);
    setFollowUpModal(false);
    setFollowUpStatus(1);
    setMainId('');
    setRemark('');
    setCancelReason('');
    setdate(new Date());
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
      try {
        const position = await new Promise((resolve, reject) => {
          Geolocation.getCurrentPosition(
            resolve,
            error => reject(new Error(error.message)),
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        });

        CheckStartMeeting(position.coords);
      } catch (error) {
        console.error('Error:', error.message);
      }
    } else {
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

  const requestLocationPermission1 = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission denied');
        modal1();
        return;
      }
      try {
        const position = await new Promise((resolve, reject) => {
          Geolocation.getCurrentPosition(
            resolve,
            error => reject(new Error(error.message)),
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        });

        CheckEndMeeting(position.coords);
      } catch (error) {
        console.error('Error:', error.message);
      }
    } else {
    }
  };

  const modal1 = () => {
    Alert.alert(
      'SORRY!',
      'Location permission is mandatory to find stores near your area.',
      [
        {
          text: 'Exit',
          onPress: () => BackHandler.exitApp(),
          style: 'cancel',
        },
        {text: 'Retry', onPress: () => requestLocationPermission1()},
      ],
    );
  };

  const CheckStartMeeting = value => {
    const formdata = new FormData();
    formdata.append('id', mainid);
    formdata.append('latitude', value.latitude);
    formdata.append('longitude', value.longitude);

    startmeeting(formdata, props);

    if (startmeeting_loading === false) {
      setMainId('');
      setStartTime('');
      setEndTime('');
      setMeetingModal(false);
    } else {
    }
  };

  const CheckEndMeeting = value => {
    const formdata = new FormData();
    formdata.append('id', mainid);
    formdata.append('latitude', value.latitude);
    formdata.append('longitude', value.longitude);

    endmeeting(formdata, props);

    if (endmeeting_loading === false) {
      setMainId('');
      setStartTime('');
      setEndTime('');
      setMeetingModal(false);
    } else {
    }
  };

  const UnAssigncheck = () => {
    const formdata = new FormData();
    formdata.append('id', mainid);
    unAssign(formdata, props);

    if (cancel_assign_loading === false) {
    } else {
      setMainId('');
      setRemoveAssignModal(false);
    }
  };

  const Removecollaboratorcheck = () => {
    const formdata = new FormData();
    formdata.append('id', mainid);
    Removecollaborator(formdata, props);

    if (remove_collaborator_loading === false) {
    } else {
      setMainId('');
      setRemoveCollaboratorModal(false);
    }
  };

  const Convertcustomercheck = () => {
    const formdata = new FormData();
    formdata.append('id', mainid);

    Convertcustomer(formdata, props);

    if (convert_customer_loading === false) {
    } else {
      setMainId('');
      setConsvertCustomerModal(false);
    }
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
          Lead Master
        </Text>
      </View>
      {lead_loading ? (
        <ActivityIndicator
          color={colors.themecolor1}
          size="large"
          style={{flex: 1}}
        />
      ) : (
        <>
          <FlatList
            data={gettempdata}
            keyExtractor={(item, index) =>
              item?.id ? item.id.toString() : index.toString()
            }
            renderItem={renderItem}
            ListEmptyComponent={noDataFoundView}
            removeClippedSubviews={Platform.OS === 'android'}
            initialNumToRender={8}
            maxToRenderPerBatch={8}
            windowSize={5}
            updateCellsBatchingPeriod={50}
            onEndReached={handleLoadMoreLeads}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() =>
              isLoadingMore && gettempdata.length < (leadlist?.length || 0) ? (
                <ActivityIndicator
                  color={colors.themecolor1}
                  size="large"
                  style={{marginVertical: metrics.HEIGHT * 0.02}}
                />
              ) : null
            }
            refreshControl={
              <RefreshControl refreshing={lead_loading} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: metrics.HEIGHT * 0.03,
              marginHorizontal: '5%',
              flexGrow: 1,
            }}
          />
          {/* delete modal */}
          <Modal
            isVisible={deletemodal}
            animationIn={'fadeInDownBig'}
            animationInTiming={500}
            animationOut={'fadeOutDownBig'}
            animationOutTiming={500}
            onBackButtonPress={() => setDeleteModal(false)}
            onBackdropPress={() => setDeleteModal(false)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '95%',
                  backgroundColor: colors.white,
                  borderRadius: 10,
                  elevation: 5,
                }}>
                <View style={{padding: 15}}>
                  <Text
                    style={{
                      fontSize: 18,

                      marginBottom: 10,
                      textAlign: 'center',
                      color: colors.black,
                    }}>
                    Delete Alert
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      textAlign: 'center',
                      marginBottom: 20,
                      color: colors.black,
                    }}>
                    Are you sure you want to Delete?
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    borderTopWidth: 1,
                    borderColor: '#ccc',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      DeleteApicheck();
                    }}
                    disabled={deletelead_loading ? true : false}
                    style={{
                      flex: 1,
                      paddingVertical: 15,
                      alignItems: 'center',
                    }}>
                    {deletelead_loading ? (
                      <ActivityIndicator color={'red'} size="small" />
                    ) : (
                      <Text
                        style={{
                          fontSize: 16,

                          color: 'red',
                        }}>
                        Confirm
                      </Text>
                    )}
                  </TouchableOpacity>
                  <View
                    style={{
                      width: 1,
                      backgroundColor: '#ccc',
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setMainId('');
                      setDeleteModal(false);
                    }}
                    style={{
                      flex: 1,
                      paddingVertical: 15,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,

                        color: colors.black,
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          {/* delete modal */}

          {/* remove assign modal */}
          <Modal
            isVisible={removeassignmodal}
            onBackButtonPress={() => setRemoveAssignModal(false)}
            onBackdropPress={() => setRemoveAssignModal(false)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '95%',
                  backgroundColor: colors.white,
                  borderRadius: 10,
                  elevation: 5,
                }}>
                <View style={{padding: 15}}>
                  <Text
                    style={{
                      fontSize: 18,

                      marginBottom: 10,
                      textAlign: 'center',
                      color: colors.black,
                    }}>
                    UNASSIGN Alert
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      textAlign: 'center',
                      marginBottom: 20,
                      color: colors.black,
                    }}>
                    Are you sure you want to UNASSIGN this lead?
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    borderTopWidth: 1,
                    borderColor: '#ccc',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setRemoveAssignModal(false);
                      UnAssigncheck();
                    }}
                    disabled={cancel_assign_loading ? true : false}
                    style={{
                      flex: 1,
                      paddingVertical: 15,
                      alignItems: 'center',
                    }}>
                    {cancel_assign_loading ? (
                      <ActivityIndicator color={'red'} size="small" />
                    ) : (
                      <Text
                        style={{
                          fontSize: 16,

                          color: 'red',
                        }}>
                        Confirm
                      </Text>
                    )}
                  </TouchableOpacity>
                  <View
                    style={{
                      width: 1,
                      backgroundColor: '#ccc',
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setMainId('');
                      setRemoveAssignModal(false);
                    }}
                    style={{
                      flex: 1,
                      paddingVertical: 15,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,

                        color: colors.black,
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          {/* remove assign modal */}

          {/* remove collaborator modal */}
          <Modal
            isVisible={removecollaboratornmodal}
            onBackButtonPress={() => setRemoveCollaboratorModal(false)}
            onBackdropPress={() => setRemoveCollaboratorModal(false)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '95%',
                  backgroundColor: colors.white,
                  borderRadius: 10,
                  elevation: 5,
                }}>
                <View style={{padding: 15}}>
                  <Text
                    style={{
                      fontSize: 18,

                      marginBottom: 10,
                      textAlign: 'center',
                      color: colors.black,
                    }}>
                    Remove Alert
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      textAlign: 'center',
                      marginBottom: 20,
                      color: colors.black,
                    }}>
                    Are you sure you want to remove collaborator?
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    borderTopWidth: 1,
                    borderColor: '#ccc',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setRemoveCollaboratorModal(false);
                      Removecollaboratorcheck();
                    }}
                    disabled={remove_collaborator_loading ? true : false}
                    style={{
                      flex: 1,
                      paddingVertical: 15,
                      alignItems: 'center',
                    }}>
                    {remove_collaborator_loading ? (
                      <ActivityIndicator color={'red'} size="small" />
                    ) : (
                      <Text
                        style={{
                          fontSize: 16,

                          color: 'red',
                        }}>
                        Confirm
                      </Text>
                    )}
                  </TouchableOpacity>
                  <View
                    style={{
                      width: 1,
                      backgroundColor: '#ccc',
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setMainId('');
                      setRemoveCollaboratorModal(false);
                    }}
                    style={{
                      flex: 1,
                      paddingVertical: 15,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,

                        color: colors.black,
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          {/* remove collaborator modal */}

          {/* consvert customermodal modal */}
          <Modal
            isVisible={consvertcustomermodal}
            onBackButtonPress={() => setConsvertCustomerModal(false)}
            onBackdropPress={() => setConsvertCustomerModal(false)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '95%',
                  backgroundColor: colors.white,
                  borderRadius: 10,
                  elevation: 5,
                }}>
                <View style={{padding: 15}}>
                  <Text
                    style={{
                      fontSize: 18,

                      marginBottom: 10,
                      textAlign: 'center',
                      color: colors.black,
                    }}>
                    Alert
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      textAlign: 'center',
                      marginBottom: 20,
                      color: colors.black,
                    }}>
                    Are you sure want to create customer?
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    borderTopWidth: 1,
                    borderColor: '#ccc',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setConsvertCustomerModal(false);
                      Convertcustomercheck();
                    }}
                    disabled={convert_customer_loading ? true : false}
                    style={{
                      flex: 1,
                      paddingVertical: 15,
                      alignItems: 'center',
                    }}>
                    {convert_customer_loading ? (
                      <ActivityIndicator color={'red'} size="small" />
                    ) : (
                      <Text
                        style={{
                          fontSize: 16,

                          color: 'red',
                        }}>
                        Confirm
                      </Text>
                    )}
                  </TouchableOpacity>
                  <View
                    style={{
                      width: 1,
                      backgroundColor: '#ccc',
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setMainId('');
                      setConsvertCustomerModal(false);
                    }}
                    style={{
                      flex: 1,
                      paddingVertical: 15,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,

                        color: colors.black,
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          {/* consvert customermodal modal */}

          {/* Follow Up Modal */}
          <Modal
            isVisible={followupmodal}
            onBackButtonPress={() => setFollowUpModal(false)}
            onBackdropPress={() => setFollowUpModal(false)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '95%',
                  backgroundColor: colors.white,
                  borderRadius: 10,
                  elevation: 5,
                }}>
                <View style={{padding: 15}}>
                  <Text
                    style={{
                      fontSize: 20,

                      marginBottom: 10,
                      textAlign: 'center',
                      color: colors.black,
                      fontWeight: 'bold',
                      textDecorationLine: 'underline',
                    }}>
                    Lead Follow-Up
                  </Text>
                </View>
                <View
                  style={{
                    marginHorizontal: '2%',
                  }}>
                  <FlatList
                    data={FollowUpDATA}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setFollowUpStatus(item?.id);
                          }}
                          style={{
                            padding: '3%',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <FontAwesome
                            name={
                              followupstatus == item.id
                                ? 'dot-circle-o'
                                : 'circle-o'
                            }
                            color={colors.themecolor}
                            size={25}
                          />
                          <Text
                            style={{
                              color: colors.black,
                              fontSize: 14,
                              fontWeight: 'bold',
                              marginHorizontal: 5,
                            }}>
                            {item?.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>

                {followupstatus == 5 ? (
                  <>
                    <View
                      style={{
                        marginHorizontal: '2%',
                        marginTop: metrics.HEIGHT * 0.01,
                      }}>
                      <Text
                        style={{
                          color: colors.themecolor,
                          fontSize: 16,
                          fontFamily: 'NunitoSans_10pt-SemiBold',
                        }}>
                        Cancel Reason(Optional)
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
                        placeholder="Enter Cancel Reason"
                        placeholderTextColor={colors.black}
                        style={{
                          fontSize: 16,
                          color: colors.black,
                        }}
                        keyboardType="default"
                        value={getcancelreason}
                        onChangeText={text => {
                          setCancelReason(text);
                        }}
                      />
                    </View>
                  </>
                ) : null}

                {followupstatus == 2 ? (
                  <>
                    <View
                      style={{
                        marginHorizontal: '2%',
                        marginTop: metrics.HEIGHT * 0.01,
                      }}>
                      <Text
                        style={{
                          color: colors.themecolor,
                          fontSize: 16,
                          fontFamily: 'NunitoSans_10pt-SemiBold',
                        }}>
                        Date
                        <Text
                          style={{
                            color: 'red',
                          }}>
                          *
                        </Text>
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
                        borderColor: colors.themecolor,
                        borderWidth: 1,
                        marginTop: '2%',
                      }}>
                      <DateTimePickerModal
                        isVisible={isdatepicker}
                        mode="date"
                        // minimumDate={new Date()}
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
                            color: getdate ? colors.black : colors.gray,
                            alignSelf: 'center',
                            marginHorizontal: '5%',
                            fontSize: 16,
                          }}>
                          {moment(getdate).format('DD/MM/YYYY') ===
                          'Invalid date'
                            ? 'DD/MM/YYYY'
                            : moment(getdate).format('DD/MM/YYYY')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : null}

                {followupstatus == 4 || followupstatus == 2 ? (
                  <>
                    <View
                      style={{
                        marginHorizontal: '2%',
                        marginTop: metrics.HEIGHT * 0.01,
                      }}>
                      <Text
                        style={{
                          color: colors.themecolor,
                          fontSize: 16,
                          fontFamily: 'NunitoSans_10pt-SemiBold',
                        }}>
                        Remark(Optional)
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
                        placeholder="Enter Remark"
                        placeholderTextColor={colors.black}
                        style={{
                          fontSize: 16,
                          color: colors.black,
                        }}
                        keyboardType="default"
                        value={getremark}
                        onChangeText={text => {
                          setRemark(text);
                        }}
                      />
                    </View>
                  </>
                ) : null}

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: '10%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      AddFollowupCheck();
                    }}
                    disabled={followup_loading ? true : false}
                    style={{
                      marginTop: 30,
                      backgroundColor: colors.themecolor,
                      paddingVertical: 12,
                      borderRadius: 5,
                      alignItems: 'center',
                      paddingHorizontal: '10%',
                      marginBottom: 20,
                      elevation: 2,
                    }}>
                    {followup_loading ? (
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
                  <TouchableOpacity
                    onPress={() => {
                      setFollowUpStatus(1);
                      setFollowUpModal(false);
                    }}
                    style={{
                      marginTop: 30,
                      backgroundColor: colors.whitesomke,
                      paddingVertical: 12,
                      borderRadius: 5,
                      alignItems: 'center',
                      paddingHorizontal: '10%',
                      marginBottom: 20,
                      elevation: 2,
                    }}>
                    <Text
                      style={{
                        color: colors.black,
                        fontFamily: 'Domine-Bold',
                        fontSize: 16,
                      }}>
                      CLOSE
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          {/* Follow Up Modal */}

          {/* Assign to Modal */}
          <Modal
            isVisible={assignmodal}
            onBackButtonPress={() => setAssignModal(false)}
            onBackdropPress={() => setAssignModal(false)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '95%',
                  backgroundColor: colors.white,
                  borderRadius: 10,
                  elevation: 5,
                }}>
                <View style={{padding: 15}}>
                  <Text
                    style={{
                      fontSize: 20,

                      marginBottom: 10,
                      textAlign: 'center',
                      color: colors.black,
                      fontWeight: 'bold',
                      textDecorationLine: 'underline',
                    }}>
                    Assign Lead
                  </Text>
                </View>
                <View
                  style={{
                    marginHorizontal: '5%',
                  }}>
                  <Text
                    style={{
                      color: colors.themecolor,
                      fontSize: 18,
                      fontFamily: 'NunitoSans_10pt-SemiBold',
                    }}>
                    Sales Person<Text style={{color: 'red'}}>*</Text>
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
                    search
                    searchPlaceholder="Enter Sales Person Name"
                    data={salespersonlist}
                    labelField="name"
                    valueField="id"
                    placeholder={'Select Sales Person'}
                    value={assignstatus}
                    onChange={item => {
                      setassignStatus(item.id);
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: '10%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      AddAssignCheck();
                    }}
                    disabled={assign_loading ? true : false}
                    style={{
                      marginTop: 30,
                      backgroundColor: colors.themecolor,
                      paddingVertical: 12,
                      borderRadius: 5,
                      alignItems: 'center',
                      paddingHorizontal: '10%',
                      marginBottom: 20,
                      elevation: 2,
                    }}>
                    {assign_loading ? (
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
                  <TouchableOpacity
                    onPress={() => {
                      setassignStatus('');
                      setAssignModal(false);
                    }}
                    style={{
                      marginTop: 30,
                      backgroundColor: colors.whitesomke,
                      paddingVertical: 12,
                      borderRadius: 5,
                      alignItems: 'center',
                      paddingHorizontal: '10%',
                      marginBottom: 20,
                      elevation: 2,
                    }}>
                    <Text
                      style={{
                        color: colors.black,
                        fontFamily: 'Domine-Bold',
                        fontSize: 16,
                      }}>
                      CLOSE
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          {/* Assign to Modal */}

          {/* Collaborator To Modal */}
          <Modal
            isVisible={collaboratormodal}
            onBackButtonPress={() => setCollaboratorModal(false)}
            onBackdropPress={() => setCollaboratorModal(false)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '95%',
                  backgroundColor: colors.white,
                  borderRadius: 10,
                  elevation: 5,
                }}>
                <View style={{padding: 15}}>
                  <Text
                    style={{
                      fontSize: 20,

                      marginBottom: 10,
                      textAlign: 'center',
                      color: colors.black,
                      fontWeight: 'bold',
                      textDecorationLine: 'underline',
                    }}>
                    Lead Collaborator To
                  </Text>
                </View>
                <View
                  style={{
                    marginHorizontal: '5%',
                  }}>
                  <Text
                    style={{
                      color: colors.themecolor,
                      fontSize: 18,
                      fontFamily: 'NunitoSans_10pt-SemiBold',
                    }}>
                    Sales Person<Text style={{color: 'red'}}>*</Text>
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
                    search
                    searchPlaceholder="Enter Sales Person Name"
                    data={salespersonlist}
                    labelField="name"
                    valueField="id"
                    placeholder={'Select Sales Person'}
                    value={collaboratorstatus}
                    onChange={item => {
                      setCollaboratorStatus(item.id);
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: '10%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      AddCollaboratorCheck();
                    }}
                    disabled={collab_loading ? true : false}
                    style={{
                      marginTop: 30,
                      backgroundColor: colors.themecolor,
                      paddingVertical: 12,
                      borderRadius: 5,
                      alignItems: 'center',
                      paddingHorizontal: '10%',
                      marginBottom: 20,
                      elevation: 2,
                    }}>
                    {collab_loading ? (
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
                  <TouchableOpacity
                    onPress={() => {
                      setCollaboratorStatus('');
                      setCollaboratorModal(false);
                    }}
                    style={{
                      marginTop: 30,
                      backgroundColor: colors.whitesomke,
                      paddingVertical: 12,
                      borderRadius: 5,
                      alignItems: 'center',
                      paddingHorizontal: '10%',
                      marginBottom: 20,
                      elevation: 2,
                    }}>
                    <Text
                      style={{
                        color: colors.black,
                        fontFamily: 'Domine-Bold',
                        fontSize: 16,
                      }}>
                      CLOSE
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          {/* Collaborator To Modal */}

          {/* meeting modal */}
          <Modal
            isVisible={meetingmodal}
            onBackButtonPress={() => setMeetingModal(false)}
            onBackdropPress={() => setMeetingModal(false)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '95%',
                  backgroundColor: colors.white,
                  borderRadius: 10,
                  elevation: 5,
                }}>
                {starttime && endtime ? (
                  <>
                    <View style={{padding: 15}}>
                      <Text
                        style={{
                          fontSize: 20,

                          marginBottom: 10,
                          textAlign: 'center',
                          color: colors.black,
                          fontWeight: 'bold',
                          textDecorationLine: 'underline',
                        }}>
                        Meeting
                      </Text>
                    </View>

                    <View
                      style={{
                        marginHorizontal: '2%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 19,
                          color: colors.black,
                        }}>
                        Start Time :
                      </Text>
                      <View
                        style={{
                          padding: 15,
                          borderRadius: 20,
                        }}>
                        <Text style={{fontSize: 19, color: colors.black}}>
                          {moment(starttime, 'HH:mm:ss').format('h:mm:ss A')}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        marginHorizontal: '2%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 19,
                          color: colors.black,
                        }}>
                        End Time :
                      </Text>
                      <View
                        style={{
                          padding: 15,
                          borderRadius: 20,
                        }}>
                        <Text style={{fontSize: 19, color: colors.black}}>
                          {moment(endtime, 'HH:mm:ss').format('h:mm:ss A')}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: '10%',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          setMainId('');
                          setStartTime('');
                          setEndTime('');
                          setMeetingModal(false);
                        }}
                        style={{
                          marginTop: 30,
                          backgroundColor: colors.themecolor,
                          paddingVertical: 12,
                          borderRadius: 5,
                          alignItems: 'center',
                          paddingHorizontal: '10%',
                          marginBottom: 20,
                          elevation: 2,
                        }}>
                        <Text
                          style={{
                            color: colors.white,
                            fontFamily: 'Domine-Bold',
                            fontSize: 16,
                          }}>
                          CLOSE
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : null}

                {!starttime && !endtime ? (
                  <>
                    <View style={{padding: 15}}>
                      <Text
                        style={{
                          fontSize: 20,

                          marginBottom: 10,
                          textAlign: 'center',
                          color: colors.black,
                          fontWeight: 'bold',
                          textDecorationLine: 'underline',
                        }}>
                        Start Meeting
                      </Text>
                    </View>

                    <View
                      style={{
                        marginHorizontal: '2%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 19,
                          color: colors.black,
                        }}>
                        {' '}
                        Start Time :
                      </Text>
                      <View
                        style={{
                          padding: 15,

                          borderRadius: 20,
                        }}>
                        <Text style={{fontSize: 19, color: colors.black}}>
                          {time}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginHorizontal: '10%',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          requestLocationPermission();
                        }}
                        disabled={startmeeting_loading ? true : false}
                        style={{
                          marginTop: 30,
                          backgroundColor: colors.themecolor,
                          paddingVertical: 12,
                          borderRadius: 5,
                          alignItems: 'center',
                          paddingHorizontal: '10%',
                          marginBottom: 20,
                          elevation: 2,
                        }}>
                        {startmeeting_loading ? (
                          <ActivityIndicator
                            color={colors.white}
                            size="small"
                          />
                        ) : (
                          <Text
                            style={{
                              color: colors.white,
                              fontFamily: 'Domine-Bold',
                              fontSize: 16,
                            }}>
                            START
                          </Text>
                        )}
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          setMainId('');
                          setStartTime('');
                          setEndTime('');
                          setMeetingModal(false);
                        }}
                        style={{
                          marginTop: 30,
                          backgroundColor: colors.themecolor,
                          paddingVertical: 12,
                          borderRadius: 5,
                          alignItems: 'center',
                          paddingHorizontal: '10%',
                          marginBottom: 20,
                          elevation: 2,
                        }}>
                        <Text
                          style={{
                            color: colors.white,
                            fontFamily: 'Domine-Bold',
                            fontSize: 16,
                          }}>
                          CLOSE
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : null}

                {starttime && !endtime ? (
                  <>
                    <View style={{padding: 15}}>
                      <Text
                        style={{
                          fontSize: 20,

                          marginBottom: 10,
                          textAlign: 'center',
                          color: colors.black,
                          fontWeight: 'bold',
                          textDecorationLine: 'underline',
                        }}>
                        End Meeting
                      </Text>
                    </View>

                    <View
                      style={{
                        marginHorizontal: '2%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 19,
                          color: colors.black,
                        }}>
                        {' '}
                        Start Time :
                      </Text>
                      <View
                        style={{
                          padding: 15,
                          borderRadius: 20,
                        }}>
                        <Text style={{fontSize: 19, color: colors.black}}>
                          {moment(starttime, 'HH:mm:ss').format('h:mm:ss A')}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        marginHorizontal: '2%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 19,
                          color: colors.black,
                        }}>
                        {' '}
                        End Time :
                      </Text>
                      <View
                        style={{
                          padding: 15,

                          borderRadius: 20,
                        }}>
                        <Text style={{fontSize: 19, color: colors.black}}>
                          {time}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginHorizontal: '10%',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          requestLocationPermission1();
                        }}
                        disabled={endmeeting_loading ? true : false}
                        style={{
                          marginTop: 30,
                          backgroundColor: colors.themecolor,
                          paddingVertical: 12,
                          borderRadius: 5,
                          alignItems: 'center',
                          paddingHorizontal: '10%',
                          marginBottom: 20,
                          elevation: 2,
                        }}>
                        {startmeeting_loading ? (
                          <ActivityIndicator
                            color={colors.white}
                            size="small"
                          />
                        ) : (
                          <Text
                            style={{
                              color: colors.white,
                              fontFamily: 'Domine-Bold',
                              fontSize: 16,
                            }}>
                            END
                          </Text>
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setMainId('');
                          setStartTime('');
                          setEndTime('');
                          setMeetingModal(false);
                        }}
                        style={{
                          marginTop: 30,
                          backgroundColor: colors.themecolor,
                          paddingVertical: 12,
                          borderRadius: 5,
                          alignItems: 'center',
                          paddingHorizontal: '10%',
                          marginBottom: 20,
                          elevation: 2,
                        }}>
                        <Text
                          style={{
                            color: colors.white,
                            fontFamily: 'Domine-Bold',
                            fontSize: 16,
                          }}>
                          CLOSE
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : null}
              </View>
            </View>
          </Modal>
          {/* meeting modal */}

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('AddLeadScreen', {
                item: '',
              });
            }}
            style={{
              position: 'absolute',
              bottom: 20,
              right: '5%',
              backgroundColor: colors.themecolor,
              width: 56,
              height: 56,
              borderRadius: 28,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 5,
              zIndex: 999,
            }}>
            <Feather name="plus" size={30} color={colors.white} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default LeadScreen;
