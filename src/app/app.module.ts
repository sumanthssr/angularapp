import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { LandingSearchComponent } from './landing-search/landing-search.component';
import { SearchHeadlineApiService }          from './search-headline-api.service';

import { SearchViewComponent } from './search-view/search-view.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingSearchComponent,
    SearchViewComponent
  ],
  imports: [
    BrowserModule,
     HttpModule,
     HttpClientModule, 
     FormsModule,
     InMemoryWebApiModule.forRoot(InMemoryDataService,{passThruUnknownUrl: true}),
     
         RouterModule.forRoot([
      {
        path: 'landing',
        component:LandingSearchComponent
      },
      { path: '', redirectTo: '/landing', pathMatch: 'full' },
      { path: 'searchview', component: SearchViewComponent}
    ])
  ],
  providers: [SearchHeadlineApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
