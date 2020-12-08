import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

interface DialogData {
  title: string;
  content: string;
  showCloseButton: boolean;
  error: string;
}

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {

  showCloseButton = true;

  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    if (this.data.showCloseButton === false) {
      this.showCloseButton = false;
    }
    this.dialogRef.disableClose = !this.showCloseButton;
  }

  close() {
    this.dialogRef.close();
  }
}
