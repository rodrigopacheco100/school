import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Teacher from '@modules/teacher/infra/typeorm/entity/Teacher';
import {
  teacherView,
  teacherViewAll
} from '@modules/teacher/infra/typeorm/view/TeacherView';

export default class TeacherController {
  public async index(_: Request, response: Response): Promise<Response> {
    const teacherRepository = getRepository(Teacher);

    const teachers = await teacherRepository.find();

    return response.json(teacherViewAll(teachers));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const teacherRepository = getRepository(Teacher);

    const teacher = await teacherRepository.findOne({ id: Number(id) });

    return response.json(teacherView(teacher));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const teacherRepository = getRepository(Teacher);

    const { name, birth } = request.body;

    const [day, month, year] = (birth as string).split('/');

    const newDate = new Date(Number(year), Number(month) - 1, Number(day));

    const teacher = teacherRepository.create({ name, birth: newDate });
    await teacherRepository.save(teacher);

    return response.status(201).json(teacherView(teacher));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const teacherRepository = getRepository(Teacher);

    const { id, name, birth } = request.body;

    const teacher = await teacherRepository.findOne({ id });
    teacher.name = name;
    teacher.birth = birth;
    const updatedTeacher = await teacherRepository.save(teacher);

    return response.json(teacherView(updatedTeacher));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const teacherRepository = getRepository(Teacher);

    const { id } = request.body;

    const teacher = await teacherRepository.findOne({ id });

    await teacherRepository.delete(teacher);

    return response.status(200).send();
  }
}
