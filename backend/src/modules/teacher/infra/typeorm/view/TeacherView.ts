import { format } from 'date-fns';
import Teacher from '../entity/Teacher';

interface TeacherViewData extends Omit<Teacher, 'birthday'> {
  birthday: string;
}

const teacherView = (teacher: Teacher): TeacherViewData => {
  return {
    id: teacher.id,
    name: teacher.name,
    birthday: `${format(teacher.birthday, 'dd/MM/yyyy')}`
  };
};

const teacherViewAll = (teachers: Teacher[]): TeacherViewData[] => {
  const teachersView = teachers.map(teacher => teacherView(teacher));

  return teachersView;
};

export { teacherView, teacherViewAll };
