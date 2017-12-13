import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ENgxPrintComponent } from "./e-ngx-print.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ENgxPrintComponent],
    exports: [CommonModule, ENgxPrintComponent]
})
export class ENgxPrintModule {
}
