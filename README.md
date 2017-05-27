# essence-ng2-print

essence-ng2-print is an Angular component that can print html and text.

## Change Log

## Usage

1. Install

	```shell
	npm install --save essence-ng2-print@latest
	```

2. Set in the .angular-cli.json（@angular/cli）

	```json
    "styles": [
        "../node_modules/bootstrap/dist/css/bootstrap.min.css"
    ]
	```

3. Add the EssenceNg2PrintModule

	```typescript
	import {EssenceNg2PrintModule} from "essence-ng2-print";
	@NgModule({
	    imports: [
	        EssenceNg2PrintModule
	    ]
	})
	```

4. template

	```html
	<div id="print_div" #print_div>
		<table class="table table-striped">
			<thead *ngIf="showHead">
			<tr>
				<th>#</th>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Username</th>
			</tr>
			</thead>
			<tbody>
			<tr *ngFor="let user of datas; let i = index">
				<td>{{i}}</td>
				<td>{{user?.firstName}}</td>
				<td>{{user?.lastName}}</td>
				<td>{{user?.userName}}</td>
			</tr>
			</tbody>
		</table>
		<table *ngIf="hideTable1" id="table1" class="table table-striped">
			<thead>
			<tr>
				<th>#</th>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Username</th>
			</tr>
			</thead>
			<tbody>
			<tr *ngFor="let user of datas; let i = index">
				<td>{{i}}</td>
				<td>{{user?.firstName}}</td>
				<td>{{user?.lastName}}</td>
				<td>{{user?.userName}}</td>
			</tr>
			</tbody>
		</table>
	</div>
	
	<div>
		<essence-ng2-print
				[btnText]="'iframe模式打印'"
				[btnClass]="{'btn': true, 'btn-success': true}"
				[printHTML]="print_div"
				[printStyle]="printStyle"
				[printCSS]="printCSS"
				(printComplete)="printComplete()">
		</essence-ng2-print>
	</div>
	
	<div>
		<essence-ng2-print
				[btnText]="'iframe模式打印字符串'"
				[btnClass]="{'btn': true, 'btn-success': true}"
				[printHTML]="editorText"
				(printComplete)="printComplete()">
		</essence-ng2-print>
	</div>
	
	<div>
		<essence-ng2-print #print1
		                   [showBtn]="false"
		                   [printHTML]="print_div"
		                   [printStyle]="printStyle"
		                   [printCSS]="printCSS"
		                   (printComplete)="printComplete()">
		</essence-ng2-print>
		<button class="btn btn-primary" (click)="customPrint('print1')">自定义打印（iframe模式）</button>
	</div>
	
	<div>
		<essence-ng2-print
				[mode]="'popup'"
				[popTitle]="'表格打印'"
				[btnText]="'popup模式打印'"
				[btnClass]="{'btn': true, 'btn-warning': true}"
				[printHTML]="print_div"
				[printStyle]="printStyle"
				[printCSS]="printCSS"
				(printComplete)="printComplete()">
		</essence-ng2-print>
	</div>
	
	<div>
		<essence-ng2-print #print2
		                   [mode]="'popup'"
		                   [popTitle]="'表格打印'"
		                   [showBtn]="false"
		                   [printHTML]="print_div"
		                   [printStyle]="printStyle"
		                   [printCSS]="printCSS"
		                   (printComplete)="printComplete()">
		</essence-ng2-print>
		<button class="btn btn-primary" (click)="customPrint('print2')">自定义打印（popup模式）</button>
	</div>
	```

5. component

	```typescript
	@ViewChild('print1') printComponent1: EssenceNg2PrintComponent;
	@ViewChild('print2') printComponent2: EssenceNg2PrintComponent;
	
	printDiv: any;
	showHead: boolean = true;
	hideTable1: boolean = false;
	datas: any[];
	printCSS: string[];
	printStyle: string;
	editorText = '<p style="text-align:center;line-height:150%"><strong><span style="font-family: 宋体;line-height: 150%;font-size: 21px"><span style="font-family:宋体">关于</span>××××工程项目划分的请示（函）</span></strong><span style="font-family: 宋体; font-size: 21px; text-indent: 315px;">&nbsp;</span></p><p style="line-height:150%"><strong><span style="font-family: 宋体;line-height: 150%;font-size: 16px">海淀区水利工程质量监督站：</span></strong></p><p style="text-indent:38px;line-height:150%"><span style=";font-family:宋体;line-height:150%;font-size:16px">××××工程，依据××××文件开始建设。（简述工程概况和主要工程量）。</span></p><p style="text-indent:38px;line-height:150%"><span style=";font-family:宋体;line-height:150%;font-size:16px"><span style="font-family:宋体">根据《水利水电工程施工质量检验与评定规程》</span>SL176-2007）、《水利水电基本建设工程单元工程质量评定标准》（SDJ249-88）及《北京市水利工程施工质量评定标准》等有关规定，结合本工程的实际情况，经研究确认本工程项目共划分为××个单位工程，××个分部工程，××个单元工程。其中主要单位工程××个，分别为 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;；主要分部工程××个，分别为 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;；重要隐蔽单元工程××个，分别为 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;；关键部位单元工程××个，分别为 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;。具体划分见附表。</span></p><p style="text-indent:38px;line-height:150%"><span style=";font-family:宋体;line-height:150%;font-size:16px">&nbsp;</span></p><p style="text-indent:38px;line-height:150%"><span style=";font-family:宋体;line-height:150%;font-size:16px"><span style="font-family:宋体">附表：</span>××××工程项目划分表</span></p><p style="text-indent:38px;line-height:150%"><span style=";font-family:宋体;line-height:150%;font-size:16px">&nbsp;</span></p><p style="text-indent:38px;line-height:150%"><span style=";font-family:宋体;line-height:150%;font-size:16px">&nbsp;</span></p><p style="text-indent: 406px; line-height: 150%; text-align: right;"><span style=";font-family:宋体;line-height:150%;font-size:16px">××××××（单位）</span></p><p style="text-indent: 398px; line-height: 150%; text-align: right;"><span style=";font-family:宋体;line-height:150%;font-size:16px">××××年××月××日</span></p>';
	
	constructor (private elRef: ElementRef) {
	    this.datas = [
	        {
	            "firstName": 'Mark',
	            "lastName": 'Otto',
	            "userName": '@mdo'
	        },
	        {
	            "firstName": 'Jacob',
	            "lastName": 'Thornton',
	            "userName": '@fat'
	        },
	        {
	            "firstName": 'Larry',
	            "lastName": 'the Bird',
	            "userName": '@twitter'
	        }
	    ];
	
	    this.printCSS = ['http://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css'];
	    this.printStyle =
	        `
	        th, td {
	            color: red !important;
	        }
	        `;
	}
	
	getPrintDiv () {
	    for (let i: number = 0; i < this.elRef.nativeElement.childNodes.length; i++) {
	        let node: any = this.elRef.nativeElement.childNodes[i];
	        if (node.id === 'print_div') {
	            this.printDiv = node;
	        }
	    }
	}
	
	printComplete () {
	    console.log('打印完成！');
	    this.showHead = true;
	    this.hideTable1 = false;
	}
	
	customPrint (print: string) {
	    this.showHead = false;
	    this.hideTable1 = true;
	    this.getPrintDiv();
	    if (print === 'print1') {
	        this.printComponent1.print();
	    } else if (print === 'print2') {
	        this.printComponent2.print();
	    }
	}
	```

## API

### Inputs

- `mode`（`?string='iframe'`） - 打印模式。可选的值：`iframe`，`popup`

- `standard`（`?string='html5'`） - 弹出窗口的网页文档标准，只适用于`mode = 'popup'`。可选的值：`strict`（严格模式），`loose`（兼容模式），`html5`（HTML5）

- `popTitle`（`?string=''`） - 弹出窗口的标题，只适用于`mode = 'popup'`

- `showBtn`（`?boolean=true`） - 如果为`true`将显示打印按钮

- `btnText`（`?string='打印'`） - 打印按钮显示的文本

- `btnClass`（`?Object={"print-btn": true,"print-btn-success": true};`） - 打印按钮class，传值与`[ngClass]`一样

- `printHTML`（`string|HTMLElement`） - 打印的内容

- `printStyle`（`?string`） - 打印内容style。将写进打印页面的style标签中

- `printCSS`（`?Array<string>`） - 打印内容css文件路径。将在打印页面生成link标签，支持绝对/相对路径（相对于当前路由地址），建议用绝对路径

### Instance Method

- `print` - 开始打印内容

### Outputs

- `printComplete` - 打印完成的事件

## Develop

	```shell
	npm install // 安装依赖包
	
	npm start // 启动项目
	```

# License

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)
