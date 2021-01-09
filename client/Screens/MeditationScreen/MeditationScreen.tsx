import React from 'react';
import {View, SafeAreaView} from 'react-native';
import MeditationComponent from './MeditationComponent';

const Meditations = `
    query {
      meditations {
        contentUrl
        contentImg
        instructor
        category
        length
        title
        description
       id
      }
    }
  `;
interface MeditationProps {
  category?: string;
  contentUrl?: string;
  contentImg?: string;
  description?: string;
  id?: string;
  instructor?: string;
  title?: string;
  horizontal?: boolean;
  queryValue?: string;
  length?: string;
  dataProps?: string;
}

const Meditation: React.FC<MeditationProps> = ({horizontal = false}) => {
  return (
    <SafeAreaView>
      <View>
        <MeditationComponent
          dataProps={'meditations'}
          horizontal={false}
          queryValue={Meditations}
        />
      </View>
    </SafeAreaView>
  );
};

export default Meditation;
