export   type Category = {
    title: string;
    length: string;
    courseName: string;
    weekNumber: string;
    lessonNumber?: string;
    instructor: string;
    img?: string;
    id: string;
  };


export interface WorkoutCardProps {}

export type ParamList = {
  category: string;
  key: string;
  name: string;
  params: Params;
};

export type Params = {
  category: string;
};


export   type SelfGuidedCategory = {
    title: string;
    length: string;
    contentUrl: string;
    img: string;
    id: string;
    category: string;
  };