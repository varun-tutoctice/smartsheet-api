import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpHeaders
} from "@angular/common/http";
import { throwError, Subject } from "rxjs";
import { map, retry, catchError } from "rxjs/operators";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { environment } from "../../environments/environment";
import { env } from 'process';



@Injectable({
  providedIn: 'root'
})


export class SmartsheetService {

  DEPLOYMENT_URL = environment.deploymentUrl;
  token;
  SMARTSHEET_URL = environment.smartSheetUrl;
  baseUrl = environment.baseUrl
  tokenUrl = environment.tokenUrl;


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router

  ) {
   this.token = this.route.snapshot.queryParams.code;
   }

  handleError(error: HttpErrorResponse) {
    let errorMessage = "Unknown error!";
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }


  getOutlookEmail(a_token) {
  // console.log(a_token);
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json",
    "Authorization":`Bearer ${a_token}`,
    "Prefer":"outlook.allow-unsafe-html" })
    };
    console.log(options);
    // return this.http.get(`https://outlook.office.com/api/v2.0/me/MailFolders/inbox/messages?$filter=InferenceClassification eq 'Focused' and IsRead eq false&$orderby=InferenceClassification desc&$top=20&$select=receivedDateTime,from,subject,hasAttachments,bodyPreview,IsRead,Body`, options).pipe(
    //     map(response => JSON.parse(JSON.stringify(response))),
    //     catchError(this.handleError)
    //  );

  //   return this.http.get(`https://outlook.office.com/api/v2.0/me/MailFolders/inbox/messages?$filter=InferenceClassification eq 'Focused'&$orderby=InferenceClassification desc&$top=40&$select=receivedDateTime,from,subject,hasAttachments,bodyPreview,IsRead,Body,Categories&$count=true`, options).pipe(
  //     map(response => JSON.parse(JSON.stringify(response))),
  //     catchError(this.handleError)
  //  );

  return this.http.get(`https://outlook.office.com/api/v2.0/me/MailFolders/inbox/messages?$filter=InferenceClassification eq 'Focused'&$orderby=InferenceClassification desc&$top=40`, options).pipe(
    map(response => JSON.parse(JSON.stringify(response))),
    catchError(this.handleError)
 );

  }


  getOutlookEmailSingle(id, a_token) {
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json",
    "Authorization":`Bearer ${a_token}`,
    "Prefer":"outlook.allow-unsafe-html"})
    };
    return this.http.get(`https://outlook.office.com/api/v2.0/me/messages/${id}`, options).pipe(
      map(response => JSON.parse(JSON.stringify(response))),
      catchError(this.handleError)
    );
  }


  getOutlookEmailSingleConversation(conversation_id, a_token) {
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json",
    "Authorization":`Bearer ${a_token}`,
    "Prefer":"outlook.allow-unsafe-html" })
    };
   // console.log(`https://outlook.office.com/api/v2.0/me/messages/?$filter=ConversationId eq '${conversation_id}'`);
    return this.http.get(`https://outlook.office.com/api/v2.0/me/messages/?$filter=ConversationId eq '${conversation_id}'&$orderby=ConversationId desc`, options).pipe(
      map(response => JSON.parse(JSON.stringify(response))),
      catchError(this.handleError)
    );
  }

  patchOutlookEmailSingle(id, a_token, data) {
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json",
    "Authorization":`Bearer ${a_token}`,
    "Prefer":"outlook.allow-unsafe-html" })
    };
    return this.http.patch(`https://outlook.office.com/api/v2.0/me/messages/${id}`,data, options).pipe(
      map(response => JSON.parse(JSON.stringify(response))),
      catchError(this.handleError));
  }

  postEmailReply(id, a_token, data) {
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json",
    "Authorization":`Bearer ${a_token}`,
  "outlook.body-content-type":"text" })
    };
    return this.http.post(`https://outlook.office.com/api/v2.0/me/messages/${id}/replyall`,data, options).pipe(
      map(response => JSON.parse(JSON.stringify(response))),
      catchError(this.handleError));
  }

  getAccessToken() {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    let body = `grant_type=password&username=hhsprotectservicedesk@aurotechcorp.com&password=Muc73066&scope=https://outlook.office.com/mail.readwrite&client_id=1fc16e47-79b4-4e8a-b600-480ca42b066f&client_secret=~QcBzvBs4YHO__ynT74ta-fZ2uB2wVo2Rv`;
    return this.http
      .post(
        `${this.tokenUrl}/36b1b0eb-fa71-4e59-a557-ea34c19b3063/oauth2/v2.0/token`,
        body,
        options
      )
      .pipe(
        map((response) => JSON.parse(JSON.stringify(response))),
        catchError(this.handleError)
      );
  }

  // getAccessToken(){
  //   const options = {
  //     headers: new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded"})
  //   };
  //   let body=`grant_type=authorization_code&code=${this.token}&scope=https://outlook.office.com/mail.readwrite&redirect_uri=${this.DEPLOYMENT_URL}&client_id=1fc16e47-79b4-4e8a-b600-480ca42b066f&client_secret=~QcBzvBs4YHO__ynT74ta-fZ2uB2wVo2Rv`
  //   return this.http.post(`${this.tokenUrl}`, body, options).pipe(
  //     map(response => JSON.parse(JSON.stringify(response))),
  //     catchError(this.handleError)
  //   );
  // }


  // getRefreshToken(refreshToken){
  //    const options = {
  //      headers: new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded"})
  //    };
  //    let body=`grant_type=refresh_token&refresh_token=${refreshToken}&scope=https://outlook.office.com/mail.readwrite&redirect_uri=${this.DEPLOYMENT_URL}&client_id=1fc16e47-79b4-4e8a-b600-480ca42b066f&client_secret=~QcBzvBs4YHO__ynT74ta-fZ2uB2wVo2Rv`
  //    return this.http.post(`${this.tokenUrl}`, body, options).pipe(
  //      map(response => JSON.parse(JSON.stringify(response))),
  //      catchError(this.handleError)
  //    );
  //  }

  postSmartSheetData(data,id){
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json",
    "Authorization":"Bearer ufkcomfo9hwjsrjwixg288de9d"})
    };
    return this.http.post(`${this.SMARTSHEET_URL}/sheets/${id}/rows`, data, options).pipe(
      map(response => JSON.parse(JSON.stringify(response))),
      catchError(this.handleError)
    );
  }

  getSmartSheetData(id){
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json",
    "Authorization":"Bearer ufkcomfo9hwjsrjwixg288de9d"})
    };
    return this.http.get(`${this.SMARTSHEET_URL}/sheets/${id}`, options).pipe(
      map(response => JSON.parse(JSON.stringify(response))),
      catchError(this.handleError)
    );
  }

  getSmartSheets(){
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json",
    "Authorization":"Bearer ufkcomfo9hwjsrjwixg288de9d"})
    };
    return this.http.get(`${this.SMARTSHEET_URL}/sheets`, options).pipe(
      map(response => JSON.parse(JSON.stringify(response))),
      catchError(this.handleError)
    );
  }


  getSmartSheetDataIdividual(sheetid,id){
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json",
    "Authorization":"Bearer ufkcomfo9hwjsrjwixg288de9d"})
    };
    return this.http.get(`${this.SMARTSHEET_URL}/sheets/${sheetid}/rows/${id}`, options).pipe(
      map(response => JSON.parse(JSON.stringify(response))),
      catchError(this.handleError)
    );
  }

  createDiscussions(sheetId, rowId,data) {
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json",
    "Authorization":"Bearer ufkcomfo9hwjsrjwixg288de9d"})
    };
    return this.http.post(`${this.SMARTSHEET_URL}/sheets/${sheetId}/rows/${rowId}/discussions`, data, options).pipe(
      map(response => JSON.parse(JSON.stringify(response))),
      catchError(this.handleError)
    );
  }


  putSmartSheetData(id, data1, statusCheck) {
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json",
    "Authorization":"Bearer ufkcomfo9hwjsrjwixg288de9d" })
    };
    console.log(data1);
    var data = {
      // "comment":"Hello",
      cells: [
        {
          columnId: 8894537820071812,
          value: data1.cells[0].value == undefined? '': data1.cells[0].value,
        },
        {
          columnId: 98444797863812,
          value: data1.cells[1].value == undefined? '': data1.cells[1].value,
          displayValue: data1.cells[1].value == undefined? '': data1.cells[1].value,
        },
        {
          columnId: 4602044425234308,
          value: data1.cells[2].value == undefined? '': data1.cells[2].value,
          displayValue: data1.cells[2].value == undefined? '': data1.cells[2].value,
        },
        {
          columnId: 1224344704706436,
          value: data1.cells[5].value == undefined? '': data1.cells[5].value,
        },
        {
          columnId: 5727944332076932,
          value: data1.cells[6].value == undefined? '': data1.cells[6].value,
        },
        {
          columnId: 3476144518391684,
          value: statusCheck,
          displayValue: statusCheck,
        },
        {
          columnId: 661394751285124,
          value: data1.cells[9].value == undefined? '': data1.cells[9].value,
          displayValue: data1.cells[9].value == undefined? '': data1.cells[9].value,
        },
      ],
    };
    console.log(data);
    return this.http.put(`${this.SMARTSHEET_URL}/sheets/7100131184011140/rows/${id}`, data, options).pipe(
      map(response => JSON.parse(JSON.stringify(response))),
      catchError(this.handleError)
    );
  }


  putIndividualSmartSheetData(sheetid,id,data){
    console.log(sheetid,id,data);
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json",
    "Authorization":"Bearer ufkcomfo9hwjsrjwixg288de9d"})
    };
    return this.http.put(`${this.SMARTSHEET_URL}/sheets/${sheetid}/rows/${id}`, data, options).pipe(
      map(response => JSON.parse(JSON.stringify(response))),
      catchError(this.handleError)
    );
  }










  putSmartSheetData2(id, data1, statusCheck) {

    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json",
    "Authorization":"Bearer ufkcomfo9hwjsrjwixg288de9d" })
    };
   // console.log(data1);
    var data = {
      "cells": [
        {
            "columnId": 5048459031013252,
            "value": data1.cells[0].value == undefined? '': data1.cells[0].value,
            "displayValue": data1.cells[0].value == undefined? '': data1.cells[0].value
        },
        {
            "columnId": 1670759310485380,
            "value":data1.cells[3].value == undefined? '': data1.cells[3].value,
        },
        {
            "columnId": 8029084730058628,
            "value": data1.cells[4].value == undefined? '': data1.cells[4].value,
            "displayValue": data1.cells[4].value == undefined? '': data1.cells[4].value
        },
        {
            "columnId": 3922559124170628,
            "value":data1.cells[5].value == undefined? '': data1.cells[5].value,
            "displayValue": data1.cells[5].value == undefined? '': data1.cells[5].value
        },
        {
            "columnId": 8426158751541124,
            "value": data1.cells[6].value == undefined? '': data1.cells[6].value,
        },
        {
            "columnId": 1107809357064068,
            "value": data1.cells[7].value == undefined? '': data1.cells[7].value,
        },
        {
            "columnId": 5611408984434564,
            "value": data1.cells[8].value == undefined? '': data1.cells[8].value,
            "displayValue": data1.cells[8].value == undefined? '': data1.cells[8].value
        },
        {
            "columnId": 3359609170749316,
            "value": statusCheck,
            "displayValue": statusCheck
        },
        {
            "columnId": 7863208798119812,
            "value": data1.cells[10].value == undefined? '': data1.cells[10].value
        },
        {
            "columnId": 8989108704962436,
            "value": data1.cells[15].value == undefined? '': data1.cells[15].value,
            "displayValue": data1.cells[15].value == undefined? '': data1.cells[15].value
        },
      ]
    }
    console.log(data, "Sheet2");
    return this.http.put(`${this.SMARTSHEET_URL}/sheets/6379298232788868/rows/${id}`, data, options).pipe(
      map(response => JSON.parse(JSON.stringify(response))),
      catchError(this.handleError)
    );
  }

}
