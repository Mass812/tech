import * as React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

const width = Dimensions.get('screen').width;

interface FocusGraphProps {
  targetArmsValue: number;
  targetBackValue: number;
  targetLegsValue: number;
  targetAbstValues: number;
}

const FocusGraph: React.FC<FocusGraphProps> = ({
  targetArmsValue = 4,
  targetBackValue = 6,
  targetLegsValue = 3,
  targetAbstValues = 7,
}) => {
  const data = {
    labels: ['Arms', 'Back', 'Legs', 'Abs', 'Chest'], // optional
    data: [
      targetArmsValue / 10,
      targetBackValue / 10,
      targetLegsValue / 10,
      targetAbstValues / 10,
    ],
  };
  return (
    <View style={styles.container}>
      <Text>Overall Intensity</Text>
      <View style={styles.chart} >
        <ProgressChart
          data={data}
          width={width - 80}
          height={150}
          strokeWidth={6}
          radius={16}
          chartConfig={{
            backgroundColor: '#FEFEFE',
            backgroundGradientFrom: '#FEFEFE',
            backgroundGradientTo: '#FEFEFE',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(49, 150, 153, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    margin: 'auto',
  },
  chart: {
    width: '100%',
    alignSelf: 'center',
  },
});
export default FocusGraph;
