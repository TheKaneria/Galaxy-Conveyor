import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Linking,
  RefreshControl,
} from 'react-native';
import colors from '../../Utils/colors';
import metrics from '../../Utils/metrics';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTadaContext} from '../../Context/tada_context';
import Modal from 'react-native-modal';

const TadaScreen = props => {
  const {
    GetTadalist,
    tadalist,
    tada_loading,
    DeleteTadalist,
    delete_loading,
    Getexpenselist,
  } = useTadaContext();
  const [deletemodal, setDeleteModal] = useState(false);
  const [mainid, setMainId] = useState('');

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      GetTadalist(props);
      Getexpenselist(props);
    });
    return unsubscribe;
  }, [props]);

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

  const renderItem = ({item, index}) => {
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
            marginHorizontal: '2%',
            marginTop: metrics.HEIGHT * 0.01,
          }}>
          <Text
            style={{
              color: colors.themecolor,
              fontFamily: 'NunitoSans_10pt-ExtraBold',
              fontSize: 18,
            }}>
            Expense Head :{' '}
          </Text>
          <Text
            style={{
              color: colors.black,
              fontFamily: 'NunitoSans_10pt-ExtraBold',
              fontSize: 18,
            }}>
            {item?.expenseheads?.name || ''}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: '2%',
            marginTop: metrics.HEIGHT * 0.01,
          }}>
          <Text
            style={{
              color: colors.themecolor,
              fontFamily: 'NunitoSans_10pt-ExtraBold',
              fontSize: 18,
            }}>
            Amount({'\u20B9'}) :{' '}
          </Text>
          <Text
            style={{
              color: colors.black,
              fontFamily: 'NunitoSans_10pt-ExtraBold',
              fontSize: 18,
            }}>
            {item?.amount || 0}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: '2%',
            marginTop: metrics.HEIGHT * 0.01,
          }}>
          <Text
            style={{
              color: colors.themecolor,
              fontFamily: 'NunitoSans_10pt-ExtraBold',
              fontSize: 18,
            }}>
            Attachment :{' '}
          </Text>
          {item?.attachment_full_path ? (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(item?.attachment_full_path);
              }}>
              <FontAwesome
                name="download"
                size={25}
                color={colors.themecolor}
              />
            </TouchableOpacity>
          ) : (
            <Text
              style={{
                color: colors.black,
                fontFamily: 'NunitoSans_10pt-ExtraBold',
                fontSize: 18,
              }}>
              N/A
            </Text>
          )}
        </View>
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
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ADDTadaScreen', {
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
            <MaterialIcons name="delete" size={25} color={colors.themecolor1} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onRefresh = () => {
    GetTadalist(props);
  };

  const DeleteApi = () => {
    const formdata = new FormData();
    formdata.append('id', mainid);
    DeleteTadalist(formdata, props);
    setDeleteModal(false);
    setMainId('');
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
          TA/DA
        </Text>
      </View>
      {tada_loading ? (
        <ActivityIndicator
          color={colors.themecolor1}
          size="large"
          style={{flex: 1}}
        />
      ) : (
        <>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={tada_loading} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                marginTop: metrics.HEIGHT * 0.03,
                marginHorizontal: '5%',
              }}>
              <FlatList
                data={tadalist}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={noDataFoundView}
              />
            </View>

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
                        DeleteApi();
                      }}
                      disabled={delete_loading ? true : false}
                      style={{
                        flex: 1,
                        paddingVertical: 15,
                        alignItems: 'center',
                      }}>
                      {delete_loading ? (
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
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ADDTadaScreen', {
                item: '',
              });
            }}
            style={{
              marginTop: metrics.HEIGHT * 0.02,
              marginHorizontal: '5%',
              backgroundColor: colors.themecolor,
              alignSelf: 'flex-end',
              borderRadius: 50,
              padding: '4%',
              bottom: '2%',
              elevation: 3,
            }}>
            <Feather name="plus" size={30} color={colors.white} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default TadaScreen;
