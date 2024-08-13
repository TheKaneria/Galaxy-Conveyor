import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../Utils/colors';
import metrics from '../Utils/metrics';
import Ripple from 'react-native-material-ripple';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useLoginContext} from '../Context/login_context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSalesContext} from '../Context/sales_context';

const Data2 = [
  {id: 1, name: 'Daily ', prod: 5000, navigate: ''},
  {id: 2, name: 'Monthly ', prod: 15596, navigate: ''},
  {id: 3, name: 'Yearly ', prod: 350978, navigate: ''},
];

const DATA = [
  {id: 1, name: '30 Days'},
  {id: 2, name: '60 Days'},
  {id: 3, name: '60+ Days'},
];

const DashBoard = props => {
  const [refreshing, setRefreshing] = useState(false);

  const {
    GetSales,
    sales_info,
    sales_loading,
    GetQuotationOrder,
    Quodrder_loading,
    Quodrder_info,
    GetOverdue,
    Overdue_loading,
    Overdue_info,
  } = useSalesContext();

  const onRefresh = () => {
    setRefreshing(true);
    GetSales(props)
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
    GetQuotationOrder(props)
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
    GetOverdue(props)
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      GetSales(props);
      GetQuotationOrder(props);
      GetOverdue(props);
    });
    return unsubscribe;
  }, [props]);

  const {setLogout} = useLoginContext();

  const SETLOGOUT = props => {
    AsyncStorage.removeItem('islogin');
    AsyncStorage.removeItem('token');

    AsyncStorage.clear();
    setLogout(props);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
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
          DASHBOARD
        </Text>
        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            borderRadius: 45,
            backgroundColor: colors.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => SETLOGOUT(props)}>
          <AntDesign name="logout" size={20} color={colors.themecolor1} />
        </TouchableOpacity>
      </View>
      {sales_loading && Quodrder_loading ? (
        <ActivityIndicator
          color={colors.themecolor1}
          size="large"
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={refreshing}
          //     onRefresh={onRefresh}
          //     colors={[colors.themecolor1]}
          //   />
          // }
        >
          <View
            style={{
              width: '95%',
              alignItems: 'center',
              alignSelf: 'center',
              marginVertical: '5%',
            }}>
            <Ripple
              onPress={() => {
                props.navigation.navigate('Productnation');
              }}
              rippleColor={colors.white}
              style={{
                backgroundColor: colors.themecolor,
                width: '100%',
                borderRadius: 10,
                paddingVertical: '4%',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: '8%',
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontFamily: 'NunitoSans_10pt-ExtraBold',
                  fontSize: 16,
                }}>
                Production Report
              </Text>
              <FontAwesome6
                style={{marginLeft: '5%'}}
                name="arrow-right"
                size={16}
                color={colors.white}
              />
            </Ripple>
          </View>

          {/* sales */}
          <View style={{width: '95%', alignSelf: 'center', marginTop: 10}}>
            <Text
              style={{
                fontSize: 24,
                textAlign: 'center',
                fontFamily: 'NunitoSans_10pt-Bold',
                color: colors.themecolor,
                textTransform: 'uppercase',
              }}>
              Sales
            </Text>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 10,
                elevation: 10,
                marginTop: 10,
                borderRadius: 10,
                marginBottom: '5%',
              }}>
              {sales_loading ? (
                <ActivityIndicator color={colors.themecolor1} size="small" />
              ) : (
                <>
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: '#fff',
                    }}>
                    <Ripple
                      rippleColor={colors.white}
                      rippleOpacity={0.5}
                      rippleDuration={800}
                      style={{
                        backgroundColor: colors.themecolor,
                        elevation: 5,
                        width: 'auto',
                        borderRadius: 10,
                        height: 90,
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 2,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 17,
                            textAlign: 'center',
                            color: colors.white,
                          }}>
                          Today
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 2,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: colors.white,
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 19,
                            textAlign: 'center',
                            color: colors.themecolor,
                          }}>
                          ({'\u20B9'}){' '}
                          {sales_info ? sales_info?.today_sales : 0}
                        </Text>
                      </View>
                    </Ripple>
                  </View>
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: '#fff',
                    }}>
                    <Ripple
                      rippleColor={colors.white}
                      rippleOpacity={0.5}
                      rippleDuration={800}
                      style={{
                        backgroundColor: colors.themecolor,
                        elevation: 5,
                        width: 'auto',
                        borderRadius: 10,
                        height: 90,
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 2,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 17,
                            textAlign: 'center',
                            color: colors.white,
                          }}>
                          Current Month
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 2,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: colors.white,
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 19,
                            textAlign: 'center',
                            color: colors.themecolor,
                          }}>
                          ({'\u20B9'}){' '}
                          {sales_info ? sales_info?.monthly_sales : 0}
                        </Text>
                      </View>
                    </Ripple>
                  </View>
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: '#fff',
                    }}>
                    <Ripple
                      rippleColor={colors.white}
                      rippleOpacity={0.5}
                      rippleDuration={800}
                      style={{
                        backgroundColor: colors.themecolor,
                        elevation: 5,
                        width: 'auto',
                        borderRadius: 10,
                        height: 90,
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 2,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 17,
                            textAlign: 'center',
                            color: colors.white,
                          }}>
                          Current F.Y.
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 2,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: colors.white,
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 19,
                            textAlign: 'center',
                            color: colors.themecolor,
                          }}>
                          ({'\u20B9'}){' '}
                          {sales_info ? sales_info?.current_fy_sales : 0}
                        </Text>
                      </View>
                    </Ripple>
                  </View>
                </>
              )}
            </View>
          </View>
          {/* sales */}
          {/* Quotation */}
          <View style={{width: '95%', alignSelf: 'center', marginTop: 10}}>
            <Text
              style={{
                fontSize: 24,
                textAlign: 'center',
                fontFamily: 'NunitoSans_10pt-Bold',
                color: colors.themecolor,
                textTransform: 'uppercase',
              }}>
              Quotation
            </Text>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 10,
                elevation: 10,
                marginTop: 10,
                borderRadius: 10,
                marginBottom: '5%',
              }}>
              {Quodrder_loading ? (
                <ActivityIndicator color={colors.themecolor1} size="small" />
              ) : (
                <>
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: '#fff',
                    }}>
                    <Ripple
                      rippleColor={colors.white}
                      rippleOpacity={0.5}
                      rippleDuration={800}
                      style={{
                        backgroundColor: colors.themecolor,
                        elevation: 5,
                        width: 'auto',
                        borderRadius: 10,
                        height: 90,
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 2,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 17,
                            textAlign: 'center',
                            color: colors.white,
                          }}>
                          Today
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 2,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: colors.white,
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 19,
                            textAlign: 'center',
                            color: colors.themecolor,
                          }}>
                          {Quodrder_info ? Quodrder_info?.today_quotation : 0}
                        </Text>
                      </View>
                    </Ripple>
                  </View>
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: '#fff',
                    }}>
                    <Ripple
                      rippleColor={colors.white}
                      rippleOpacity={0.5}
                      rippleDuration={800}
                      style={{
                        backgroundColor: colors.themecolor,
                        elevation: 5,
                        width: 'auto',
                        borderRadius: 10,
                        height: 90,
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 2,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 17,
                            textAlign: 'center',
                            color: colors.white,
                          }}>
                          Current Month
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 2,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: colors.white,
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 19,
                            textAlign: 'center',
                            color: colors.themecolor,
                          }}>
                          {Quodrder_info ? Quodrder_info?.monthly_quotation : 0}
                        </Text>
                      </View>
                    </Ripple>
                  </View>
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: '#fff',
                    }}>
                    <Ripple
                      rippleColor={colors.white}
                      rippleOpacity={0.5}
                      rippleDuration={800}
                      style={{
                        backgroundColor: colors.themecolor,
                        elevation: 5,
                        width: 'auto',
                        borderRadius: 10,
                        height: 90,
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 2,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 17,
                            textAlign: 'center',
                            color: colors.white,
                          }}>
                          Current F.Y.
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 2,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: colors.white,
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 19,
                            textAlign: 'center',
                            color: colors.themecolor,
                          }}>
                          {Quodrder_info
                            ? Quodrder_info?.current_fy_quotation
                            : 0}{' '}
                        </Text>
                      </View>
                    </Ripple>
                  </View>
                </>
              )}
            </View>
          </View>
          {/* Quotation */}
          {/* Order Converted & Order Received */}
          <View style={{width: '95%', alignSelf: 'center', marginTop: 10}}>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                fontFamily: 'NunitoSans_10pt-Bold',
                color: colors.themecolor,
                textTransform: 'uppercase',
              }}>
              Order Converted & Order Received
            </Text>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 10,
                elevation: 10,
                marginTop: 10,
                borderRadius: 10,
                marginBottom: '5%',
              }}>
              {Quodrder_loading ? (
                <ActivityIndicator color={colors.themecolor1} size="small" />
              ) : (
                <>
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: '#fff',
                    }}>
                    <Ripple
                      rippleColor={colors.white}
                      rippleOpacity={0.5}
                      rippleDuration={800}
                      style={{
                        backgroundColor: colors.themecolor,
                        elevation: 5,
                        width: 'auto',
                        borderRadius: 10,
                        height: 120,
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 1.2,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 17,
                            textAlign: 'center',
                            color: colors.white,
                          }}>
                          Today
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          paddingHorizontal: 10,
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: colors.white,
                          flexDirection: 'row',
                          borderBottomWidth: 1,
                        }}>
                        <Text
                          style={{
                            flex: 1,
                            alignItems: 'flex-start',
                            fontFamily: 'NunitoSans_10pt-Bold',
                            fontSize: 19,
                            textAlign: 'center',
                            color: colors.themecolor,
                          }}>
                          Converted
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 19,
                            textAlign: 'center',
                            color: colors.themecolor,
                            flex: 1,
                            alignItems: 'flex-start',
                          }}>
                          {Quodrder_info
                            ? Quodrder_info?.today_quotation_converted
                            : 0}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: colors.white,
                          flexDirection: 'row',
                          paddingHorizontal: 10,
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                        }}>
                        <Text
                          style={{
                            flex: 1,
                            alignItems: 'flex-start',
                            fontFamily: 'NunitoSans_10pt-Bold',
                            fontSize: 19,
                            textAlign: 'center',
                            color: colors.themecolor,
                          }}>
                          Received
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            alignItems: 'flex-start',
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 19,
                            textAlign: 'center',
                            color: colors.themecolor,
                          }}>
                          {Quodrder_info
                            ? Quodrder_info?.today_order_converted_in_invoice
                            : 0}
                        </Text>
                      </View>
                    </Ripple>
                  </View>
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: '#fff',
                    }}>
                    <Ripple
                      rippleColor={colors.white}
                      rippleOpacity={0.5}
                      rippleDuration={800}
                      style={{
                        backgroundColor: colors.themecolor,
                        elevation: 5,
                        width: 'auto',
                        borderRadius: 10,
                        height: 120,
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 1.2,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 17,
                            textAlign: 'center',
                            color: colors.white,
                          }}>
                          Current Month
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          paddingHorizontal: 10,
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: colors.white,
                          flexDirection: 'row',
                          borderBottomWidth: 1,
                        }}>
                        <Text
                          style={{
                            flex: 1,
                            alignItems: 'flex-start',
                            fontFamily: 'NunitoSans_10pt-Bold',
                            fontSize: 19,
                            textAlign: 'center',
                            color: colors.themecolor,
                          }}>
                          Converted
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 19,
                            textAlign: 'center',
                            color: colors.themecolor,
                            flex: 1,
                            alignItems: 'flex-start',
                          }}>
                          {Quodrder_info
                            ? Quodrder_info?.monthly_quotation_converted
                            : 0}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: colors.white,
                          flexDirection: 'row',
                          paddingHorizontal: 10,
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                        }}>
                        <Text
                          style={{
                            flex: 1,
                            alignItems: 'flex-start',
                            fontFamily: 'NunitoSans_10pt-Bold',
                            fontSize: 19,
                            textAlign: 'center',
                            color: colors.themecolor,
                          }}>
                          Received
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 19,
                            textAlign: 'center',
                            color: colors.themecolor,
                            flex: 1,
                          }}>
                          {Quodrder_info
                            ? Quodrder_info?.monthly_order_converted_in_invoice
                            : 0}
                        </Text>
                      </View>
                    </Ripple>
                  </View>
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: '#fff',
                    }}>
                    <Ripple
                      rippleColor={colors.white}
                      rippleOpacity={0.5}
                      rippleDuration={800}
                      style={{
                        backgroundColor: colors.themecolor,
                        elevation: 5,
                        width: 'auto',
                        borderRadius: 10,
                        height: 120,
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 1.2,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 17,
                            textAlign: 'center',
                            color: colors.white,
                          }}>
                          Current F.Y.
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          paddingHorizontal: 10,
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: colors.white,
                          flexDirection: 'row',
                          borderBottomWidth: 1,
                        }}>
                        <Text
                          style={{
                            flex: 1,
                            alignItems: 'flex-start',
                            fontFamily: 'NunitoSans_10pt-Bold',
                            fontSize: 19,
                            textAlign: 'center',
                            color: colors.themecolor,
                          }}>
                          Converted
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 19,
                            textAlign: 'center',
                            color: colors.themecolor,
                            flex: 1,
                            alignItems: 'flex-start',
                          }}>
                          {Quodrder_info
                            ? Quodrder_info?.yearly_quotation_converted
                            : 0}
                        </Text>
                      </View>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: colors.white,
                          flexDirection: 'row',
                          paddingHorizontal: 10,
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                          flex: 1,
                        }}>
                        <Text
                          style={{
                            flex: 1,
                            alignItems: 'flex-start',
                            fontFamily: 'NunitoSans_10pt-Bold',
                            fontSize: 19,
                            textAlign: 'center',
                            color: colors.themecolor,
                          }}>
                          Received
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            alignItems: 'flex-start',
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 19,
                            textAlign: 'center',
                            color: colors.themecolor,
                          }}>
                          {Quodrder_info
                            ? Quodrder_info?.yearly_order_converted_in_invoice
                            : 0}
                        </Text>
                      </View>
                    </Ripple>
                  </View>
                </>
              )}
            </View>
          </View>

          <View style={{width: '95%', alignSelf: 'center', marginTop: 10}}>
            <Text
              style={{
                fontSize: 24,
                textAlign: 'center',
                fontFamily: 'NunitoSans_10pt-Bold',
                color: colors.themecolor,
                textTransform: 'uppercase',
              }}>
              overdue
            </Text>
            {Overdue_loading ? (
              <ActivityIndicator
                color={colors.themecolor1}
                size="large"
                style={{
                  marginBottom: '5%',
                }}
              />
            ) : (
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 10,
                  elevation: 10,
                  marginTop: 10,
                  borderRadius: 10,
                  marginBottom: '5%',
                }}>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: '#fff',
                  }}>
                  <Ripple
                    rippleColor={colors.white}
                    rippleOpacity={0.5}
                    rippleDuration={800}
                    style={{
                      backgroundColor: colors.themecolor,
                      elevation: 5,
                      width: 'auto',
                      borderRadius: 10,
                      height: 90,
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 2,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'NunitoSans_10pt-ExtraBold',
                          fontSize: 17,
                          textAlign: 'center',
                          color: colors.white,
                        }}>
                        30 Days
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.white,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'NunitoSans_10pt-ExtraBold',
                          fontSize: 19,
                          textAlign: 'center',
                          color: colors.themecolor,
                        }}>
                        {Overdue_info ? Overdue_info?.total_overdue_30_days : 0}
                      </Text>
                    </View>
                  </Ripple>
                </View>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: '#fff',
                  }}>
                  <Ripple
                    rippleColor={colors.white}
                    rippleOpacity={0.5}
                    rippleDuration={800}
                    style={{
                      backgroundColor: colors.themecolor,
                      elevation: 5,
                      width: 'auto',
                      borderRadius: 10,
                      height: 90,
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 2,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'NunitoSans_10pt-ExtraBold',
                          fontSize: 17,
                          textAlign: 'center',
                          color: colors.white,
                        }}>
                        60 Days
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.white,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'NunitoSans_10pt-ExtraBold',
                          fontSize: 19,
                          textAlign: 'center',
                          color: colors.themecolor,
                        }}>
                        {Overdue_info ? Overdue_info?.total_overdue_60_days : 0}
                      </Text>
                    </View>
                  </Ripple>
                </View>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: '#fff',
                  }}>
                  <Ripple
                    rippleColor={colors.white}
                    rippleOpacity={0.5}
                    rippleDuration={800}
                    style={{
                      backgroundColor: colors.themecolor,
                      elevation: 5,
                      width: 'auto',
                      borderRadius: 10,
                      height: 90,
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 2,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'NunitoSans_10pt-ExtraBold',
                          fontSize: 17,
                          textAlign: 'center',
                          color: colors.white,
                        }}>
                        60+ Days{' '}
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.white,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'NunitoSans_10pt-ExtraBold',
                          fontSize: 19,
                          textAlign: 'center',
                          color: colors.themecolor,
                        }}>
                        {Overdue_info
                          ? Overdue_info?.total_overdue_above_60_days
                          : 0}
                      </Text>
                    </View>
                  </Ripple>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default DashBoard;

const styles = StyleSheet.create({});
