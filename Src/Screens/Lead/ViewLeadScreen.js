import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import colors from '../../Utils/colors';
import metrics from '../../Utils/metrics';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {RadioButton} from 'react-native-paper';

const ViewLeadScreen = props => {
  const [data, setData] = useState(props.route.params.item);

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
          VIEW LEAD
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
              paddingHorizontal: 8,
            }}>
            Date<Text style={{color: 'red'}}>*</Text>
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
              padding: '3%',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {moment(data?.date).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: '2%'}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Customer Type<Text style={{color: 'red'}}>*</Text>
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
              padding: '3%',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {data?.customer_type == 1 ? 'Master' : 'Custom'}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: '2%'}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Customer<Text style={{color: 'red'}}>*</Text>
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
              padding: '3%',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {data?.master_customer
                ? data?.master_customer
                : data?.custom_customer}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: '2%'}}>
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
              padding: '3%',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {data?.address1 || ''}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: '2%'}}>
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
              padding: '3%',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {data?.address2 || ''}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: '2%'}}>
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
              padding: '3%',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {data?.address3 || ''}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: '2%'}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Country<Text style={{color: 'red'}}>*</Text>
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
              padding: '3%',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {data?.country_name?.name || ''}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: '2%'}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            State<Text style={{color: 'red'}}>*</Text>
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
              padding: '3%',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {data?.state_name?.name || ''}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: '2%'}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            City<Text style={{color: 'red'}}>*</Text>
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
              padding: '3%',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {data?.city_name?.name || ''}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: '2%'}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            PIN Code<Text style={{color: 'red'}}>*</Text>
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
              padding: '3%',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {data?.pincode || ''}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: '2%'}}>
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
              padding: '3%',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {data?.gstin || ''}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: '2%'}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Type Of Customer<Text style={{color: 'red'}}>*</Text>
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
              padding: '3%',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {data?.type_of_customers?.name || ''}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: '2%'}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Primary Type of Industry<Text style={{color: 'red'}}>*</Text>
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
              padding: '3%',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {data?.primary_type_of_industrys?.name || ''}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: '2%'}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Zone<Text style={{color: 'red'}}>*</Text>
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
              padding: '3%',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {data?.zone || ''}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: '2%'}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Segment<Text style={{color: 'red'}}>*</Text>
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
              padding: '3%',
            }}>
            {data?.segment?.split(',').map((item, index) => (
              <Text
                key={index}
                style={{
                  color: colors.black,
                  fontFamily: 'NunitoSans_10pt-SemiBold',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {item.trim()},
              </Text>
            ))}
          </View>
        </View>
        <View style={{marginHorizontal: '2%'}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Lead Source<Text style={{color: 'red'}}>*</Text>
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
              padding: '3%',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {data?.leadsources?.name || ''}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: '2%'}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Lead Stage<Text style={{color: 'red'}}>*</Text>
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
              padding: '3%',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {data?.leadstages?.name || ''}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: '2%'}}>
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
              padding: '3%',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {data?.probable_business_opportunity || ''}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: '2%'}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Latitude
            <Text
              style={{
                color: 'red',
              }}>
              *
            </Text>
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
              padding: '3%',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {data?.latitude || ''}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: '2%'}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Longitude
            <Text
              style={{
                color: 'red',
              }}>
              *
            </Text>
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
              padding: '3%',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {data?.longitude || ''}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: '2%'}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            Start Meeting(Time)
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
              padding: '3%',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {data?.start_meeting
                ? moment(data?.start_meeting, 'HH:mm:ss').format('h:mm:ss A')
                : '--:-- --'}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: '2%'}}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 18,
              fontFamily: 'NunitoSans_10pt-SemiBold',
              paddingHorizontal: 8,
            }}>
            End Meeting(Time)
          </Text>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.themecolor,
              marginTop: '2%',
              marginBottom: '5%',
              padding: '3%',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'NunitoSans_10pt-SemiBold',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {data?.end_meeting
                ? moment(data?.end_meeting, 'HH:mm:ss').format('h:mm:ss A')
                : '--:-- --'}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: '2%'}}>
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
            <RadioButton.Group value={data?.rating}>
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
        <View style={{marginHorizontal: '2%'}}>
          <FlatList
            data={data?.leadchild}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    marginHorizontal: '2%',
                    marginTop: '2%',
                    marginBottom: '5%',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: colors.themecolor,
                  }}>
                  <Text
                    style={{
                      color: colors.themecolor,
                      fontSize: 18,
                      fontFamily: 'NunitoSans_10pt-SemiBold',
                      paddingHorizontal: 8,
                    }}>
                    Contact Person
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
                      value={item?.name || ''}
                      editable={false}
                    />
                  </View>
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
                      marginHorizontal: '2%',
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: colors.themecolor,
                      marginTop: '2%',
                      marginBottom: '5%',
                    }}>
                    <TextInput
                      placeholder="Designation"
                      placeholderTextColor={colors.black}
                      style={{
                        fontSize: 16,
                        color: colors.black,
                      }}
                      keyboardType="default"
                      value={item?.designation || ''}
                      editable={false}
                    />
                  </View>
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
                      marginHorizontal: '2%',
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: colors.themecolor,
                      marginTop: '2%',
                      marginBottom: '5%',
                    }}>
                    <TextInput
                      placeholder="Enter Contact No."
                      placeholderTextColor={colors.black}
                      style={{
                        fontSize: 16,
                        color: colors.black,
                      }}
                      keyboardType="default"
                      value={item?.number || ''}
                      editable={false}
                    />
                  </View>
                </View>
              );
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack(null);
          }}
          style={{
            marginTop: metrics.HEIGHT * 0.02,
            marginBottom: metrics.HEIGHT * 0.02,
            alignSelf: 'center',
            backgroundColor: colors.themecolor,
            borderRadius: 15,
            padding: '4%',
          }}>
          <Text
            style={{
              color: colors.white,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            CLOSE
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ViewLeadScreen;
