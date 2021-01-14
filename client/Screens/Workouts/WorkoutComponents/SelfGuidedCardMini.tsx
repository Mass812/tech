import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

interface SelfGuidedCardMiniProps {
  img: string;
  title: string;
  length: string;
  category: string;
}

const SelfGuidedCardMini: React.FC<SelfGuidedCardMiniProps> = ({
  img,
  title,
  length,
  category,
}) => {
  return (
    <View style={styles.cardParent}>
      <View style={styles.card}>
        <View>
          <Image
            source={{
              uri: img,
            }}
            style={styles.img}
          />
        </View>
        <View style={styles.detailBlock}>
          <Text style={styles.detailTitle}>{title}</Text>
          <View style={styles.textDetailRow}>
            <Text style={styles.detailText}>{category}</Text>
            <Text> • </Text>
            <Text style={styles.detailText}>{length}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardParent: {
    marginBottom: 15,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
  },
  img: {
    width: 130,
    height: 90,
  },
  detailBlock: {
    justifyContent: 'center',
    paddingLeft: 15,
  },
  textDetailRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  detailTitle: {
    color: 'black',
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 5,
  },
  detailText: {
    color: 'darkgrey',
    fontWeight: '400',
  },
});
export default SelfGuidedCardMini;
