import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'essence-ng2-print',
    templateUrl: './essence-ng2-print.component.html',
    styleUrls: ['./essence-ng2-print.component.scss']
})
export class EssenceNg2PrintComponent implements OnInit {
    @Input() mode: string;
    @Input() standard: string;
    @Input() popTitle: string;
    @Input() showBtn: boolean;
    @Input() btnText: string;
    @Input() btnClass: Object;
    @Input() printHTML: any;
    @Input() printStyle: string;
    @Input() printCSS: string[];
    @Output() printComplete: EventEmitter<any>;

    private modes: any;
    private standards: any;
    private oldBtnText: string;
    private printWindow: Window;
    private printDoc: Document;

    constructor () {
        this.modes = {
            iframe: 'iframe', // iframe模式
            popup: 'popup' // 新窗口模式
        };
        this.standards = {
            strict: 'strict', // 严格模式
            loose: 'loose', // 兼容模式
            html5: 'html5' // html5模式
        };
        this.mode = this.modes.iframe;
        this.standard = this.standards.html5;
        this.popTitle = '';
        this.showBtn = true;
        this.btnClass = {
                "print-btn": true,
                "print-btn-success": true
        };
        this.btnText = '打印';
        this.oldBtnText = this.btnText;
        this.printComplete = new EventEmitter<any>(false);
    }

    ngOnInit () {
    }

    /**
     * 写入文档
     */
    private write (): any {
        this.printDoc.open();
        this.printDoc.write(`${this.docType()}${this.getHead()}${this.getBody()}`);
        this.printDoc.close();
    }

    /**
     * 获取DOCTYPE
     * @returns {string}
     */
    private docType (): string {
        if (this.mode === this.modes.iframe) {
            return "";
        }

        if (this.standard === this.standards.html5) {
            return "<!DOCTYPE html>";
        }

        let transitional: string = this.standard === this.standards.loose ? 'Transitional' : '',
            dtd: string = this.standard === this.standards.loose ? 'loose' : 'strict';
        return '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01' + transitional + '//EN" "http://www.w3.org/TR/html4/' + dtd + '.dtd">';
    }

    /**
     * 获取head
     * @returns {string}
     */
    private getHead (): string {
        let styles: string = '',
            links: string = '';

        // 打印内容的css文件
        if (this.printCSS) {
            this.printCSS.forEach((url) => {
                links += `<link href="${url}" rel="stylesheet">`;
            });
        }

        // 打印内容的style
        if (this.printStyle) {
            styles = `<style>${this.printStyle}</style>`;
        }

        return `<head><title>${this.popTitle}</title>${styles}${links}</head>`;
    }

    /**
     * 获取body
     * @returns {string}
     */
    private getBody () {
        // 打印内容
        let html: string = '';
        if (this.printHTML) {
            if (this.printHTML.outerHTML) {
                html = this.printHTML.outerHTML;
            } else {
                html = this.printHTML;
            }
        } else {
            throw '未绑定属性[printHTML]';
        }
        return `<body>${html}</body>`;
    }

    /**
     * 开始打印
     */
    private startPrint () {
        let timeoutId: number = window.setTimeout(() => {
            this.printWindow.focus();
            this.printWindow.print();
            if (this.mode === this.modes.popup) {
                setTimeout(() => {
                    console.log("dd");
                    this.printWindow.close()
                }, 500);
            }
            window.clearTimeout(timeoutId);
            this.printComplete.emit();
            this.btnText = this.oldBtnText;
        }, 500);
    }

    /**
     * 创建iframe
     */
    private createIframe () {
        let oldFrame: any = document.getElementsByClassName('ng2-print-frame');
        if (oldFrame.length > 0) {
            oldFrame[0].parentNode.removeChild(oldFrame[0]);
        }
        try {
            let printIframe: any = document.createElement('iframe');
            document.body.appendChild(printIframe);
            printIframe.style.position = 'absolute';
            printIframe.style.border = '0px';
            printIframe.style.width = '0px';
            printIframe.style.height = '0px';
            printIframe.style.left = '0';
            printIframe.style.top = '0';
            printIframe.style.zIndex = '-1';
            printIframe.className = "ng2-print-frame";
            this.printWindow = printIframe.contentWindow;
            this.printDoc = printIframe.contentDocument ? printIframe.contentDocument : (printIframe.contentWindow ? printIframe.contentWindow.document : printIframe.document);
        }
        catch (e) {
            throw e + ". iframes may not be supported in this browser.";
        }

        if (!this.printWindow) {
            throw "Cannot find window.";
        }

        if (!this.printDoc) {
            throw "Cannot find document.";
        }
    }

    /**
     * 创建弹出窗口
     */
    private createPopup () {
        let windowAttr = `location=yes,statusbar=no,directories=no,menubar=no,titlebar=no,toolbar=no,dependent=no`;
        windowAttr += `,width=${window.screen.width},height=${window.screen.height};`;
        windowAttr += ",resizable=yes,personalbar=no,scrollbars=yes";
        let newWin = window.open( "", "_blank", windowAttr);
        this.printWindow = newWin;
        this.printDoc = newWin.document;
    }

    /**
     * 获取打印窗口
     */
    private getPrintWindow () {
        if (this.mode === this.modes.iframe) {
            this.createIframe();
        } else if (this.mode === this.modes.popup) {
            this.createPopup();
        }
    }

    /**
     * 打印
     */
    print () {
        this.oldBtnText = this.btnText;
        this.btnText = '准备打印...';
        let timeoutId: number = window.setTimeout(() => {
            window.clearTimeout(timeoutId);
            this.getPrintWindow();
            this.write();
            this.startPrint();
        }, 500);
    }
}
