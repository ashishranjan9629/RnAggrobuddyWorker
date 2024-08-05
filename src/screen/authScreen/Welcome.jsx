import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppColor from '../../utils/AppColor';
import LottieView from 'lottie-react-native';
import {responsive} from '../../utils/responsive';
import CustomButton from '../../components/CustomButton';
import DeviceInfo from 'react-native-device-info';

const Welcome = () => {
  return (
    <ScrollView style={styles.main}>
      <View style={styles.animationHolder}>
        <LottieView
          source={require('../../assets/animation/worker.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
      <View style={styles.textHolder}>
        <Text style={styles.text}>
          Welcome to the worker app of the Aggrobuddy
        </Text>
        <Text style={styles.subText}>
          Discover the seamless bridge between the farmer, farm workers, and
          merchant with farmer and market connect!. Aggrobuddy simplifies the
          process of connecting these crucial player in the agricultural
          ecosystem ensuring farm produce reaches consumers efficiently.
        </Text>
        <View style={styles.buttonHolder}>
          <CustomButton
            title={'Registration'}
            color={AppColor.dark_Yellow}
            handleAction={() =>
              console.log('Clicked on the Registration Button')
            }
          />
          <CustomButton
            title={'Worker Login'}
            color={AppColor.dark_Yellow}
            handleAction={() => console.log('Clicked on the Login Button')}
          />
        </View>
      </View>
      <View>
        <Text style={styles.versionText}>Version Text : - {DeviceInfo.getVersion()} </Text>
      </View>
    </ScrollView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.primary,
  },
  animationHolder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    height: responsive(400),
    width: '100%',
  },
  textHolder: {
    marginVertical: responsive(20),
    padding: responsive(10),
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    gap: responsive(10),
  },
  text: {
    fontSize: responsive(20),
    color: AppColor.white,
    textAlign: 'center',
    lineHeight: responsive(30),
    letterSpacing: responsive(1),
    fontFamily: 'Roboto-Bold',
  },
  subText: {
    fontSize: responsive(18),
    textAlign: 'center',
    color: AppColor.success,
    lineHeight: responsive(30),
    letterSpacing: responsive(1),
    fontFamily: 'Roboto-Medium',
  },
  buttonHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  versionText: {
    fontSize:responsive(16),
    color:AppColor.white,
    fontFamily:'Roboto-Medium',
    textAlign:'center',
    marginVertical:responsive(10),
    width:'100%'
  },
});
