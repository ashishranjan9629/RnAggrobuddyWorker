import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AppColor from '../utils/AppColor';
import {responsive} from '../utils/responsive';
import Feather from 'react-native-vector-icons/Feather';
import Data from '../assets/json/EducationSequence.json';
import AntDesign from 'react-native-vector-icons/AntDesign';
const EducationModal = ({visible, onClose, onConfirm}) => {
  const [search, setSearch] = useState('');

  const filteredData = Data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSearchText = item => {
    onClose();
    if (typeof onConfirm === 'function') {
      onConfirm(item);
    } else {
      console.log('OnConfirm is not function');
    }
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.itemHolder}
        onPress={() => handleSearchText(item)}>
        <Text style={{color: AppColor.black}}>{item.name}</Text>
        <AntDesign
          name="caretright"
          size={responsive(20)}
          color={AppColor.primary}
        />
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={responsive(25)} color={AppColor.black} />
          </TouchableOpacity>
          {/* Search Box */}
          <TextInput
            placeholder="Search Education"
            style={styles.textInputBox}
            placeholderTextColor={AppColor.primary}
            value={search}
            onChangeText={text => setSearch(text)}
          />
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          <TouchableOpacity
            style={[styles.textInputBox, {backgroundColor: AppColor.primary}]}
            onPress={onClose}>
            <Text style={styles.text}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EducationModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: AppColor.white,
    padding: responsive(20),
    borderTopLeftRadius: responsive(20),
    borderTopRightRadius: responsive(20),
    gap: responsive(20),
    flex: 0.6,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  textInputBox: {
    color: AppColor.primary,
    fontFamily: 'OpenSans-Medium',
    fontSize: responsive(20),
    borderWidth: 2,
    padding: responsive(10),
    borderRadius: responsive(5),
    borderColor: AppColor.primary,
  },
  itemHolder: {
    borderWidth: 1,
    padding: responsive(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: responsive(5),
    borderRadius: responsive(5),
    borderColor: AppColor.primary,
    alignItems: 'center',
  },
  text: {
    fontSize: responsive(20),
    color: AppColor.white,
    textAlign: 'center',
  },
});
