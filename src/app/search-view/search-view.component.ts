import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router }            from '@angular/router';
import {  ChangeDetectorRef } from '@angular/core';
// Observable class extensions
import 'rxjs/add/observable/of';
 
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

//import { GetHeadlineService }          from '../get-headline.service';
import { SearchHeadlineApiService }          from '../search-headline-api.service';
import { Provider }        from '../provider';
import { Article }        from '../article';
@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css'],
  
})
export class SearchViewComponent implements OnInit {
 tittle :any = ''; 
 tittle2 :any = '';
 public articles: Article[];
  // Observable string streams
  
  constructor( private searchHeadlineApiService: SearchHeadlineApiService,private cdRef:ChangeDetectorRef ,) {  }
  ngOnInit() {
  	  this.searchHeadlineApiService.caseNumber$.subscribe(
            data => {
                console.log('Sibling1Component-received from search: ' + data);
                this.tittle= data;
                 });
  	  this.searchHeadlineApiService.getArticles().subscribe(
        articles =>{
            this.articles = articles;
            console.log(this.articles);
        },
        error => alert("error"));
  	  
  }

  

}
