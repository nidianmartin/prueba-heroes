import { NgModule } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule} from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';


@NgModule({
  exports: [
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzPopconfirmModule,
    NzPageHeaderModule,
    NzFormModule,
    NzInputModule,
    NzMessageModule,
    NzAutocompleteModule,
    NzImageModule,
    NzCheckboxModule
  ],
})
export class antDesing {}
