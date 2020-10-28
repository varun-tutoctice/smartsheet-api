import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routingComponents } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { HashLocationStrategy, Location, LocationStrategy, CurrencyPipe } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TopnavComponent } from './Project-Components/topnav/topnav.component';
import {DragDropModule} from '@angular/cdk/drag-drop';


import {MatNativeDateModule} from '@angular/material/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';


//import {DemoMaterialModule} from '../app/material-module';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    TopnavComponent,



  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatNativeDateModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }), 
  ],
  providers: [
   // Location, 
    //{provide: LocationStrategy, useClass: HashLocationStrategy}
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
