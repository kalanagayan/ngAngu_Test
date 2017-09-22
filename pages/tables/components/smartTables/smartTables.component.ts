import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';
import { DefaultModal } from '../../../ui/components/modals/default-modal/default-modal.component';

@Component({
  selector: 'smart-tables',
  templateUrl: './smartTables.html',
  styleUrls: ['./smartTables.scss']
})
export class SmartTables {

  query: string = '';
  errormessage: string='ERROR:';

  settings = {

    actions: {
      add: false,
    },
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },

    columns: {
      subMessageId: {
        title: 'SubMessage Id',
        type: 'string'
      },
      redirectUrl: {
        title: 'Redirect Url',
        type: 'string'
      },
      orderFunctionCode: {
        title: 'Order Function Code',
        type: 'string'
      },
      poNumber: {
        title: 'poNumber',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: SmartTablesService, protected modalService: NgbModal) {
    this.service.getData().then(
      data => {
        this.source.load(data);
        console.log(data);
      },
      error => {
        console.log(error);
        this.smModalShow(error);
      }
    );
  }

  smModalShow(content: string): void {
    const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
    activeModal.componentInstance.modalHeader = this.errormessage;
    activeModal.componentInstance.modalContent = content;
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}