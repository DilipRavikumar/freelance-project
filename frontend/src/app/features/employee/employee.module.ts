import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
// primeng v20: Calendar -> DatePicker, Dropdown -> Select
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';

import { EmployeeListComponent } from './list/employee-list.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from '../../core/services/api.service';

const routes: Routes = [];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, FormsModule],
  providers: [
    ConfirmationService,
    MessageService,
    {
      provide: 'ApiService',
      useClass: ApiService,
    },
  ],
})
export class EmployeeModule {}
