import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IStudent, Student } from 'app/shared/model/student.model';
import { StudentService } from './student.service';
import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from 'app/entities/course';

@Component({
  selector: 'jhi-student-update',
  templateUrl: './student-update.component.html'
})
export class StudentUpdateComponent implements OnInit {
  isSaving: boolean;

  courses: ICourse[];

  editForm = this.fb.group({
    id: [],
    studentId: [],
    name: [],
    dateOfBirth: [],
    address: [],
    courseId: [],
    gender: [],
    courseId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected studentService: StudentService,
    protected courseService: CourseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ student }) => {
      this.updateForm(student);
    });
    this.courseService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICourse[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICourse[]>) => response.body)
      )
      .subscribe((res: ICourse[]) => (this.courses = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(student: IStudent) {
    this.editForm.patchValue({
      id: student.id,
      studentId: student.studentId,
      name: student.name,
      dateOfBirth: student.dateOfBirth != null ? student.dateOfBirth.format(DATE_TIME_FORMAT) : null,
      address: student.address,
      courseId: student.courseId,
      gender: student.gender,
      courseId: student.courseId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const student = this.createFromForm();
    if (student.id !== undefined) {
      this.subscribeToSaveResponse(this.studentService.update(student));
    } else {
      this.subscribeToSaveResponse(this.studentService.create(student));
    }
  }

  private createFromForm(): IStudent {
    return {
      ...new Student(),
      id: this.editForm.get(['id']).value,
      studentId: this.editForm.get(['studentId']).value,
      name: this.editForm.get(['name']).value,
      dateOfBirth:
        this.editForm.get(['dateOfBirth']).value != null ? moment(this.editForm.get(['dateOfBirth']).value, DATE_TIME_FORMAT) : undefined,
      address: this.editForm.get(['address']).value,
      courseId: this.editForm.get(['courseId']).value,
      gender: this.editForm.get(['gender']).value,
      courseId: this.editForm.get(['courseId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudent>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackCourseById(index: number, item: ICourse) {
    return item.id;
  }
}
