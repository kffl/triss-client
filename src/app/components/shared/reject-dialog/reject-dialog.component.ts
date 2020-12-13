import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UseCaseEnum} from '../../../extra/use-case-enum/use-case-enum';

export interface RejectInfo {
  rejected: boolean;
  reason: string;
}

interface DialogData {
  useCase: UseCaseEnum;
}

@Component({
  selector: 'app-reject-dialog',
  templateUrl: './reject-dialog.component.html',
  styleUrls: ['./reject-dialog.component.scss']
})
export class RejectDialogComponent implements OnInit {

  reason: string;
  rejectInfo: RejectInfo;

  constructor(
    public dialogRef: MatDialogRef<RejectDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.dialogRef.updateSize('min(100%, 500px)');
  }

  close() {
    this.rejectInfo = {
      rejected: false,
      reason: null,
    };
    this.dialogRef.close(this.rejectInfo);
  }

  reject() {
    this.rejectInfo = {
      rejected: true,
      reason: this.reason
    };
    this.dialogRef.close(this.rejectInfo);
  }
}
