import { Component, ElementRef, ViewChild } from '@angular/core';
import { ENgxPrintComponent } from '../../src/e-ngx-print.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	@ViewChild('print1') printComponent1: ENgxPrintComponent;
	@ViewChild('print2') printComponent2: ENgxPrintComponent;

	showHead: boolean = true;
	hideTable1: boolean = false;
	datas: any[];
	printCSS: string[];
	printStyle: string;
	test: string = '666666';
	test2: string = '88888888';

	editorText = '<p style="text-align:center;line-height:150%"><strong><span style="font-family: 宋体;line-height: 150%;font-size: 21px"><span style="font-family:宋体">关于</span>××××工程项目划分的请示（函）</span></strong><span style="font-family: 宋体; font-size: 21px; text-indent: 315px;">&nbsp;</span></p><p style="line-height:150%"><strong><span style="font-family: 宋体;line-height: 150%;font-size: 16px">海淀区水利工程质量监督站：</span></strong></p><p style="text-indent:38px;line-height:150%"><span style=";font-family:宋体;line-height:150%;font-size:16px">××××工程，依据××××文件开始建设。（简述工程概况和主要工程量）。</span></p><p style="text-indent:38px;line-height:150%"><span style=";font-family:宋体;line-height:150%;font-size:16px"><span style="font-family:宋体">根据《水利水电工程施工质量检验与评定规程》</span>SL176-2007）、《水利水电基本建设工程单元工程质量评定标准》（SDJ249-88）及《北京市水利工程施工质量评定标准》等有关规定，结合本工程的实际情况，经研究确认本工程项目共划分为××个单位工程，××个分部工程，××个单元工程。其中主要单位工程××个，分别为 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;；主要分部工程××个，分别为 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;；重要隐蔽单元工程××个，分别为 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;；关键部位单元工程××个，分别为 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;。具体划分见附表。</span></p><p style="text-indent:38px;line-height:150%"><span style=";font-family:宋体;line-height:150%;font-size:16px">&nbsp;</span></p><p style="text-indent:38px;line-height:150%"><span style=";font-family:宋体;line-height:150%;font-size:16px"><span style="font-family:宋体">附表：</span>××××工程项目划分表</span></p><p style="text-indent:38px;line-height:150%"><span style=";font-family:宋体;line-height:150%;font-size:16px">&nbsp;</span></p><p style="text-indent:38px;line-height:150%"><span style=";font-family:宋体;line-height:150%;font-size:16px">&nbsp;</span></p><p style="text-indent: 406px; line-height: 150%; text-align: right;"><span style=";font-family:宋体;line-height:150%;font-size:16px">××××××（单位）</span></p><p style="text-indent: 398px; line-height: 150%; text-align: right;"><span style=";font-family:宋体;line-height:150%;font-size:16px">××××年××月××日</span></p>';

	constructor(private elRef: ElementRef) {
		this.datas = [
			{
				'firstName': 'Mark',
				'lastName': 'Otto',
				'userName': '@mdo'
			},
			{
				'firstName': 'Jacob',
				'lastName': 'Thornton',
				'userName': '@fat'
			},
			{
				'firstName': 'Larry',
				'lastName': 'the Bird',
				'userName': '@twitter'
			}
		];

		this.printCSS = ['http://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css', '/assets/styles/print.css'];

		this.printStyle =
			`
			th, td {
				color: blue !important;
			}
			`;
	}

	printComplete() {
		console.log('打印完成！');
		this.showHead = true;
		this.hideTable1 = false;
	}

	customPrint(print: string) {
		this.showHead = false;
		this.hideTable1 = true;
		const printHTML: HTMLElement = this.elRef.nativeElement.childNodes[0];
		if (print === 'print1') {
			this.printComponent1.print(printHTML);
		} else if (print === 'print2') {
			this.printComponent2.print();
		}
	}
}
