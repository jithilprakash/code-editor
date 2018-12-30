import { Component, OnInit } from "@angular/core";
import { CodepaneService } from "src/app/services/codepane.service";
import saveAs from "file-saver";
import * as JSZip from 'jszip';
import { zip } from "rxjs";


@Component({
  selector: "side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"]
})
export class SideBarComponent implements OnInit {
  selectedHtml: boolean = true;
  selectedCss: boolean = true;
  selectedJs: boolean = true;
  htmlData: string;
  cssData: string;
  jsData: string;
  zip: JSZip = new JSZip();

  constructor(private codepaneService: CodepaneService) {}

  ngOnInit() {}

  tabsChanged() {
    let tabsSelectedObject = {
      selectedHtml: this.selectedHtml,
      selectedCss: this.selectedCss,
      selectedJs: this.selectedJs
    };
    // console.log(tabsSelectedObject)
    this.codepaneService.selectedTabs(tabsSelectedObject);
  }

  saveData() {
    console.log(this.codepaneService.getWebpageData());
    let webpageData = this.codepaneService.getWebpageData();

    if (webpageData != "defined" || webpageData != null) {
      
      // saveAs(blob, "index.html");
      this.zip.file("index.html",webpageData.html);
      this.zip.file("styles.css",webpageData.css);
      this.zip.file("action.js",webpageData.js)
      this.zip.generateAsync({type:"blob"}).then(function(content) {

        saveAs(content, "tryOut.zip");
    })
  }
}

alignCode(){
  this.codepaneService.notifyHeaderClick('alignCode');
}

runPlayground(){
  this.codepaneService.notifyHeaderClick('run');
}
}