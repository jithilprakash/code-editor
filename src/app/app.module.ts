import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AceEditorModule } from "ng2-ace-editor";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AppComponent } from './app.component';
import { EditorPaneComponent } from './editor-pane/editor-pane.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    EditorPaneComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    AceEditorModule,
    FormsModule,
    CommonModule
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
