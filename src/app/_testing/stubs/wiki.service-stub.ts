import { WikiModel } from '../../wiki/wiki.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

export class WikiServiceStub {
  page = null;
  sendSuccessResponse = null;
  wikiPage:WikiModel = {
    dateCreated: new Date("2018-09-29T15:31:54.929Z"),
    dateUpdated: new Date("2018-10-27T23:12:48.782Z"),
    pageContent: "## MOOOO!?↵No not really :)↵...*or is it?*↵↵yes",
    path: "example2"
  }

  getPageData(passedInPath): Observable<WikiModel> {     
    console.log('getPageData called');
    return of(this.wikiPage);
  }

  updatePageContent(wikiPage){
    
  }

  createPage(routeNameInput: string){
    if (routeNameInput) {
      this.sendSuccessResponse = true;
      return of({type: 'success', message: 'Status 200: Wiki created!'})
    } else {
      this.sendSuccessResponse = false;
      return Observable.create(observer => observer.error(new Error('Error! Failed to create wiki. See logs for details')));
    }
  }  
}
