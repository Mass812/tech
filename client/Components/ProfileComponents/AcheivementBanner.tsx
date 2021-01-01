import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClock, faRunning, faTrophy} from '@fortawesome/free-solid-svg-icons';

interface AcheivementProps {
  subject?: string;
  dataPoints?: string;
}

const Acheivement: React.FC<AcheivementProps> = () => {
  

  
  
  
  
    return (
    <View style={styles.parent}>
      <Text style={styles.title}>WEEKLY PROGRESS</Text>
      <View style={styles.badgeRow}>
{/*      1    */}
        <View style={styles.iconColumn}>
           
            <View style={styles.iconHalo}>
          <FontAwesomeIcon icon={faClock} size={30} color={'#0896a3'}/>
            </View>
          <Text style={styles.detailTitle}>Time</Text>
          <View>
            <Text>3 hrs 12 min</Text>
          </View>
        </View>
{/*      2    */}
        <View style={styles.iconColumn}>
        <View style={styles.iconHalo}>
          <FontAwesomeIcon icon={faRunning} size={30} color={'#0896a3'}/>
            </View>
          <Text style={styles.detailTitle}>Time</Text>
          <View>
            <Text>3 hrs 12 min</Text>
          </View>
        </View>
{/*      3    */}
        <View style={styles.iconColumn}>
        <View style={styles.iconHalo}>
          <FontAwesomeIcon icon={faTrophy} size={30} color={'#0896a3'}/>
            </View>
          <Text style={styles.detailTitle}>Time</Text>
          <View>
            <Text>3 hrs 12 min</Text>
          </View>
        </View>
      
      
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    borderColor: 'grey',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
 
    
  },
  title: {
    fontSize: 18,
    color: 'grey',
    marginBottom: 15,
    letterSpacing: 4
  },
  badgeRow: {
      borderTopColor: 'grey',
      borderTopWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    height: 130,
    width: '100%',
    justifyContent: 'space-evenly',
    padding: 1
  },
  iconColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 130,
    justifyContent: 'center',
    padding: 5
  },
  iconHalo: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#83c0c9',
      borderRadius: 30, 
      height: 60,
      width: 60,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10
     
  },
  detailTitle: {
    margin: 0,
    

  },
});

export default Acheivement;
