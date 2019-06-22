export interface ICourse {
  id?: number;
  courseId?: number;
  name?: string;
}

export class Course implements ICourse {
  constructor(public id?: number, public courseId?: number, public name?: string) {}
}
