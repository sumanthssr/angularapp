import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router }            from '@angular/router';

// Observable class extensions
import 'rxjs/add/observable/of';
 
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


import { SearchHeadlineApiService }          from '../search-headline-api.service';
import { Provider }        from '../provider';
@Component({
  selector: 'app-landing-search',
  templateUrl: './landing-search.component.html',
  styleUrls: ['./landing-search.component.css'],
  
})
export class LandingSearchComponent implements OnInit {
  providers: Observable<Provider[]>;
  private searchTerms = new Subject<string>();

  constructor( private searchHeadlineApiService: SearchHeadlineApiService ,private router: Router) {}

    search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() :void {
   
   this.providers = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.searchHeadlineApiService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Provider[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Provider[]>([]);
      });

  }

  gotoDetail(provider: Provider): void {
    let link = ['/searchview'];
    this.router.navigate(link);
    let caseNumber = provider.id;
    this.searchHeadlineApiService.publishData(caseNumber);
    console.log('Sibling1Component-received from sibling2: '+ caseNumber );
   }
   

}
