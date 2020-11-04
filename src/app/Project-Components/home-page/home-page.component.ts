import { SmartsheetService } from './../../Services/smartsheet.service';
import { Component, OnInit , HostListener, Directive } from '@angular/core';
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

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})



export class HomePageComponent implements OnInit {
  @HostListener('scroll', ['$event'])
  outlookResponse;
  outlookResponseValue;
  categoryManagement = ['Not Started', 'In Progress', 'Resolved'];
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
  smartSheetFirst: boolean = true;
  smartSheetSecond: boolean = false;
  outlookSingle;
  toEmail;
  projectSmartSheet;
  subjectInformation;
  access_token;
  emailBody;
  refresh_token;
  conversationId;
  conversationValue;
  today = new Date();
  bodyPreview;
  singleId;
  status;
  skipValue = 0;
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.today.getFullYear();
  showTextArea: boolean[] = [];
  currentDate = this.mm + '-' + this.dd + '-' + this.yyyy;
  replyEmail;
  indexFrom;
  dataId;
  sheetTwo;
  outlookEmailsArray = [];
  // date = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();

  // time = this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();

  //dateTime = new Date().getTime() / 1000;
  constructor(
    private smartService: SmartsheetService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    var checkToken = this.route.snapshot.queryParams.code;
    //  console.log("checkingToken",checkToken);
   // if (checkToken != undefined) {
  //    console.log('defined');
      this.smartService.getAccessToken().subscribe((tokenResponse) => {
      //  console.log("Access Token", tokenResponse);
        this.access_token = tokenResponse.access_token;
    //    this.refresh_token = tokenResponse.refresh_token;
        // console.log("Getting Refresh Token from intitial token",this.refresh_token);
        // this.smartService
        //   .getRefreshToken(this.refresh_token)
        //   .subscribe((refreshToken) => {
        //     // console.log("Obtained Refresh Token",refreshToken);
        //     this.router.navigate([`/home`]);
        //     localStorage.setItem('AccessToken', refreshToken.access_token);
        //     localStorage.setItem('RefreshToken', refreshToken.refresh_token);
        //     this.access_token = refreshToken.access_token;
            // this.smartService
            //   .getOutlookEmail(this.access_token, this.skipValue)
            //   .subscribe((response) => {
            //     this.outlookResponse = response;
            //     this.outlookResponseValue = response.value;
            //     //  console.log("Output from Outlook", response);
            //   });
            this.getOutlookEmails(this.access_token, this.skipValue);
          });
      // });
    // } else if (checkToken == undefined) {
    // //  console.log('undefined');
    //   var refreshToken = localStorage.getItem('RefreshToken');
    //   this.smartService
    //     .getRefreshToken(refreshToken)
    //     .subscribe((refreshToken) => {
    //       // console.log("Obtained Refresh Token",refreshToken);
    //       localStorage.setItem('AccessToken', refreshToken.access_token);
    //       localStorage.setItem('RefreshToken', refreshToken.refresh_token);
    //       this.access_token = refreshToken.access_token;
    //       this.smartService
    //         .getOutlookEmail(this.access_token)
    //         .subscribe((response) => {
    //           this.outlookResponse = response;
    //           this.outlookResponseValue = response.value;
    //         //  console.log('Output from Outlook', response);
    //         });
    //     });
    // }




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

    this.replyEmail = new FormGroup({
      replyMessages: new FormControl(''),
    });
  }


  getOutlookEmails(accessToken, skipVal){
    this.smartService
    .getOutlookEmail(accessToken, skipVal)
    .subscribe((response) => {
      this.outlookResponse = response;
      this.outlookResponseValue = response.value;
      console.log(this.outlookResponseValue);
      for(let val in this.outlookResponseValue) {
        const emailvalue = this.outlookResponseValue[val];

        this.outlookEmailsArray.push(emailvalue);
      }


      console.log("Output from Outlook", this.outlookEmailsArray);
    });

  }
  retrieveEmailInfo(ConversationId, id) {
    this.conversationId = ConversationId;
    this.singleId = id;
  //  console.log('ConversationId from the output', id);


    this.smartSheetFirst = false;
    // this.smartService.getAccessToken().subscribe(tokenResponse => {
    //   console.log("Access Token", tokenResponse);
    // })
    var data = {
      IsRead: true,
    };
    this.smartService
      .patchOutlookEmailSingle(this.singleId, this.access_token, data)
      .subscribe((response1) => {
    //    console.log(response1);
        this.ngOnInit();
      });
    this.smartService
      .getOutlookEmailSingle(id, this.access_token)
      .subscribe((response) => {
        console.log('Single Email Response', response);

        this.outlookSingle = response;
        this.dataId = response.Id;
        console.log(this.dataId);
        this.status = response.Categories[0];
        this.subjectInformation = this.outlookSingle.Subject;
        this.toEmail = response.Sender.EmailAddress.Address;
        this.bodyPreview = response.BodyPreview;
       this.emailBody = response.Body.Content;
      //  console.log(this.toEmail);
        this.smartSheetSecond = true;
      });

    this.smartService
      .getOutlookEmailSingleConversation(this.conversationId, this.access_token)
      .subscribe((rConversation) => {
    //    console.log('Response from conversation', rConversation);

        this.conversationValue = rConversation.value;
      });
  }

  closeModal() {
    var x = document.getElementById('closeModalPmdashboard').click();
    return x;
  }


  onScroll(event: any) {
    // visible height + pixel scrolled >= total height
    if(event.target.scrollTop == 0){
      console.log("top");
    };
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      console.log("End", this.outlookEmailsArray["length"]);
      var length = this.outlookEmailsArray["length"]

  this.getOutlookEmails(this.access_token, length+10);
    }
}


  postSmartSheetDataSecond(){
    var data = {
      "cells": [
        {
            "columnId": 5048459031013252,
            "value": this.outlookSingle.Subject,
            "displayValue": this.outlookSingle.Subject
        },
        {
            "columnId": 1670759310485380,
            "value":this.dataId,
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
            "value": this.toEmail,
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
            "value": this.yyyy + '-' + this.mm + '-' + this.dd
        },
        {
            "columnId": 8989108704962436,
            "value": this.sheetTwo.get('loe').value,
            "displayValue": this.sheetTwo.get('loe').value
        },
      ]
    }
    //console.log(data),

    this.smartService.postSmartSheetData(data,"6379298232788868").subscribe(
      (response) => {
      //  console.log('Response from the api call', response);
        this.toastr.success('Row Updated Successfully');
        var data = {
          //"IsRead": true,
          Categories: ['Smartsheet','HHS Protect Ticket Tracking'],
        };
        var discussion = {
          "comment": {
            "text": this.bodyPreview
          }
        };
        this.smartService.createDiscussions("6379298232788868", response.result.id, discussion).subscribe(response3 => console.log(response3));
        this.smartService
          .patchOutlookEmailSingle(this.singleId, this.access_token, data)
          .subscribe((response1) => {
            console.log(response);
            this.ngOnInit();
          });
        this.projectSmartSheet.reset();
        var x = document.getElementById('closeModalPmdashboard1').click();
        return x;
      },
      (error) => {
        this.toastr.error(+error + 'Error Sending the Request');
      }
    );
  }
  postSmartSheetData(form) {
    var data = {
      // "comment":"Hello",
      cells: [
        {
          columnId: 8894537820071812,
          value: this.yyyy + '-' + this.mm + '-' + this.dd,
        },
        {
          columnId: 98444797863812,
          value: this.outlookSingle.Subject,
          displayValue: this.outlookSingle.Subject,
        },
        {
          columnId: 4602044425234308,
          value: this.dataId,
          displayValue: this.dataId,
        },
        {
          columnId: 1224344704706436,
          value: this.projectSmartSheet.get('requestbyDate').value,
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
   // console.log('Data obtained from email', data);
    this.smartService.postSmartSheetData(data,"7100131184011140").subscribe(
      (response) => {
        var discussion = {
          "comment": {
            "text": this.bodyPreview
          }
        };
        this.smartService.createDiscussions("7100131184011140", response.result.id, discussion).subscribe(response3 => console.log(response3));
      //  console.log('Response from the api call', response);
        this.toastr.success('Row Updated Successfully');
        var data = {
          //"IsRead": true,
          Categories: ['Smartsheet', "Sheet - IT Ticket Tracking with Form"],
        };
        this.smartService
          .patchOutlookEmailSingle(this.singleId, this.access_token, data)
          .subscribe((response1) => {


            //console.log(response);
            this.ngOnInit();
          });
        this.projectSmartSheet.reset();
        var x = document.getElementById('closeModalPmdashboard').click();
        return x;
      },
      (error) => {
        this.toastr.error(+error + 'Error Sending the Request');
      }
    );
  }

  replyMessage(id, index) {
  //  console.log(id, index);
    this.showTextArea[index] = true;
  }

  replyAll(id, index) {
  //  console.log(id, index);
  //  console.log(this.showTextArea.length);
    this.indexFrom = index;
    this.showTextArea[index] = true;
    // this.showTextArea[index-1] = false;
    // for(var i=0; i<=this.showTextArea.length; i++){
    //   this.showTextArea[i] = false;
    //   this.showTextArea[index] = true;
    // }
  }

  sendEmail(id, index) {
    var data = {
      Comment: this.replyEmail.get('replyMessages').value,
    };
  //  console.log(id, data);
    this.showTextArea[index] = false;
    this.smartService.postEmailReply(id, this.access_token, data).subscribe(
      (response) => {
        this.smartService
          .getOutlookEmailSingleConversation(
            this.conversationId,
            this.access_token
          )
          .subscribe((rConversation) => {
           // console.log('Response from conversation', rConversation);
            this.conversationValue = rConversation.value;
          });
        this.replyEmail.reset();
        this.ngOnInit();
      //  console.log('Reply Sent', response);
      },
      (error) => {
        console.error();
      }
    );
  }

  cancelEmail(id,index) {
    this.showTextArea[index] = false;
  }
}
