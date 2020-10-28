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
  selector: 'app-sheet2',
  templateUrl: './sheet2.component.html',
  styleUrls: ['./sheet2.component.css']
})
export class Sheet2Component implements OnInit {


  smartsheetData;
  sheetName;
  smartsheetLastModified;
  smarsheetRows;
  containerId;
  currentIndex;
  requestedBydate;
  open = [];
  inprogress = [];
  Complete = [];
  closed = [];
  issueTitle;
  issueCreatedDate;
  issueId;
  issueModifiedDate;
  issueCreatedBy;

access_token;
refresh_token;

  test1 = 'notstarted';
  test2 = 'inProgress';
  test3 = 'done';

  emailBody;
  sheetTwo;

  projectSmartSheet;
  ticketCategory = [
    "Change Request",
    "Onboarding",
    "RFI"
]

  sheet2Options =  [
                "Open",
                "In Progress",
                "Complete",
                "Closed"
            ];

  states = [
    "Alabama - AL",
    "Alaska - AK",
    "Arizona - AZ",
    "Arkansas - AR",
    "California - CA",
    "Colorado - CO",
    "Connecticut - CT",
    "Delaware - DE",
    "District of Columbia - DC",
    "Florida - FL",
    "Georgia - GA",
    "Hawaii - HI",
    "Idaho - ID",
    "Illinois - IL",
    "Indiana - IN",
    "Iowa - IA",
    "Kansas - KS",
    "Kentucky - KY",
    "Louisiana - LA",
    "Maine - ME",
    "Maryland - MD",
    "Massachusetts - MA",
    "Michigan - MI",
    "Minnesota - MN",
    "Mississippi - MS",
    "Missouri - MO",
    "Montana - MT",
    "Nebraska - NE",
    "Nevada - NV",
    "New Hampshire - NH",
    "New Jersey - NJ",
    "New Mexico - NM",
    "New York - NY",
    "North Carolina - NC",
    "North Dakota - ND",
    "Ohio - OH",
    "Oklahoma - OK",
    "Oregon - OR",
    "Pennsylvania - PA",
    "Rhode Island - RI",
    "South Carolina - SC",
    "South Dakota - SD",
    "Tennessee - TN",
    "Texas - TX",
    "Utah - UT",
    "Vermont - VT",
    "Virginia - VA",
    "Washington - WA",
    "West Virginia - WV",
    "Wisconsin - WI",
    "Wyoming - WY"
];

// sheet2Users = [
//   {
//       "name": "Sharon Liu",
//       "email": "sharon.liu@aurotechcorp.com"
//   },
//   {
//       "name": "Vanessa",
//       "email": "vanessa.bonetti@aurotechcorp.com"
//   },
//   {
//       "name": "Sai Manohar",
//       "email": "saimanohar.gandi@aurotechcorp.com"
//   },
//   {
//       "name": "Hardik Patel",
//       "email": "hardik.patel@aurotechcorp.com"
//   },
//   {
//     "name": "Theophanis Khoury",
//     "email": "teophanis.khoury@aurotechcorp.com"
//   },
//   { name: 'Varun Muppidi', email: 'varun.muppidi@aurotechcorp.com' },
// ]


sheet2Users = [
  {
      "name": "Sharon Liu",
      "email": "Sharon"
  },
  {
      "name": "Vanessa",
      "email": "Vanessa"
  },
  {
      "name": "Sai Manohar",
      "email": "Sai Manohar"
  },
  {
      "name": "Hardik Patel",
      "email": "Hardik Patel"
  },
  {
    "name": "Theophanis Khoury",
    "email": "Teo"
  },
  { name: 'Varun Muppidi', email: 'Varun' },
  { name: 'Solape', email: 'Solape' },
]
  urgency = ['Low', 'Medium', 'High'];


  contacts = [
    { name: 'Hardik Patel', email: 'hardik.patel@aurotechcorp.com' },
    { name: 'Varun Muppidi', email: 'varun.muppidi@aurotechcorp.com' },
    { name: 'Sai', email: 'saimanohar.gandi@aurotechcorp.com' },
    { name: 'Sharon', email: 'sharon.liu@aurotechcorp.com' },
    { name: 'Vanessa', email: 'vanessa.bonetti@aurotechcorp.com' },
  ];


  constructor(
    private smartService: SmartsheetService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    var checkToken = this.route.snapshot.queryParams.code;
    //  console.log("checkingToken",checkToken);
    if (checkToken != undefined) {
  //    console.log('defined');
      this.smartService.getAccessToken().subscribe((tokenResponse) => {
        //console.log("Access Token", tokenResponse.access_token);
        this.access_token = tokenResponse.access_token;
       // this.refresh_token = tokenResponse.refresh_token;
        // console.log("Getting Refresh Token from intitial token",this.refresh_token);
      //  this.smartService
          // .getRefreshToken(this.refresh_token)
          // .subscribe((refreshToken) => {
            // console.log("Obtained Refresh Token",refreshToken);
            this.router.navigate([`/home`]);
            localStorage.setItem('AccessToken', this.access_token);
            //localStorage.setItem('RefreshToken', refreshToken.refresh_token);
           // this.access_token = refreshToken.access_token;
         // });
      });
    }
    // else if (checkToken == undefined) {
    // //  console.log('undefined');
    //   var refreshToken = localStorage.getItem('RefreshToken');
    //   this.smartService
    //     .getRefreshToken(refreshToken)
    //     .subscribe((refreshToken) => {
    //       // console.log("Obtained Refresh Token",refreshToken);
    //       localStorage.setItem('AccessToken', refreshToken.access_token);
    //       localStorage.setItem('RefreshToken', refreshToken.refresh_token);
    //       this.access_token = refreshToken.access_token;
    //     });
    // }

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

    this.sheetTwo = new FormGroup({
      subject: new FormControl(''),
      ticketNumber: new FormControl(''),
      Description: new FormControl(''),
      priority: new FormControl(''),
      state: new FormControl(''),
      endUsersEmailAddress: new FormControl(''),
      assignedTo: new FormControl(''),
      ticketCategory: new FormControl(''),
      status: new FormControl(''),
      entryDate: new FormControl(''),
      startDate: new FormControl(''),
      CompleteDate: new FormControl(''),
      loe: new FormControl(''),
      // predecessors: new FormControl(''),
    });
  }


  getSmartSheetData() {
    this.smartService.getSmartSheetData("6379298232788868").subscribe((response) => {
      console.log("Smart Sheet Data",response);
      this.sheetName = response.name;
      this.smartsheetLastModified = response.modifiedAt;
      this.smarsheetRows = response.rows;
      // console.log("Smartsheet rows", this.smarsheetRows);
      this.smarsheetRows.map((i) => {
        //console.log("Data from map", i.cells);
        if (i.cells[9].value == 'Open') {
          this.open.push(i);
        //  console.log(i);
          //  console.log(this.notstarted);
        }
        if (i.cells[9].value == 'In Progress') {
         this.inprogress.push(i);
        }
        if (i.cells[9].value == 'Complete') {
          this.Complete.push(i);
        }
        if (i.cells[9].value == 'Closed') {
          this.closed.push(i);
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
      if (this.containerId == 'Open') {
        data = event.container.data[this.currentIndex];
        id = data.id;
        console.log(id);
        value = 'Open';
        console.log(value);
        this.smartService.putSmartSheetData2(id, data, value).subscribe(
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
        this.smartService.putSmartSheetData2(id, data, value).subscribe(
          (response) => {
            console.log(response);
            this.toastr.success('Updated Successfully');
          },
          (error) => {
            this.toastr.error('Error Updating Data');
          }
        );
      } else if (this.containerId == 'Complete') {
        data = event.container.data[this.currentIndex];
        id = data.id;
        value = 'Complete';
        console.log(value);
        this.smartService.putSmartSheetData2(id, data, value).subscribe(
          (response) => {
            console.log(response);
            this.toastr.success('Updated Successfully');
          },
          (error) => {
            this.toastr.error('Error Updating Data');
          }
        );
      } else if (this.containerId == 'Closed') {
        data = event.container.data[this.currentIndex];
        id = data.id;
        value = 'Closed';
        console.log(value);
        this.smartService.putSmartSheetData2(id, data, value).subscribe(
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
    this.issueTitle = data1.cells[0].value;
    this.issueCreatedBy = data1.cells[6].value;
    this.issueCreatedDate = data1.cells[10].value;
    // this.requestedBydate = data1.cells[5].value;
    console.log(this.issueId);
    this.smartService
      .getSmartSheetDataIdividual("6379298232788868",this.issueId)
      .subscribe((data) => {
        console.log(data);

        this.sheetTwo
          .get('Description')
          .setValue(data.cells[3].value);
        this.sheetTwo
          .get('priority')
          .setValue(data.cells[4].value);
        this.sheetTwo.get('state').setValue(data.cells[5].value);
        this.sheetTwo
          .get('assignedTo')
          .setValue(data.cells[7].value);
        this.sheetTwo.get('ticketCategory').setValue(data.cells[8].value);
        this.sheetTwo.get('status').setValue(data.cells[9].value);
        this.sheetTwo.get('loe').setValue(data.cells[15].value);
        this.smartService
        .getOutlookEmailSingle(data.cells[3].value, this.access_token)
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
      "cells": [
        {
            "columnId": 5048459031013252,
            "value": this.issueTitle,
            "displayValue": this.issueTitle
        },
        {
            "columnId": 1670759310485380,
            "value":this.sheetTwo.get('Description').value == undefined? '':this.sheetTwo.get('Description').value,
        },
        {
            "columnId": 8029084730058628,
            "value": this.sheetTwo.get('priority').value,
            "displayValue": this.sheetTwo.get('priority').value
        },
        {
            "columnId": 3922559124170628,
            "value":this.sheetTwo.get('state').value,
            "displayValue": this.sheetTwo.get('state').value
        },
        {
            "columnId": 8426158751541124,
            "value": this.issueCreatedBy == undefined? '':this.issueCreatedBy,
        },
        {
            "columnId": 1107809357064068,
            "value": this.sheetTwo.get('assignedTo').value,
        },
        {
            "columnId": 5611408984434564,
            "value": this.sheetTwo.get('ticketCategory').value,
            "displayValue": this.sheetTwo.get('ticketCategory').value
        },
        {
            "columnId": 3359609170749316,
            "value": this.sheetTwo.get('status').value,
            "displayValue": this.sheetTwo.get('status').value
        },
        {
            "columnId": 7863208798119812,
            "value": this.issueCreatedDate
        },
        {
            "columnId": 8989108704962436,
            "value": this.sheetTwo.get('loe').value == undefined? '':this.sheetTwo.get('loe').value,
            "displayValue": this.sheetTwo.get('loe').value == undefined? '':this.sheetTwo.get('loe').value,
        },
      ]
    }
  //  console.log(this.issueId, dataPut);
    setTimeout(()=>{
    this.smartService
      .putIndividualSmartSheetData("6379298232788868",this.issueId, dataPut)
      .subscribe(
        (response) => {
          console.log(response);
          this.toastr.success('Updated Successfully');
          this.sheetName = '';
          this.smartsheetLastModified = '';
          this.smarsheetRows = '';
          this.open = [];
          this.inprogress = [];
          this.Complete = [];
          this.closed = [];
          setTimeout(()=>{
this.ngOnInit();

          },10)
          var x = document.getElementById('closeModalPmdashboard').click();
          return x;
        },
        (error) => {
          this.toastr.error('Error Updating Data');
        }
      );
    },10)
  }
}
