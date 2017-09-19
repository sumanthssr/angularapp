import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
 
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Subject }    from 'rxjs/Subject';
import { Provider }        from './provider';
import { Article }        from './article';

@Injectable()
export class SearchHeadlineApiService {
handleError: any;
   // Observable string sources
  private caseNumber = new Subject<string>();  
   private data1 = '';
  // Observable string streams
  caseNumber$ = this.caseNumber.asObservable();

    // Service message commands
   private searchUrl = 'https://newsapi.org/v1/articles?source=';
private apiKey = '&apiKey=abb056465e9e4cc5a825c482e80903a7';  
private baseUrl = '';





  publishData(data: string) {
    this.caseNumber.next(data);
    this.data1=data;
  }

  constructor(private http: Http) {}
 


 getArticles () {
   
    this.baseUrl= this.searchUrl+this.data1+this.apiKey;

    return this.http.get(this.baseUrl)
        .map(res => <Article[]> res.json().articles)
        .catch(error => {
            console.log(error);
            return Observable.throw(error);
        });
}

  search(term: string): Observable<Provider[]> {
    return this.http
              .get(`api/providers/?name=${term}`)
              .map(response => response.json().data as Provider[]);
  }

}
