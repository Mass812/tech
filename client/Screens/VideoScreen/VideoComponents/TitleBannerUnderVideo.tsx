import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMusic} from '@fortawesome/free-solid-svg-icons';
import {LessonScreenStore} from '../VideoScreen';

interface TitleBannerUnderVideoProps {}

const TitleBannerUnderVideo: React.FC<TitleBannerUnderVideoProps> = ({}) => {
  const {state, dispatch} = useContext(LessonScreenStore);

  const handleSpotifyOnPress = () => {};
  console.log(state);
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 14,
        alignContent: 'center',
        width: '100%',
        height: 100,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 23, marginTop: 10, color: 'black'}}>
          {state.title}
        </Text>
        <View style={styles.timeTarget}>
          <Text style={{fontSize: 16, color: 'grey'}}>
            {state.totalPlayerTimeAsString}
          </Text>
          <Text style={styles.dot}> • </Text>
          <Text style={{fontSize: 16, color: 'grey'}}>Target Here</Text>
        </View>
      </View>

      <View
        style={{
          display: 'flex',
          paddingTop: 25,
          justifyContent: 'flex-start',
        }}>
        <TouchableOpacity onPress={handleSpotifyOnPress}>
          <FontAwesomeIcon icon={faMusic} size={22} color={'teal'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
  },
  title: {
    fontSize: 20,
    color: 'green',
  },
  timeTarget: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  dot: {
    fontSize: 18,
    alignSelf: 'center',
  },
});
export default TitleBannerUnderVideo;
