export interface PopularLessonsProps {
    courseName: string;
    instructor: string;
    lectureCount: string;
    keywords: string[];
    id: string;
    img: string;
    length: string;
    category: string;
    error: string;
    weekNumber: string;
    lessonNumber: string;
    title: string;
    equipment: string[];
  }
  
  export interface PopularSelfGuided {
    contentUrl: string;
    title: string;
    length: string;
    id: string;
    exerciseSections: string;
    img: string;
    equipment: [string];
  }
  
  export interface MeditationProps {
    category?: string;
    contentUrl?: string;
    contentImg: string;
    description?: string;
    id: string;
    instructor?: string;
    title: string;
    horizontal?: boolean;
    queryValue?: string;
    length?: string;
    dataProps?: string;
  }