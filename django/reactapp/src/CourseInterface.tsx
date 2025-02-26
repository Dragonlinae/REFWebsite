interface CourseInterface {
  id: number;
  course_name: string;
  tags: string[];
  short_description: string;
  description: string;
  application_page: string;
  application_deadline: Date;
  course_location: string;
  cost: number;
  max_students: number;
  curr_students: number;
  active: boolean;
  course_times: CourseTimeInterface[];
  pictures: PictureInterface[];
}

interface TagInterface {
  id: number;
  tag_name: string;
}

interface PictureInterface {
  picture: string;
  course: number;
  id: number;
}

interface CourseTimeInterface {
  start_time: Date;
  end_time: Date;
  event: number;
  id: number;
}


export type { CourseInterface, TagInterface, PictureInterface, CourseTimeInterface }