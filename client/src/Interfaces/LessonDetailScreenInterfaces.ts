export interface LessonDetailProps {
    courseName: string;
    instructor: string;
    id: string;
    description: string;
    lessonNumber: string;
    length: string;
    category: string;
    equipment: string[];
    img: string;
    contentUrl: string;
    title: string;
    additionalInfo: string[];
    weekNumber: string;
    lectureNumber: string;
    targets: string[];
    outfitTopName: string;
    outfitTopImgUrl: string;
    outfitBottomName: string;
    outfitBottomImgUrl: string;
  }

  
  export type ParamList = {
    courseName: string;
    weekNumber: string;
    lessonNumber: string;
    instructor: string;
    key: string;
    name: string;
    params: Params;
  };
  
  export type Params = {
    courseName: string;
    weekNumber: string;
    lessonNumber: string;
    instructor: string;
  };