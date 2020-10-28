import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { HomePageComponent } from './Project-Components/home-page/home-page.component';
import { LoginPageComponent } from './Project-Components/login-page/login-page.component';
import { environment } from "../environments/environment";
import { SmartsheetComponent } from './Project-Components/smartsheet/smartsheet.component';
import { SmartsheetscompleteComponent } from './Project-Components/smartsheetscomplete/smartsheetscomplete.component';
import { Sheet2Component } from './Project-Components/sheet2/sheet2.component';

var DEPLOYMENT_URL = environment.deploymentUrl;

const routes: Routes = [
//   {
//     path: 'login',
//     component: LoginPageComponent,
//     resolve: {
//       url: 'externalUrlRedirectResolver',
//     },
//     data: {
//       externalUrl: `https://login.microsoftonline.com/36b1b0eb-fa71-4e59-a557-ea34c19b3063/oauth2/v2.0/authorize?response_type=code&client_id=1fc16e47-79b4-4e8a-b600-480ca42b066f&redirect_uri=${DEPLOYMENT_URL}&scope=openid+offline_access+profile+https:%2f%2foutlook.office.com%2fmail.readwrite+https:%2f%2foutlook.office.com%2fmail.readwrite.shared+https:%2f%2foutlook.office.com%2fmail.send+https:%2f%2foutlook.office.com%2fmail.send.shared+https:%2f%2foutlook.office.com%2fcalendars.readwrite+https:%2f%2foutlook.office.com%2fcalendars.readwrite.shared+https:%2f%2foutlook.office.com%2fcontacts.readwrite+https:%2f%2foutlook.office.com%2fcontacts.readwrite.shared+https:%2f%2foutlook.office.com%2ftasks.readwrite+https:%2f%2foutlook.office.com%2ftasks.readwrite.shared+https:%2f%2foutlook.office.com%2fmailboxsettings.readwrite+https:%2f%2foutlook.office.com%2fpeople.read+https:%2f%2foutlook.office.com%2fuser.readbasic.all&state=3dd2f8ac-17b9-454f-89a9-f3bf93e99fcb&prompt=login`,
//     },
// //         data: {
// //       externalUrl: '

// // https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=6731de76-14a6-49ae-97bc-6eba6914391e&response_type=code&redirect_uri=/home&response_mode=query&scope=openid%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2Fmail.read&state=12345',
// //     },
//   },
  { path: 'home', component: HomePageComponent },
  { path: 'sheet1', component: SmartsheetComponent },
  { path: 'sheet2', component: Sheet2Component },
  { path: "smartsheets/:sheetId", component: SmartsheetscompleteComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: 'externalUrlRedirectResolver',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        window.location.href = (route.data as any).externalUrl;
      },
    },
  ],
})
export class AppRoutingModule {}

export const routingComponents = [HomePageComponent, LoginPageComponent, SmartsheetComponent,SmartsheetscompleteComponent, Sheet2Component];
