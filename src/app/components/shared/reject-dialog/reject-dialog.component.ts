import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UseCaseEnum} from '../../../extra/use-case-enum/use-case-enum';

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

  constructor(
    public dialogRef: MatDialogRef<RejectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.dialogRef.updateSize('min(100%, 500px)');
  }

  close() {
    this.dialogRef.close();
  }

  reject() {
    console.log(this.reason);
  }


}
