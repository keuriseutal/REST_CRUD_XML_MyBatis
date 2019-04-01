import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";
import { Student } from "../../models/student.model";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  @Input()
  students: Student[];

  @Output()
  studentToUpdate = new EventEmitter<Student>();

  @Output()
  deletedStudent = new EventEmitter<Student>();

  @Output()
  searchValue = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  getStudentBySearchValue(event: string) {
    this.searchValue.emit(event);
  }

  passStudentInfoToForm(event: Student, index: number) {
    window.scroll(0, 0);

    this.studentToUpdate.emit(event);

    var rows = document.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
      if (i == index + 1) {
        rows[i].className = "selected";
        //rows[i].style.setProperty("--bg-color", "#007bff");
        //rows[i].style.setProperty("--text-color", "white");
      } else {
        rows[i].className = "not-selected";
        //rows[i].style.setProperty("--bg-color", "white");
        //rows[i].style.setProperty("--text-color", "black");
      }
    }
  }

  deletingStudent(event: Student, index: number) {
    this.highlightTableOnDelete(index);
    event.isToDelete = true;
  }

  deleteStudent(event: Student, index: number) {
    this.removeHighLightOnTable(index);
    event.isToDelete = false;
    this.deletedStudent.emit(event);
  }

  cancelDeleteStudent(event: Student, index: number) {
    this.removeHighLightOnTable(index);
    event.isToDelete = false;
  }

  highlightTableOnDelete(index: number) {
    var rows = document.getElementsByTagName("tr");
    rows[index + 1].className = "selected-to-delete";
  }

  removeHighLightOnTable(index: number) {
    var rows = document.getElementsByTagName("tr");
    rows[index + 1].className = "not-selected";
  }
  
}
