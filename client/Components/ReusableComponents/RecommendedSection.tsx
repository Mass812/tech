// import {useNavigation} from '@react-navigation/native';
// import React from 'react';
// import {View, StyleSheet, FlatList, Text} from 'react-native';
// import InstructionalLessonCard from '../UiCards/InstructionalLessonCard';

// interface RecommendedSectionProps {
//   header: string;
// }

// const RecommendedSection: React.FC<RecommendedSectionProps> = ({
//   header,
//   children,
// }) => {
//   const nav = useNavigation();

//   //renderMethod Here
//   const renderItem = ({item}: {item: RecommendedSectionProps}) => {
//     return (
//       <InstructionalLessonCard
//         onPress={(e: EventTarget) =>
//           sendToLesson(
//             e,
//             item.courseName,
//             item.instructor,
//             item.weekNumber,
//             item.lessonNumber,
//           )
//         }
//         superscriptTitle={item.instructor}
//         img={item.img}
//         title={item.title}
//         additionalInfo={[`${item.weekNumber} ${item.lessonNumber}`]}
//         length={item.length}
//         wideDimension={true}
//         category={item.category}
//       />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{header}</Text>
//       <View style={styles.childParent}>
//         {children}
//         {/*        FlatList                                   */}
//       </View>
//       <FlatList
//         data={data.popularLessons}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         horizontal={true}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     textAlign: 'left',
//   },
//   title: {
//     fontSize: 20,
//     color: 'black',
//     textAlign: 'left',
//     margin: 10,
//   },
//   childParent: {
//     minHeight: 200,
//   },
// });
// export default RecommendedSection;
