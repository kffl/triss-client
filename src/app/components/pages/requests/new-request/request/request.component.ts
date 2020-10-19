import {Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import {MatFormFieldAppearance} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit, AfterViewInit {

  formFieldsStyle: MatFormFieldAppearance = 'standard';

  @ViewChild('firstNameAndSurname', {read: MatInput}) firstNameAndSurname: MatInput;
  @ViewChild('academicTitle', {read: MatInput}) academicTitle: MatInput;
  @ViewChild('institute', {read: MatInput}) institute: MatInput;
  @ViewChild('phoneNumber', {read: MatInput}) phoneNumber: MatInput;

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.disableAndSetAutocompletingFields();
    this.changeDetectorRef.detectChanges();

  }

  disableAndSetAutocompletingFields() {
    this.firstNameAndSurname.readonly = true;
    this.academicTitle.readonly = true;
    this.institute.readonly = true;
    this.phoneNumber.readonly = true;
    this.firstNameAndSurname.value = 'Jakub Pietrzak';
    this.academicTitle.value = 'może niedługo inżynier';
    this.institute.value = 'instytut pisania najlepszej inżynierki';
    this.phoneNumber.value = '+48 123 456 789';
  }

}
