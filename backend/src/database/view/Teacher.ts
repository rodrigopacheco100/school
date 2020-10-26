import { format } from 'date-fns';
import Teacher from '../entity/Teacher';

interface TeacherViewData {
  id: number;
  name: string;
  birth: string;
}

const teacherView = (teacher: Teacher): TeacherViewData => {
  return {
    id: teacher.id,
    name: teacher.name,
    birth: `${format(teacher.birth, 'dd/MM/yyyy')}`
  };
};

const teacherViewAll = (teachers: Teacher[]): TeacherViewData[] => {
  const teachersView = teachers.map(teacher => teacherView(teacher));

  return teachersView;
};

export { teacherView, teacherViewAll };
