import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SgVideoStore} from '../../../Context/SgVideoContext';

interface TitleBannerUnderVideoProps {}

const TitleBannerUnderVideo: React.FC<TitleBannerUnderVideoProps> = ({}) => {
  const {state, dispatch} = useContext(SgVideoStore);

  return (
    <View style={styles.thinHeaderBanner}>
      <Text style={styles.leftText}>
        Exercises Left: {state.exerciseSections.length - state.sectionNumber}
      </Text>
      <Text style={styles.rightText}>
        {state.exerciseSections.length} Exercises
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  thinHeaderBanner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 35,
    backgroundColor: 'rgba(230, 230, 230, 0.99)',
    alignItems: 'center',
    padding: 5,
  },
  leftText: {
    paddingLeft: 6,
    fontWeight: '400',
    fontSize: 14,
  },
  rightText: {
    paddingLeft: 6,
    fontWeight: '400',
    fontSize: 14,
  },
});
export default TitleBannerUnderVideo;
