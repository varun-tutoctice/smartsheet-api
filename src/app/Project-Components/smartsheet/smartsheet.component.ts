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

@Component({
  selector: 'app-smartsheet',
  templateUrl: './smartsheet.component.html',
  styleUrls: ['./smartsheet.component.css'],
})
export class SmartsheetComponent implements OnInit {
  smartsheetData;
  sheetName;
  smartsheetLastModified;
  smarsheetRows;
  containerId;
  currentIndex;
  requestedBydate;
  notstarted = [];

  issueTitle;
  issueCreatedDate;
  issueId;
  issueModifiedDate;
  issueCreatedBy;
  inprogress = [];
access_token;
refresh_token;

  test1 = 'notstarted';
  test2 = 'inProgress';
  test3 = 'done';
    done = [];
  emailBody;

  projectSmartSheet;
  categoryManagement = ['Not Started', 'In Progress', 'Resolved'];

  urgency = ['Low', 'Medium', 'High'];

  contacts = [
    { name: 'Hardik Patel', email: 'hardik.patel@aurotechcorp.com' },
    { name: 'Varun Muppidi', email: 'varun.muppidi@aurotechcorp.com' },
    { name: 'Sai', email: 'saimanohar.gandi@aurotechcorp.com' },
    { name: 'Sharon', email: 'sharon.liu@aurotechcorp.com' },
    { name: 'Vanessa', email: 'vanessa.bonetti@aurotechcorp.com' },
    {
      "name": "Theophanis Khoury",
      "email": "teophanis.khoury@aurotechcorp.com"
    }
  ];

  constructor(
    private smartService: SmartsheetService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    var checkToken = this.route.snapshot.queryParams.code;
    //  console.log("checkingToken",checkToken);
    if (checkToken != undefined) {
  //    console.log('defined');
      this.smartService.getAccessToken().subscribe((tokenResponse) => {
        //console.log("Access Token", tokenResponse.access_token);
        this.access_token = tokenResponse.access_token;
        this.refresh_token = tokenResponse.refresh_token;
        // console.log("Getting Refresh Token from intitial token",this.refresh_token);
        this.smartService
          .getRefreshToken(this.refresh_token)
          .subscribe((refreshToken) => {
            // console.log("Obtained Refresh Token",refreshToken);
            this.router.navigate([`/home`]);
            localStorage.setItem('AccessToken', refreshToken.access_token);
            localStorage.setItem('RefreshToken', refreshToken.refresh_token);
            this.access_token = refreshToken.access_token;
          });
      });
    } else if (checkToken == undefined) {
    //  console.log('undefined');
      var refreshToken = localStorage.getItem('RefreshToken');
      this.smartService
        .getRefreshToken(refreshToken)
        .subscribe((refreshToken) => {
          // console.log("Obtained Refresh Token",refreshToken);
          localStorage.setItem('AccessToken', refreshToken.access_token);
          localStorage.setItem('RefreshToken', refreshToken.refresh_token);
          this.access_token = refreshToken.access_token;
        });
    }

    this.getSmartSheetData();
    this.projectSmartSheet = new FormGroup({
      createdDate: new FormControl(''),
      issueTitle: new FormControl(''),
      issueDescription: new FormControl(''),
      requestbyDate: new FormControl(''),
      assignedTo: new FormControl(''),
      ticketStatus: new FormControl(''),
      urgency: new FormControl(''),
    });
  }

  getSmartSheetData() {
    this.smartService.getSmartSheetData("7100131184011140").subscribe((response) => {
      // console.log("Smart Sheet Data",response);
      this.sheetName = response.name;
      this.smartsheetLastModified = response.modifiedAt;
      this.smarsheetRows = response.rows;
      // console.log("Smartsheet rows", this.smarsheetRows);
      this.smarsheetRows.map((i) => {
        //console.log("Data from map", i.cells);
        if (i.cells[7].value == 'Not Started') {
          this.notstarted.push(i);
        //  console.log(i);
          //  console.log(this.notstarted);
        }
        if (i.cells[7].value == 'In Progress') {
         this.inprogress.push(i);
        }
        if (i.cells[7].value == 'Resolved') {
          this.done.push(i);
        }
      });
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.container);
    this.containerId = event.container.id;
    this.currentIndex = event.currentIndex;
    var value;
    var data;
    var id;
    setTimeout(() => {
      console.log(this.containerId);
      if (this.containerId == 'notStarted') {
        data = event.container.data[this.currentIndex];
        id = data.id;
        value = 'Not Started';
        console.log(value);
        this.smartService.putSmartSheetData(id, data, value).subscribe(
          (response) => {
            console.log(response);
            this.toastr.success('Updated Successfully');
          },
          (error) => {
            this.toastr.error('Error Updating Data');
          }
        );
      } else if (this.containerId == 'inProgress') {
        data = event.container.data[this.currentIndex];
        id = data.id;
        value = 'In Progress';
        console.log(value);
        this.smartService.putSmartSheetData(id, data, value).subscribe(
          (response) => {
            console.log(response);
            this.toastr.success('Updated Successfully');
          },
          (error) => {
            this.toastr.error('Error Updating Data');
          }
        );
      } else if (this.containerId == 'done') {
        data = event.container.data[this.currentIndex];
        id = data.id;
        value = 'Resolved';
        console.log(value);
        this.smartService.putSmartSheetData(id, data, value).subscribe(
          (response) => {
            console.log(response);
            this.toastr.success('Updated Successfully');
          },
          (error) => {
            this.toastr.error('Error Updating Data');
          }
        );
      }
    }, 200);
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

  itemData(data1) {
    console.log(data1);
    this.issueId = data1.id;
    this.issueTitle = data1.cells[1].value;
    this.issueCreatedBy = data1.cells[2].value;
    this.issueCreatedDate = data1.cells[0].value;
    this.requestedBydate = data1.cells[5].value;
    this.smartService
      .getSmartSheetDataIdividual("7100131184011140",this.issueId)
      .subscribe((data) => {
        console.log(data);
        this.projectSmartSheet
          .get('issueDescription')
          .setValue(data.cells[2].value);
        this.projectSmartSheet
          .get('requestbyDate')
          .setValue(data.cells[5].value);
        this.projectSmartSheet.get('assignedTo').setValue(data.cells[6].value);
        this.projectSmartSheet
          .get('ticketStatus')
          .setValue(data.cells[7].value);
        this.projectSmartSheet.get('urgency').setValue(data.cells[9].value);
        this.smartService
        .getOutlookEmailSingle(data.cells[2].value, this.access_token)
        .subscribe((response) => {
          console.log('Single Email Response', response);
          // this.projectSmartSheet
          // .get('issueDescription')
          // .setValue(response.Body.Content);
          this.emailBody = response.Body.Content;
          console.log(this.emailBody);
        }, error=>{
          this.emailBody = data.cells[2].value;
        });

      });
  }

  saveSmartData() {
    var dataPut = {
      // "comment":"Hello",
      cells: [
        {
          columnId: 8894537820071812,
          value: this.issueCreatedDate,
        },
        {
          columnId: 98444797863812,
          value: this.issueTitle,
          displayValue: this.issueTitle,
        },
        {
          columnId: 4602044425234308,
          value: this.projectSmartSheet.get('issueDescription').value,
          displayValue: this.projectSmartSheet.get('issueDescription').value,
        },
        {
          columnId: 1224344704706436,
          value:
            this.projectSmartSheet.get('requestbyDate').value == undefined
              ? ''
              : this.projectSmartSheet.get('requestbyDate').value,
        },
        {
          columnId: 5727944332076932,
          value: this.projectSmartSheet.get('assignedTo').value,
        },
        {
          columnId: 3476144518391684,
          value: this.projectSmartSheet.get('ticketStatus').value,
          displayValue: this.projectSmartSheet.get('ticketStatus').value,
        },
        {
          columnId: 661394751285124,
          value: this.projectSmartSheet.get('urgency').value,
          displayValue: this.projectSmartSheet.get('urgency').value,
        },
      ],
    };
    console.log(this.issueId, dataPut);
    setTimeout(()=>{
      this.smartService
      .putIndividualSmartSheetData("7100131184011140",this.issueId, dataPut)
      .subscribe(
        (response) => {
          console.log(response);
          this.sheetName = '';
          this.smartsheetLastModified = '';
          this.smarsheetRows = '';
          this.notstarted = [];
          this.inprogress = [];
          this.done = [];
          setTimeout(()=>{
this.ngOnInit();

          },10)
          this.toastr.success('Updated Successfully');
          var x = document.getElementById('closeModalPmdashboard').click();
          return x;
        },
        (error) => {
          this.toastr.error('Error Updating Data');
        }
      )
    },10)
;
  }
}
