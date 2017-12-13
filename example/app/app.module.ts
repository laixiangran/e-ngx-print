import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ENgxPrintModule } from "../../src/e-ngx-print.module";

@NgModule({
    imports: [
        BrowserModule,
        ENgxPrintModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
