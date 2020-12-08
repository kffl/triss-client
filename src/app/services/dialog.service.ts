import { Injectable } from '@angular/core';
import {InfoDialogComponent} from '../components/shared/info-dialog/info-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {RejectDialogComponent} from '../components/shared/reject-dialog/reject-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  dialogConfig = new MatDialogConfig();

  constructor(
    private dialog: MatDialog,
  ) { }

  getDialog(): MatDialog {
    return this.dialog;
  }

  showSimpleDialog(title: string, content: string, showCloseButton?: boolean) {
    this.dialogConfig.data = {
      title,
      content,
      showCloseButton
    };
    return this.dialog.open(InfoDialogComponent, this.dialogConfig);
  }

  showErrorDialog(title: string, content: string, error: HttpErrorResponse, showCloseButton?: boolean) {
    this.dialogConfig.data = {
      title,
      content,
      showCloseButton,
      error: `${error.status} ${error.statusText}`
    };
    return this.dialog.open(InfoDialogComponent, this.dialogConfig);
  }

  showRejectDialog() {
    return this.dialog.open(RejectDialogComponent, {});
  }
}
