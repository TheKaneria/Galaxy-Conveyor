 const Data3 = [
  {id: 1, name: 'Overdue 30 Days', navigate: ''},
  {id: 2, name: 'Overdue 60 Days', navigate: ''},
  {id: 3, name: 'Overdue 60+ Days', navigate: ''},
];

const Data4 = [
  {
    id: 1,
    category: 'Quotation Generate',

    timeline: [
      {
        id: 1,
        name: 'Daily',
        Title: 'Daily Quotation Generated',
        subData: [{id: 1, quatationGenerated: 5}],
        total: 5,
      },
      {
        id: 2,
        name: 'Monthly',
        Title: 'Monthly Quotation Generated',
        subData: [{id: 1, quatationGenerated: 115}],
        total: 115,
      },
      {
        id: 3,
        name: 'Yearly',
        Title: 'Yearly Quotation Generated',
        subData: [{id: 1, quatationGenerated: 2245}],
        total: 2245,
      },
    ],
  },
  {
    id: 2,
    category: 'Order Converted',

    timeline: [
      {id: 4, name: 'Daily', Title: 'Daily Order Convertad', subData: []},
      {id: 5, name: 'Monthly', Title: 'Monthly Order Convertad', subData: []},
      {id: 6, name: 'Yearly', Title: 'Yearly Order Convertad', subData: []},
    ],
  },
  {
    id: 3,
    category: 'Order Received ',
    timeline: [
      {id: 7, name: 'Daily', Title: 'Daily Order Received', subData: []},
      {id: 8, name: 'Monthly', Title: 'Monthly Order Received', subData: []},
      {id: 9, name: 'Yearly', Title: 'Yearly Order Received', subData: []},
    ],
  },
];

 
 
 <View style={{width: '95%', alignSelf: 'center', marginTop: 20}}>
          <Text
            style={{
              fontSize: 24,
              textAlign: 'center',
              fontFamily: 'NunitoSans_10pt-Bold',
              color: colors.themecolor,
            }}>
            Production
          </Text>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 10,
              elevation: 10,
              marginTop: 10,
              borderRadius: 10,
              maxHeight: 300,
            }}>
            <FlatList
              data={Data2}
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <View style={{padding: 10, backgroundColor: '#fff'}}>
                    <Ripple
                      // onPress={() =>
                      //   props.navigation.navigate(`${item.navigate}`)
                      // }
                      rippleColor={colors.white}
                      rippleOpacity={0.5}
                      rippleDuration={1000}
                      style={{
                        backgroundColor: colors.themecolor,
                        elevation: 5,
                        width: 'auto',
                        flexDirection: 'row',
                        borderRadius: 10,
                        height: 90,
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          flex: 3,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 18,
                            textAlign: 'center',
                            color: colors.white,
                          }}>
                          {item.name}
                        </Text>
                      </View>
                      <View
                        style={{
                          alignItems: 'center',
                          flex: 2,
                          backgroundColor: colors.white,
                          borderBottomRightRadius: 10,
                          borderTopRightRadius: 10,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 18,
                            textAlign: 'center',
                            color: colors.themecolor,
                          }}>
                          {item.prod}
                          {'\n'}
                          (meters)
                        </Text>
                      </View>
                    </Ripple>
                  </View>
                );
              }}
            />
          </View>
        </View>

        <View style={{width: '95%', alignSelf: 'center', marginVertical: 20}}>
          <Text
            style={{
              fontSize: 24,
              textAlign: 'center',
              fontFamily: 'NunitoSans_10pt-Bold',
              color: colors.themecolor,
            }}>
            Overdue
          </Text>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 10,
              elevation: 10,
              marginTop: 10,
              borderRadius: 10,
            }}>
            <FlatList
              data={Data3}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: '#fff',
                    }}>
                    <Ripple
                      // onPress={() =>
                      //   props.navigation.navigate(`${item.navigate}`)
                      // }
                      rippleColor={colors.themecolor}
                      rippleOpacity={0.1}
                      rippleDuration={800}
                      style={{
                        backgroundColor: colors.white,
                        elevation: 5,
                        width: 'auto',
                        borderRadius: 10,
                        height: 90,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <IconButton
                          icon="calendar-clock"
                          size={25}
                          iconColor={colors.themecolor}
                        />
                      </View>
                      <View
                        style={{
                          alignItems: 'center',
                          flex: 4,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'NunitoSans_10pt-ExtraBold',
                            fontSize: 18,
                            textAlign: 'center',
                            color:
                              item.name === 'Overdue 30 Days'
                                ? '#1BA345'
                                : item.name === 'Overdue 60 Days'
                                ? '#F7BD01'
                                : item.name === 'Overdue 60+ Days'
                                ? '#F70506'
                                : colors.themecolor,
                          }}>
                          {item.name}
                        </Text>
                      </View>
                      {/* <View
                        style={{
                          flex: 1,
                          height: 90,
                          borderTopRightRadius: 10,
                          borderBottomRightRadius: 10,
                          backgroundColor:
                            item.name === 'Overdue 30 Days'
                              ? '#1BA345'
                              : item.name === 'Overdue 60 Days'
                              ? '#F7BD01'
                              : item.name === 'Overdue 60+ Days'
                              ? '#F70506'
                              : colors.themecolor,
                        }}></View> */}
                    </Ripple>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <View style={{width: '95%', alignSelf: 'center', marginBottom: '5%'}}>
          <Text
            style={{
              fontSize: 24,
              textAlign: 'center',
              fontFamily: 'NunitoSans_10pt-Bold',
              color: colors.themecolor,
            }}>
            Order & Quotation
          </Text>

          <Dropdown
            style={{
              height: 50,
              borderColor: 'rgba(0,0, 0, 0.03)',
              borderWidth: 0.5,
              backgroundColor: 'rgba(0,0, 0, 0.03)',
              borderRadius: 8,
              paddingHorizontal: 8,
              marginTop: '5%',
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
            containerStyle={{
              backgroundColor: '#393E46',
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
            data={Data4}
            maxHeight={300}
            labelField="category"
            valueField="id"
            placeholder={'Select Category'}
            value={category}
            onChange={item => {
              setTime(item.timeline);
            }}
          />

          <Dropdown
            style={{
              height: 50,
              borderColor: 'rgba(0,0, 0, 0.03)',
              borderWidth: 0.5,
              backgroundColor: 'rgba(0,0, 0, 0.03)',
              borderRadius: 8,
              paddingHorizontal: 8,
              marginTop: '5%',
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
            placeholder={'Select Time Period'}
            value={timeline}
            onChange={item => {
              setTitle(item.Title);
              setSubData(item.subData);
              setTotal(item.total);
            }}
          />
        </View>

        {/* {subdata.length > 0 ? ( */}
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            marginBottom: '5%',
            padding: 10,
            elevation: 10,
            backgroundColor: colors.white,
            borderRadius: 10,
          }}>
          {Title ? (
            <View
              style={{
                marginVertical: '2%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,.1)',
                paddingVertical: 5,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  fontFamily: 'NunitoSans_10pt-ExtraBold',
                  fontSize: 17,
                  color: colors.themecolor,
                }}>
                {Title}
              </Text>
            </View>
          ) : null}

          <FlatList
            data={subdata}
            renderItem={({item, index}) => {
              return (
                <View style={{padding: 10, backgroundColor: '#fff'}}>
                  <Ripple
                    style={{
                      //elevation: 5,
                      width: 'auto',
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'NunitoSans_10pt-SemiBold',
                        fontSize: 16,
                        textAlign: 'center',
                        color: colors.themecolor,
                      }}>
                      No. of Quotation Generated :
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'NunitoSans_10pt-ExtraBold',
                        fontSize: 16,
                        textAlign: 'center',
                        color: colors.themecolor,
                      }}>
                      {' '}
                      {item.quatationGenerated}
                    </Text>
                  </Ripple>
                </View>
              );
            }}
            ListEmptyComponent={() => {
              return (
                <View style={{alignItems: 'center', marginVertical: '5%'}}>
                  <Text
                    style={{
                      fontFamily: 'NunitoSans_10pt-Bold',
                      color: 'red',
                    }}>
                    Data Not Available...!!!
                  </Text>
                </View>
              );
            }}
          />
          {total ? (
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'NunitoSans_10pt-Bold',
                color: colors.themecolor,
                fontSize: 16,
              }}>
              Total : {total}
            </Text>
          ) : null}
        </View>
        {/* ) : null} */}