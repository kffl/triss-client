import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

interface DialogData {
  title: string;
  content: string;
}

export interface Result {
  confirmed: boolean;
}

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.scss']
})
export class YesNoDialogComponent implements OnInit {

  result: Result;

  constructor(
    public dialogRef: MatDialogRef<YesNoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
  }

  closeWithNoAnswer() {
    this.result = {confirmed: false};
    this.dialogRef.close(this.result);
  }

  closeWithYesAnswer() {
    this.result = {confirmed: true};
    this.dialogRef.close(this.result);
  }

}
