import {Component, OnInit, AfterViewInit, AfterViewChecked, ViewChild} from '@angular/core';
import {MatFormFieldAppearance} from '@angular/material/form-field';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {PersonalDataInterface} from '../../../extra/personal-data-interface/personal-data.interface';
import {MatInput} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {MatDatepickerInput} from '@angular/material/datepicker';
import {InstituteInterface} from '../../../extra/institute-interface/institute.interface';
import {BehaviorSubject} from 'rxjs';
import {take} from 'rxjs/operators';
import {InfoDialogComponent} from '../../shared/info-dialog/info-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit, AfterViewInit, AfterViewChecked {

  formFieldsStyle: MatFormFieldAppearance = 'fill';
  isEditing = false;
  personalData: PersonalDataInterface;
  allInstitutes: InstituteInterface[];
  personalDataReadySubject = new BehaviorSubject(false);

  @ViewChild('firstName', {read: MatInput}) firstName: MatInput;
  @ViewChild('surname', {read: MatInput}) surname: MatInput;
  @ViewChild('birthDate', {read: MatDatepickerInput}) birthDate: MatDatepickerInput<Date>;
  @ViewChild('phoneNumber', {read: MatInput}) phoneNumber: MatInput;
  @ViewChild('academicTitle', {read: MatInput}) academicTitle: MatInput;
  @ViewChild('instituteSelect') instituteSelect: MatSelect;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getPersonalData();
    this.getInstitutes();
  }

  ngAfterViewInit() {
  }

  ngAfterViewChecked() {
    this.removeDisableClassFromSelects();
  }

  getPersonalData() {
    const url = `${window.location.protocol}//${window.location.hostname}:8080/employee/get`;
    this.http.post<PersonalDataInterface>(url, {}).subscribe(personalData => {
      this.personalData = personalData;
      this.loadPersonalData();
      this.personalDataReadySubject.next(true);
    });
  }

  getInstitutes() {
    const url = `${window.location.protocol}//${window.location.hostname}:8080/institute/all`;
    this.http.get<InstituteInterface[]>(url).subscribe(institutes => {
      this.allInstitutes = institutes;
      this.loadInstituteData();
    });
  }

  loadPersonalData() {
    this.firstName.value = this.personalData.firstName;
    this.surname.value = this.personalData.surname;
    this.birthDate.value = new Date(this.personalData.birthDate);
    this.phoneNumber.value = this.personalData.phoneNumber;
    this.academicTitle.value = this.personalData.academicDegree;
  }

  loadInstituteData() {
    this.personalDataReadySubject.pipe(take(2)).subscribe(ready => {
      if (ready) {
        this.instituteSelect.value = this.allInstitutes.find(institute => institute.id === this.personalData.instituteID).id;
      }});
  }

  onEditButton() {
    this.isEditing = true;
  }

  onCancelButton() {
    this.isEditing = false;
    this.loadPersonalData();
    this.instituteSelect.value = this.personalData.instituteID;
  }

  onSaveButton() {
    this.isEditing = false;
    const newPersonalData: PersonalDataInterface = {
      firstName: this.personalData.firstName,
      surname: this.personalData.surname,
      birthDate: this.formatDate(this.birthDate.value),
      phoneNumber: this.phoneNumber.value,
      academicDegree: this.academicTitle.value,
      instituteID: this.formatSelect(this.instituteSelect.value),
      employeeType: this.personalData.employeeType,
      id: this.personalData.id
    };
    const dialogConfig = new MatDialogConfig();
    const url = `${window.location.protocol}//${window.location.hostname}:8080/employee/update`;
    this.http.post<PersonalDataInterface>(url, newPersonalData).subscribe(
      () => {
        dialogConfig.data = {
          title: 'Zapisano pomyślnie',
          content: 'Dane zostały pomyślnie zapisane',
          showCloseButton: true
        };
      },
      (error: HttpErrorResponse) => {
        dialogConfig.data = {
          title: 'Błąd',
          content: 'Nie udało się zapisać danych',
          showCloseButton: true
        };
      },
      () => {
        this.dialog.open(InfoDialogComponent, dialogConfig);
      });
  }

  removeDisableClassFromSelects() {
    const selectFormFields = document.getElementsByClassName('mat-form-field-type-mat-select');
    for (const i of Array(selectFormFields.length).keys()) {
      selectFormFields.item(i).classList.remove('mat-form-field-disabled');
    }
    const selects = document.getElementsByTagName('mat-select');
    for (const i of Array(selects.length).keys()) {
      selects.item(i).classList.remove('mat-select-disabled');
    }
  }

  formatDate(date: Date): string {
    return date ?
      `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}` : null;
  }

  formatSelect(value: number): number {
    if (value == null) {
      return null;
    }
    return value;
  }
}
