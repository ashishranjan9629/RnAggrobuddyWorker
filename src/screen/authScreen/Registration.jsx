import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Modal from 'react-native-modal';
import AppColor from '../../utils/AppColor';
import {responsive} from '../../utils/responsive';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EducationModal from '../../components/EducationModal';
import RangeSlider from 'rn-range-slider';
import Thumb from '../../utils/Thumb';
import Rail from '../../utils/Rail';
import RailSelected from '../../utils/RailSelected';
import Label from '../../utils/Label';
import Notch from '../../utils/Notch';
import CustomButton from '../../components/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePath from '../../utils/ImagePath';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const Registration = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [age, setAge] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [landmark, setLandmark] = useState('');
  const [address, setAddress] = useState('');
  const [education, setEducation] = useState('');
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [miniDailyRate, setMinDailyRate] = useState('');
  const [maxDailyRate, setMaxDailyRate] = useState('');
  const [minHours, setMinHours] = useState('');
  const [maxHours, setMaxHours] = useState('');
  const [workType, setWorkType] = useState('');
  const [showWorkTypeModal, setShowWorkTypeModal] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);

  const toggleGenderModal = () => {
    setShowGenderModal(!showGenderModal);
  };
  const handleEducationType = item => {
    setEducation(item.name);
  };
  const toggleWorkModal = () => {
    setShowWorkTypeModal(!showWorkTypeModal);
  };

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low, high) => {
    setMinDailyRate(low);
    setMaxDailyRate(high);
  }, []);
  const handleWorkHoursChange = useCallback((low, high) => {
    setMinHours(low);
    setMaxHours(high);
  }, []);

  const handleSubmit = () => {
    console.log(
      'Clicked on the registration Button',
      name,
      mobile,
      email,
      gender,
      age,
      pinCode,
      state,
      city,
      landmark,
      address,
      education,
      minHours,
      maxHours,
      miniDailyRate,
      maxDailyRate,
      workType
    );
  };
  const galleryOpen = async () => {
    try {
      const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      };
      launchImageLibrary(options, async response => {
        if (response.didCancel) {
          console.log('Image Picker is cancel');
        } else if (response.error) {
          console.log('error');
        } else {
          let imageUri = response.uri || response.assets[0]?.uri;
          setShowImageModal(false);
          setProfileImage(imageUri);
        }
      });
    } catch (error) {
      console.log(error, 'Line 88');
    }
  };
  const CameraOpen = async () => {
    try {
      const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
        cameraType: 'front',
        saveToPhotos: true,
        quality: 1,
      };
      launchCamera(options, async response => {
        if (response.didCancel) {
          console.log('User cancel Camera');
        } else if (response.error) {
          console.log('Camera Error', response.error);
        } else {
          let imageUri = response.uri || response.assets[0]?.uri;
          setShowImageModal(false);
          setProfileImage(imageUri);
        }
      });
    } catch (error) {
      console.log('Error in opening Camera', error.message);
    }
  };

  const handleModal = () => {
    setShowImageModal(!showImageModal);
  };
  return (
    <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
      <SafeAreaView style={{backgroundColor: AppColor.primary}} />
      {/* Profile Picture */}
      <TouchableOpacity
        onPress={() => setShowImageModal(!showImageModal)}
        style={{marginTop: responsive(40)}}>
        {profileImage ? (
          <Image
            source={{uri: profileImage}}
            resizeMode="cover"
            style={styles.image}
          />
        ) : (
          <Image
            source={ImagePath.worker}
            resizeMode="cover"
            style={styles.image}
          />
        )}
      </TouchableOpacity>
      <View style={styles.headerHolder}>
        <Text style={styles.headerText}>Registration Form</Text>
        {/* Name Section */}
        <View style={styles.inputHolder}>
          <Text style={styles.labelText}>Name</Text>
          <TextInput
            placeholder={'Name'}
            value={name}
            placeholderTextColor={AppColor.black}
            style={styles.textInputBox}
            onChangeText={text => setName(text)}
          />
        </View>
        {/* Mobile Section */}
        <View style={styles.inputHolder}>
          <Text style={styles.labelText}>Mobile Number</Text>
          <TextInput
            placeholder={'Mobile Number'}
            value={mobile}
            placeholderTextColor={AppColor.black}
            style={styles.textInputBox}
            onChangeText={text => setMobile(text)}
            keyboardType="number-pad"
            maxLength={10}
          />
        </View>
        {/* Email Section */}
        <View style={styles.inputHolder}>
          <Text style={styles.labelText}>Email Id</Text>
          <TextInput
            placeholder={'Email Address'}
            value={email}
            placeholderTextColor={AppColor.black}
            style={styles.textInputBox}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
          />
        </View>
        {/* Gender Section */}
        <TouchableOpacity
          style={styles.inputHolder}
          onPress={() => setShowGenderModal(true)}>
          <Text style={styles.labelText}>Select Gender</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholder={'Select Gender'}
              value={gender}
              placeholderTextColor={AppColor.black}
              editable={false}
              style={[styles.textInputBox, {width: '85%'}]}
              onChangeText={text => setGender(text)}
            />
            <AntDesign
              name="caretdown"
              size={responsive(25)}
              color={AppColor.primary}
            />
          </View>
        </TouchableOpacity>
        {/* Age */}
        <View style={styles.inputHolder}>
          <Text style={styles.labelText}>Age</Text>
          <TextInput
            placeholder={'Age'}
            value={age}
            placeholderTextColor={AppColor.black}
            style={styles.textInputBox}
            maxLength={2}
            keyboardType="number-pad"
            onChangeText={text => setAge(text)}
          />
        </View>
        {/* Address */}
        <Text style={styles.headerText}>Address</Text>
        {/* Pin Code */}
        <View style={styles.inputHolder}>
          <Text style={styles.labelText}>Pin COde</Text>
          <TextInput
            placeholder={'Pin Code'}
            value={pinCode}
            placeholderTextColor={AppColor.black}
            style={styles.textInputBox}
            maxLength={6}
            keyboardType="number-pad"
            onChangeText={text => setPinCode(text)}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {/* State */}
          <View style={[styles.inputHolder, {width: '45%'}]}>
            <Text style={styles.labelText}>State</Text>
            <TextInput
              placeholder={'State'}
              value={state}
              placeholderTextColor={AppColor.black}
              style={styles.textInputBox}
              keyboardType="default"
              onChangeText={text => setState(text)}
            />
          </View>
          {/* City */}
          <View style={[styles.inputHolder, {width: '45%'}]}>
            <Text style={styles.labelText}>City</Text>
            <TextInput
              placeholder={'City'}
              value={city}
              placeholderTextColor={AppColor.black}
              style={styles.textInputBox}
              keyboardType="default"
              onChangeText={text => setCity(text)}
            />
          </View>
        </View>
        {/* LandMark */}
        <View style={styles.inputHolder}>
          <Text style={styles.labelText}>Landmark</Text>
          <TextInput
            placeholder={'Landmark'}
            value={landmark}
            placeholderTextColor={AppColor.black}
            style={styles.textInputBox}
            onChangeText={text => setLandmark(text)}
          />
        </View>
        {/* Address */}
        <View style={styles.inputHolder}>
          <Text style={styles.labelText}>Address</Text>
          <TextInput
            placeholder={'Address'}
            value={address}
            placeholderTextColor={AppColor.black}
            style={styles.textInputBox}
            onChangeText={text => setAddress(text)}
          />
        </View>
        {/* Work Details */}
        <Text style={styles.headerText}>Work Details </Text>
        <TouchableOpacity
          style={styles.inputHolder}
          onPress={() => setShowEducationModal(!showEducationModal)}>
          <Text style={styles.labelText}>Select Education</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholder="Select Education"
              value={education}
              placeholderTextColor={AppColor.black}
              style={[styles.textInputBox, {width: '85%'}]}
              editable={false}
              onChangeText={text => setEducation(text)}
            />
            <AntDesign
              name="caretdown"
              size={responsive(25)}
              color={AppColor.primary}
            />
          </View>
        </TouchableOpacity>
        {/* minimum and maximum work Rate */}
        <View style={styles.inputHolder}>
          <Text style={styles.labelText}>
            Select the minimum and maximum work rate
          </Text>
          {/* Slider */}
          <RangeSlider
            style={styles.slider}
            min={0}
            max={100}
            step={1}
            floatingLabel
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
          />
          <View style={styles.amountHolder}>
            <Text style={styles.text}>
              Minimum Wage: - Rs.{miniDailyRate * 10}{' '}
            </Text>
            <Text style={styles.text}>
              Maximum Wage: - Rs.{maxDailyRate * 10}{' '}
            </Text>
          </View>
        </View>
        {/* minimum and maximum work hours */}
        <View style={styles.inputHolder}>
          <Text style={styles.labelText}>
            Select the minimum and maximum work hours
          </Text>
          {/* Slider */}
          <RangeSlider
            style={styles.slider}
            min={0}
            max={10}
            step={1}
            floatingLabel
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleWorkHoursChange}
          />
          <View style={styles.amountHolder}>
            <Text style={styles.text}>Minimum Hours: {minHours}</Text>
            <Text style={styles.text}>Maximum Hours: {maxHours}</Text>
          </View>
        </View>
        {/* Work Type Indoor or Outdoor */}
        <TouchableOpacity
          style={styles.inputHolder}
          onPress={() => setShowWorkTypeModal(!showWorkTypeModal)}>
          <Text style={styles.labelText}>Select Work Type</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholder="Select Work type"
              value={workType}
              placeholderTextColor={AppColor.black}
              style={[styles.textInputBox, {width: '85%'}]}
              editable={false}
              onChangeText={text => setWorkType(text)}
            />
            <AntDesign
              name="caretdown"
              size={responsive(25)}
              color={AppColor.primary}
            />
          </View>
        </TouchableOpacity>
        <CustomButton
          title={'Registration'}
          color={AppColor.dark_Green}
          handleAction={handleSubmit}
        />
      </View>
      <Modal isVisible={showGenderModal}>
        <View style={styles.modelContainer}>
          <Text style={styles.modelText}>Select Gender</Text>
          {/* Male */}
          <TouchableOpacity
            onPress={() => {
              setGender('Male');
              toggleGenderModal();
            }}
            style={styles.buttonHolder}>
            <FontAwesome
              name="male"
              color={AppColor.white}
              size={responsive(25)}
            />
            <Text style={styles.buttonText}>Male</Text>
          </TouchableOpacity>
          {/* Female */}
          <TouchableOpacity
            onPress={() => {
              setGender('Female');
              toggleGenderModal();
            }}
            style={styles.buttonHolder}>
            <FontAwesome
              name="female"
              color={AppColor.white}
              size={responsive(25)}
            />
            <Text style={styles.buttonText}>Female</Text>
          </TouchableOpacity>
          {/* Cancel Button */}
          <TouchableOpacity
            onPress={() => {
              setGender('Other');
              toggleGenderModal();
            }}
            style={styles.buttonHolder}>
            <Text style={styles.buttonText}>Other</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* Education Modal */}
      <EducationModal
        visible={showEducationModal}
        onClose={() => setShowEducationModal(!showEducationModal)}
        onConfirm={item => handleEducationType(item)}
      />
      {/* Modal for the WorkType */}
      <Modal isVisible={showWorkTypeModal}>
        <View style={styles.modelContainer}>
          <Text style={styles.modelText}>Select Work Type</Text>
          <TouchableOpacity
            style={styles.buttonHolder}
            onPress={() => {
              setWorkType('Indoor');
              toggleWorkModal();
            }}>
            <MaterialIcons
              name="camera-indoor"
              size={responsive(25)}
              color={AppColor.white}
            />
            <Text style={styles.buttonText}>Outdoor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonHolder}
            onPress={() => {
              setWorkType('Outdoor');
              toggleWorkModal();
            }}>
            <MaterialIcons
              name="camera-outdoor"
              size={responsive(25)}
              color={AppColor.white}
            />
            <Text style={styles.buttonText}>Indoor</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* Modal for the Image Picker */}
      <Modal isVisible={showImageModal}>
        <View style={styles.modelContainer}>
          <Text style={styles.modelText}>Upload Profile Picture</Text>
          <TouchableOpacity style={styles.buttonHolder} onPress={galleryOpen}>
            <MaterialIcons
              name="photo-library"
              size={responsive(25)}
              color={AppColor.white}
            />
            <Text style={styles.buttonText}>Open Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonHolder} onPress={CameraOpen}>
            <MaterialIcons
              name="camera-alt"
              size={responsive(25)}
              color={AppColor.white}
            />
            <Text style={styles.buttonText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonHolder} onPress={handleModal}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Registration;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.primary,
  },
  headerHolder: {
    width: '95%',
    alignSelf: 'center',
    paddingTop: responsive(10),
    marginTop: responsive(10),
  },
  headerText: {
    fontSize: responsive(20),
    color: AppColor.white,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
  },
  inputHolder: {
    borderWidth: 1,
    width: '100%',
    alignSelf: 'center',
    borderRadius: responsive(5),
    borderColor: AppColor.white,
    backgroundColor: AppColor.white,
    marginVertical: responsive(10),
  },
  labelText: {
    color: AppColor.black,
    fontSize: responsive(16),
    fontFamily: 'Roboto-Medium',
    margin: responsive(10),
    marginBottom: 0,
  },
  textInputBox: {
    margin: responsive(10),
    color: AppColor.black,
    fontSize: responsive(18),
    fontFamily: 'Roboto-Medium',
    marginTop: 0,
  },
  modelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    width: '90%',
    alignSelf: 'center',
    padding: responsive(20),
    backgroundColor: AppColor.white,
    borderRadius: responsive(10),
    gap: responsive(20),
  },
  modelText: {
    fontSize: responsive(22),
    color: AppColor.black,
    fontFamily: 'Roboto-Medium',
  },
  buttonHolder: {
    borderWidth: 2,
    width: '80%',
    alignItems: 'center',
    padding: responsive(10),
    alignSelf: 'center',
    borderRadius: responsive(10),
    borderColor: AppColor.primary,
    backgroundColor: AppColor.primary,
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
  buttonText: {
    color: AppColor.white,
    fontSize: responsive(18),
    fontFamily: 'Roboto-Medium',
  },
  slider: {
    width: '90%',
    alignSelf: 'center',
    padding: responsive(5),
    marginVertical: responsive(10),
  },
  amountHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsive(10),
    padding: 10,
  },
  text: {
    fontSize: responsive(16),
    color: AppColor.black,
    fontFamily: 'Roboto-Medium',
  },
  image: {
    height: responsive(200),
    width: responsive(200),
    alignSelf: 'center',
    borderRadius: responsive(100),
  },
});
