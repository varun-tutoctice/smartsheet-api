import { map } from 'rxjs/operators';
import { SmartsheetService } from './../../Services/smartsheet.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  Form,
  FormArray,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { kMaxLength } from 'buffer';

@Component({
  selector: 'app-smartsheetscomplete',
  templateUrl: './smartsheetscomplete.component.html',
  styleUrls: ['./smartsheetscomplete.component.css'],
})
export class SmartsheetscompleteComponent implements OnInit {
  id;
  columns;
  rows;
  sheetName;
  projectSmartSheet;
  filterManagement = [];
  pickList = [];
  options;
  arrayNumber;
  testing = [
    "Varun",
    "Tarun",
    "Arun"
  ]
  constructor(
    private smartService: SmartsheetService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.params['_value'].sheetId;
    //console.log(this.id);
    this.getSmartSheetData();

    this.projectSmartSheet = new FormGroup({
      createdDate: new FormControl(''),
      issueTitle: new FormControl(''),
      issueDescription: new FormControl(''),
      requestbyDate: new FormControl(''),
      assignedTo: new FormControl(''),
      ticketStatus: new FormControl(''),
      urgency: new FormControl(''),
      filterValue: new FormControl(''),
    });
  }

  getSmartSheetData() {
    this.smartService.getSmartSheetData(this.id).subscribe((response) => {
      // console.log(response);
      this.rows = response.rows;
      this.columns = response.columns;
      this.sheetName = response.name;
      this.rows = response.rows;
      console.log(this.rows);
     // this.rows[0].push
      // this.rows.map(i => {
      //   console.log(i);
      // })

      this.columns.map((i) => {
        if (i.type == 'PICKLIST') {
          this.filterManagement.push(i);
        }
      });
      this.projectSmartSheet
      .get('filterValue')
      .setValue(this.filterManagement[0]);
      this.filterMethods();

      //this.options =  this.projectSmartSheet.get('filterValue').value;
    //  console.log(this.projectSmartSheet.get('filterValue').value.id);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.container);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  filterMethods() {
    var dataFilter;
    dataFilter = this.projectSmartSheet.get('filterValue').value;
    for(var i=0; i<=this.projectSmartSheet.get('filterValue').value.options.length-1; i++){
      //       this.rows.map((i) => {
      //         this.pickList.push([i]);
      // });
  
    } 
    //console.log(this.pickList[0]);
    // this.rows.map((i) => {
    //  // console.log(i);
    //   this.pickList.push(i);
    //   });
    //   console.log(this.pickList);

  }

  getDatafromArrayName(name) {
    // console.log(name);
    this.rows.map((i) => {
      i.cells.map((j) => {
        //  console.log(this.projectSmartSheet.get('filterValue').value.id);
        if (
          j.columnId == this.projectSmartSheet.get('filterValue').value.id &&
          j.value == name
        ) {
          this.pickList.push(i);
          console.log();
          return this.pickList;
        }
      });
    });
  }
}
