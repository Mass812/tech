import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const width = Dimensions.get('screen').width;

interface PayMembershipBlockProps {}

const PayMembershipBlock: React.FC<PayMembershipBlockProps> = () => {
  const SignIn = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.columnLeft}>
        <Text style={styles.title}>Monthly Membership</Text>
        <Text style={styles.price}>$14.99 / month</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={SignIn}>
        <FontAwesomeIcon icon={faChevronRight} color={'black'} size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width - 40,
    height: 70,
    backgroundColor: 'white',
    zIndex: 1,
    borderRadius: 15,
    marginBottom: 20,
    padding: 20,
    flexDirection: 'row',
  },
  columnLeft: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '90%',
  },
  title: {
    fontSize: 15,
    color: 'rgb(239,150,128)',
    fontWeight: '700',
  },
  button: {
    width: 30,
  },
  price: {
    fontSize: 10,
    marginTop: 5,
  },
});
export default PayMembershipBlock;
