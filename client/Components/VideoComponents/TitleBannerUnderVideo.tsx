import {TextBase} from 'react-native';

import * as React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faPlayCircle,
  faPauseCircle,
  faArrowCircleLeft,
} from '@fortawesome/free-solid-svg-icons';

interface TitleBannerUnderVideoProps {
  width: number;
  title: string;
  length: string;
  playAction: () => void;
}

const TitleBannerUnderVideo: React.FC<TitleBannerUnderVideoProps> = ({
  width,
  title,
  length,
  playAction,
}) => {
  return (
    <View
      style={{
        // display: 'flex',
        flexDirection: 'row',
        padding: 14,
        alignContent: 'center',
        // minWidth: '100%',
        width: width,
        height: 100,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 23, marginTop: 10, color: 'green'}}>
          {title}
        </Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{fontSize: 16, color: 'grey'}}>{length}</Text>
          <Text style={{fontSize: 18, alignSelf: 'center'}}> •</Text>
          <Text style={{fontSize: 16, color: 'grey'}}>Target Here</Text>
        </View>
      </View>

      <View
        style={{
          display: 'flex',
          paddingTop: 25,
          justifyContent: 'flex-start',
        }}>
        <TouchableOpacity onPress={playAction}>
          <FontAwesomeIcon icon={faPlayCircle} size={30} />
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
  },
  title: {
    fontSize: 20,
    color: 'green',
  },
});
export default TitleBannerUnderVideo;
