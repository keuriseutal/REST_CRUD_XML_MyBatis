//----------DELETE ALL
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
  OnChanges
} from "@angular/core";
import { FormBuilder, FormArray, Validators, FormGroup } from "@angular/forms";
import { Student } from "../../models/student.model";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit, OnChanges {
  @Output()
  addedStudent = new EventEmitter<Student>();
  @Output()
  updatedStudent = new EventEmitter<Student>();
  @Output()
  deleteAll = new EventEmitter();
  @Output()
  refreshList = new EventEmitter();

  @Input()
  studentToUpdate: Student;

  studentForm = this.fb.group({
    fname: ["", Validators.required],
    lname: ["", Validators.required],
    section: ["", Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.studentToUpdate == null) {
      this.studentToUpdate = {
        id: 0,
        fname: "",
        lname: "",
        section: "",
        isToDelete: false
      };
    }

  }

  ngOnChanges(){
    if (this.studentToUpdate == null) {
      this.studentToUpdate = {
        id: 0,
        fname: "",
        lname: "",
        section: "",
        isToDelete: false
      };
    }
    this.studentForm = this.fb.group({
      fname: [this.studentToUpdate.fname, Validators.required],
      lname: [this.studentToUpdate.lname, Validators.required],
      section: [this.studentToUpdate.section, Validators.required]
    });
  }

  onAdd() {
    if (this.studentForm.status == "VALID") {
      let validStudent: Student = {
        id: 0,
        fname: this.studentForm.get("fname").value,
        lname: this.studentForm.get("lname").value,
        section: this.studentForm.get("section").value,
        isToDelete: false
      };

      this.addedStudent.emit(validStudent);
      
    } else {
      window.alert("Please make sure that all fields are filled");
    }
  }

  onEdit() {
    if (this.studentForm.status == "VALID" || this.studentForm.untouched) {
      let validStudent: Student = {
        id: this.studentToUpdate.id,
        fname: this.studentForm.get("fname").value,
        lname: this.studentForm.get("lname").value,
        section: this.studentForm.get("section").value,
        isToDelete: false
      };

      this.updatedStudent.emit(validStudent);
    } else {
      window.alert("Please make sure that all fields are filled");
    }
  }

  onClear() {
    this.studentToUpdate = {
      id: 0,
      fname: "",
      lname: "",
      section: "",
      isToDelete: false
    };

    var rows = document.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
      rows[i].className = "not-selected";
    }

    this.refreshList.emit();
  }

  onDeleteAll() {
    this.deleteAll.emit();
  }

  get student(): any {
    return this.studentForm.controls;
  }

  getErrorMessage(fieldName: string) {
    return fieldName + " required";
  }
}
