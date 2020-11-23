import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

interface DialogData {
  title: string;
  content: string;
  showCloseButton: boolean;
}

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    dialogRef.disableClose = !data.showCloseButton;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
