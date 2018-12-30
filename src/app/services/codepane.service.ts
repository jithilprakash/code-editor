import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CodepaneService {
  constructor() {}
  private subject = new Subject<any>();
  private webpageData: any;

  selectedTabs(selected: any) {
    this.subject.next({ selectedTabs: selected });
  }

  getSelectedTabs(): Observable<any> {
    return this.subject.asObservable();
  }

  setWebData(html: string, css: string, js: string) {
    this.webpageData = { html: html, css: css, js: js };
    //console.log("service change",this.webpageData);
  }

  getWebpageData(): any {
    return this.webpageData;
  }
}
