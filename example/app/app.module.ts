import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {EssenceNg2PrintModule} from "../../src/essence-ng2-print.module";

@NgModule({
    imports: [
        BrowserModule,
		EssenceNg2PrintModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
