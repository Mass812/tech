
export interface ProgramDetailProps {
    courseName: string;
    instructor: string;
    targets: string[];
    id: string;
    courseImg: string;
    description: string;
    lectureCount: string;
    length: string;
    category: string;
    equipment: string[];
    courseRelation: CourseRelation;
    img: string;
    contentUrl: string;
    title: string;
    additionalInfo: string[];
    weekNumber: string;
    lessonNumber: string;
  }
  
 export type CourseRelation = {
    img: string;
  };
  
  export  type ParamList = {
    courseName: string;
    key: string;
    name: string;
    params: Params;
  };
  
  export  type Params = {courseName: string};
  
  export  interface LessonProps extends ProgramDetailProps {
    e: EventTarget;
    courseName: string;
    instructor: string;
    weekNumber: string;
    lessonNumber: string;
  }