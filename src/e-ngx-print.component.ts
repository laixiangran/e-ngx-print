import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'e-ngx-print',
	templateUrl: './e-ngx-print.component.html',
	styleUrls: ['./e-ngx-print.component.scss']
})
export class ENgxPrintComponent implements OnInit {
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

	constructor() {
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
			'print-btn': true,
			'print-btn-success': true
		};
		this.popTitle = '打印窗口';
		this.btnText = '打印';
		this.oldBtnText = this.btnText;
		this.printComplete = new EventEmitter<any>(false);
	}

	ngOnInit() {
	}

	/**
	 * 写入文档
	 */
	private write(): any {
		this.printDoc.open();
		this.printDoc.write(`${this.docType()}${this.getHead()}${this.getBody()}`);
		this.printDoc.close();
	}

	/**
	 * 获取DOCTYPE
	 * @returns {string}
	 */
	private docType(): string {
		if (this.mode === this.modes.iframe) {
			return '';
		}
		if (this.standard === this.standards.html5) {
			return '<!DOCTYPE html>';
		}
		let transitional: string = this.standard === this.standards.loose ? 'Transitional' : '',
			dtd: string = this.standard === this.standards.loose ? 'loose' : 'strict';
		return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 ${transitional}//EN" "http://www.w3.org/TR/html4/${dtd}.dtd">`;
	}

	/**
	 * 获取head
	 * @returns {string}
	 */
	private getHead(): string {
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
	private getBody() {
		let html: string = '';
		if (this.printHTML) {
			if (this.printHTML.outerHTML) {
				html = this.printHTML.outerHTML;
			} else {
				html = this.printHTML;
			}
		}
		return `<body><object id="eNgxPrintWB" style="display: none;" height="0" classid="clsid:8856F961-340A-11D0-A96B-00C04FD705A2"></object>${html}</body>`;
	}

	/**
	 * 开始打印
	 */
	private startPrint() {
		let timeoutId: any = setTimeout(() => {
			this.printWindow.focus();
			if (!!window['ActiveXObject'] || 'ActiveXObject' in window) { // IE浏览器
				try {
					this.printWindow['eNgxPrintWB'].ExecWB(7, 1); // IE下增加打印预览
				} catch (e) {
					console.error(e);
				}
			} else {
				this.printWindow.print();
			}
			if (this.mode === this.modes.popup) {
				let id: any = setTimeout(() => {
					clearTimeout(id);
					this.printWindow.close();
				}, 500);
			}
			clearTimeout(timeoutId);
			this.printComplete.emit();
			this.btnText = this.oldBtnText;
			this.setInputAndTextareaValue(true);
		}, 500);
	}

	/**
	 * 创建iframe
	 */
	private createIframe() {
		let oldFrame: any = document.getElementsByClassName('e-ngx-print-frame');
		if (oldFrame.length > 0) {
			oldFrame[0].parentNode.removeChild(oldFrame[0]);
		}
		try {
			let printIframe: any = document.createElement('iframe');
			document.body.appendChild(printIframe);
			printIframe.style.position = 'absolute';
			printIframe.style.border = '0';
			printIframe.style.width = '0';
			printIframe.style.height = '0';
			printIframe.style.left = '0';
			printIframe.style.top = '0';
			printIframe.style.zIndex = '-1';
			printIframe.className = 'e-ngx-print-frame';
			this.printWindow = printIframe.contentWindow;
			this.printDoc = printIframe.contentDocument ? printIframe.contentDocument : (printIframe.contentWindow ? printIframe.contentWindow.document : printIframe.document);
		}
		catch (e) {
			throw e + '. iframes may not be supported in this browser.';
		}

		if (!this.printWindow) {
			throw 'Cannot find window.';
		}

		if (!this.printDoc) {
			throw 'Cannot find document.';
		}
	}

	/**
	 * 创建弹出窗口
	 */
	private createPopup() {
		let windowAttr = `location=yes,statusbar=no,directories=no,menubar=no,titlebar=no,toolbar=no,dependent=no`;
		windowAttr += `,width=${window.screen.width},height=${window.screen.height};`;
		windowAttr += ',resizable=yes,personalbar=no,scrollbars=yes';
		let newWin = window.open('', '_blank', windowAttr);
		this.printWindow = newWin;
		this.printDoc = newWin.document;
	}

	/**
	 * 获取打印窗口
	 */
	private getPrintWindow() {
		if (this.mode === this.modes.iframe) {
			this.createIframe();
		} else if (this.mode === this.modes.popup) {
			this.createPopup();
		}
	}

	/**
	 * 开始打印
	 * @param printHTML 打印的HTML
	 */
	print(printHTML?: any) {
		this.printHTML = printHTML ? printHTML : this.printHTML;
		if (!this.printHTML.outerHTML) {
			const div: HTMLDivElement = document.createElement('div');
			div.innerHTML = this.printHTML;
			this.printHTML = div;
		}
		this.oldBtnText = this.btnText;
		this.btnText = '准备打印...';
		let timeoutId: number = window.setTimeout(() => {
			window.clearTimeout(timeoutId);
			this.setInputAndTextareaValue();
			this.getPrintWindow();
			this.write();
			this.startPrint();
		}, 500);
	}

	/**
	 * 设置打印文档中输入框和文本域的值
	 * @param {boolean} isReset 是否恢复到初始状态
	 */
	setInputAndTextareaValue(isReset: boolean = false) {
		const inputs: any = this.printHTML.getElementsByTagName('input');
		const excludeTypes: string[] = ['hidden', 'button', 'reset', 'submit']; // 排除的 input 类型
		const textareas: any = this.printHTML.getElementsByTagName('textarea');
		const selects: any = this.printHTML.getElementsByTagName('select');
		this.toArray(inputs).forEach((input: HTMLInputElement) => {
			if (excludeTypes.indexOf(input.type) < 0) {
				if (!isReset) {
					if (input.type === 'radio' || input.type === 'checkbox') {
						if (!input.getAttribute('checked') && input.checked) {
							input.setAttribute('isSetValue', 'true'); // 标识 value 是否是打印时设置的，用于打印完之后判断是否删除
							input.setAttribute('checked', input.checked + '');
						}
					} else {
						if (!input.getAttribute('value')) {
							input.setAttribute('isSetValue', 'true'); // 标识 value 是否是打印时设置的，用于打印完之后判断是否删除
							input.setAttribute('value', input.value);
						}
					}
				} else {
					if (input.type === 'radio' || input.type === 'checkbox') {
						if (!!input.getAttribute('isSetValue')) {
							input.removeAttribute('checked');
							input.removeAttribute('isSetValue');
						}
					} else {
						if (!!input.getAttribute('isSetValue')) {
							input.removeAttribute('value');
							input.removeAttribute('isSetValue');
						}
					}
				}
			}
		});
		this.toArray(textareas).forEach((textarea: HTMLTextAreaElement) => {
			if (!isReset) {
				if (!textarea.innerHTML) {
					textarea.setAttribute('isSetHtml', 'true'); // 标识 innerHTML 是否是打印时设置的，用于打印完之后判断是否删除
					textarea.innerHTML = textarea.value;
				}
			} else {
				if (!!textarea.getAttribute('isSetHtml')) {
					textarea.innerHTML = '';
					textarea.removeAttribute('isSetHtml');
				}
			}
		});
		this.toArray(selects).forEach((select: HTMLSelectElement) => {
			this.toArray(select.selectedOptions).forEach((option: HTMLOptionElement) => {
				if (!isReset) {
					if (!option.getAttribute('selected')) {
						option.setAttribute('isSetValue', 'true'); // 标识 innerHTML 是否是打印时设置的，用于打印完之后判断是否删除
						option.setAttribute('selected', 'true');
					}
				} else {
					if (!!option.getAttribute('isSetValue')) {
						option.removeAttribute('selected');
						option.removeAttribute('isSetValue');
					}
				}
			});
		});
	}

	/**
	 * 将类数组转换成数组
	 * @param arr
	 * @returns {any[]}
	 */
	toArray(arr: any): any[] {
		return arr ? Array.prototype.slice.call(arr, 0) : [];
	}
}
