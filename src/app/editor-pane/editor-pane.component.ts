import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import "brace";
import "brace/ext/language_tools";
import { Subscription } from "rxjs";
import { CodepaneService } from "../services/codepane.service";

import  beautify  from "beautify";

@Component({
  selector: "editor-pane",
  templateUrl: "./editor-pane.component.html",
  styleUrls: ["./editor-pane.component.scss"]
})
export class EditorPaneComponent {
  jsLoadType: any[] = [
    "onLoad",
    "onDomReady",
    "No wrap - in head",
    "No wrap - in body"
  ];
  loadType: string = this.jsLoadType[0];
  selected: any;
  subscription: Subscription;
  @ViewChild("editor") editor;
  @ViewChild("cssEditor") cssEditor;
  @ViewChild("jsEditor") jsEditor;
  @ViewChild("iframe") iframe: ElementRef;
  showHtml: boolean = true;
  showCss: boolean = true;
  showJs: boolean = true;

  html: string = "";
  css: string = "";
  js: string = "";
  options: any = {
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutoCompletion: true
  };

  constructor(private codepaneService: CodepaneService) {
    this.subscription = this.codepaneService
      .getSelectedTabs()
      .subscribe(selectedtabs => {
        this.selected = selectedtabs;
        this.showHtml = this.selected.selectedTabs.selectedHtml;
        this.showCss = this.selected.selectedTabs.selectedCss;
        this.showJs = this.selected.selectedTabs.selectedJs;
      });
  }

  ngAfterViewInit() {
    this.editor.setTheme("monokai");

    this.editor.getEditor().setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutoCompletion: true
    });
   

    this.cssEditor.getEditor().setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutoCompletion: true
    });
    this.jsEditor.getEditor().setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutoCompletion: true
    });

    this.editor.getEditor().commands.addCommand({
      name: "showOtherCompletions",
      bindKey: "Ctrl-.",
      exec: function(editor) {}
    });
  }

  runPlayground() {
    let doc =
      this.iframe.nativeElement.contentDocument ||
      this.iframe.nativeElement.contentWindow;

    doc.open();
    doc.write("<!DOCTYPE html>");
    doc.write("<html>");
    doc.write("<head>");
    doc.write("<style type='text/css'>" + this.css + "</style>");
    if (this.loadType == "onLoad") {
      doc.write(
        "<script type='text/javascript'>window.onload = function() {" +
          this.js +
          "}</script>"
      );
    } else if (this.loadType == "No wrap - in head" || this.loadType == "onDomready") {
      doc.write("<script type='text/javascript'>" + this.js + "</script>");
    }

    doc.write("</head>");
    doc.write("<body>");
    if (this.loadType == "No wrap - in body") {
      doc.write("<script type='text/javascript'>" + this.js + "</script>");
    }
    doc.write(this.html);
    doc.write("</body>");
    doc.write("</html>");
    doc.close();
  }
  selectedLoadType(loadType: string) {
    this.loadType = loadType;
    console.log("-----", loadType);
  }
  onDataChange(){
    console.log("onchanged");
    this.codepaneService.setWebData(this.html,this.css,this.js)
  }

  beautify(){
    console.log("align");
    this.html =beautify(this.html, {format: 'html'})
  }
  ngOnInit() {}
}
