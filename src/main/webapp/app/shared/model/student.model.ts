import { Moment } from 'moment';
import { ICourse } from 'app/shared/model/course.model';

export const enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNKNOWN = 'UNKNOWN'
}

export interface IStudent {
  id?: number;
  studentId?: number;
  name?: string;
  dateOfBirth?: Moment;
  address?: string;
  courseId?: number;
  gender?: Gender;
  courseId?: ICourse;
}

export class Student implements IStudent {
  constructor(
    public id?: number,
    public studentId?: number,
    public name?: string,
    public dateOfBirth?: Moment,
    public address?: string,
    public courseId?: number,
    public gender?: Gender,
    public courseId?: ICourse
  ) {}
}
