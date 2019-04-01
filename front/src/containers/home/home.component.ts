import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { StudentService } from "../../services/student.service";
import { Student } from "../../models/student.model";
import { Observable } from "rxjs";
import { IfStmt } from "../../../node_modules/@angular/compiler";

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  students: Student[] = [];
  maxID: number = 0;
  studentToUpdate: Student;
  clearHighlight: boolean = false;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.getStudents().subscribe(s => (this.students = s));
  }

  getStudentBySearchValue(event: string) {
    if (event == "") {
      this.studentService.getStudents().subscribe(s => (this.students = s));
    } else {
      this.studentService
        .getStudentsBySearchValue(event)
        .subscribe(s => (this.students = s));
    }

  }

  addStudent(event: Student) {
    this.studentService.addStudent(event).subscribe(res=> this.studentService.getStudents().subscribe(s => (this.students = s)));
  }

  passStudentInfoToForm(event: Student) {
    this.studentToUpdate = event;
  }

  updateStudent(event: Student) {
    this.studentService.updateStudent(event).subscribe(res=> this.studentService.getStudents().subscribe(s => (this.students = s)));
  }

  deleteStudent(event: Student) {
    this.studentService.deleteStudent(event).subscribe(res=> this.studentService.getStudents().subscribe(s => (this.students = s)));
  }

  deleteAll() {
    this.studentService.deleteAll(this.students).subscribe(res=> this.studentService.getStudents().subscribe(s => (this.students = s)));
  }

  refreshList(){
    this.studentService.getStudents().subscribe(s => (this.students = s));
  }

}
