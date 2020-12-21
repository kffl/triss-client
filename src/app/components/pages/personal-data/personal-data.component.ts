import {Component, OnInit, AfterViewInit, AfterViewChecked, ViewChild} from '@angular/core';
import {MatFormFieldAppearance} from '@angular/material/form-field';
import {HttpErrorResponse} from '@angular/common/http';
import {PersonalDataInterface} from '../../../extra/personal-data-interface/personal-data.interface';
import {MatInput} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {MatDatepickerInput} from '@angular/material/datepicker';
import {InstituteInterface} from '../../../extra/institute-interface/institute.interface';
import {BehaviorSubject} from 'rxjs';
import {take} from 'rxjs/operators';
import {RequestDataService} from '../../../services/request-data.service';
import {DialogService} from '../../../services/dialog.service';
import {RestService} from '../../../services/rest-service';
import {SecurityService} from '../../shared/security/SecurityService';
import {LocalStorageService} from "../../shared/security/LocalStorageService";

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

  firstName: string;
  surname: string;
  birthDate: Date = new Date();
  phoneNumber: string;
  academicTitle: string;
  instituteSelect: InstituteInterface = {
    id: 1,
    name: 'garbage',
    active: false};

  constructor(
    private restService: RestService,
    private securityService: SecurityService,
    private requestService: RequestDataService,
    private dialogService: DialogService,
    private localStorageService: LocalStorageService
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
    this.localStorageService.personalDataSubject.subscribe(personalData => {
      this.personalData = personalData;
      this.loadPersonalData();
      this.personalDataReadySubject.next(true);
    });
  }

  getInstitutes() {
    this.restService.getInstitutes().subscribe(institutes => {
      this.allInstitutes = institutes;
      this.loadInstituteData();
    });
  }

  loadPersonalData() {
    this.firstName = this.personalData.firstName;
    this.surname = this.personalData.surname;
    this.birthDate = new Date(this.personalData.birthDate);
    this.phoneNumber = this.personalData.phoneNumber;
    this.academicTitle = this.personalData.academicDegree;
  }

  loadInstituteData() {
    this.personalDataReadySubject.pipe(take(2)).subscribe(ready => {
      if (ready) {
        const searchedInstitute = this.allInstitutes.find(institute => institute.id === this.personalData.instituteID);
        if (searchedInstitute != null) {
          this.instituteSelect = searchedInstitute;
        }
      }
    });
  }

  onEditButton() {
    this.isEditing = true;
  }

  onCancelButton() {
    this.isEditing = false;
    this.loadPersonalData();
    this.instituteSelect.id = this.personalData.instituteID;
  }

  onSaveButton() {
    this.isEditing = false;
    const newPersonalData: PersonalDataInterface = {
      firstName: this.personalData.firstName,
      surname: this.personalData.surname,
      birthDate: this.requestService.formatDate(this.birthDate),
      phoneNumber: this.phoneNumber,
      academicDegree: this.academicTitle,
      instituteID: this.requestService.formatSelect(this.instituteSelect.id),
      employeeType: this.personalData.employeeType,
      employeeId: this.personalData.employeeId,
      id: this.personalData.id
    };
    this.restService.updatePersonalData(newPersonalData).subscribe(
      () => {
        this.dialogService.showSimpleDialog(
          'DIALOG.PERSONAL_DATA_SAVED.TITLE',
          'DIALOG.PERSONAL_DATA_SAVED.CONTENT'
        );
      },
      (error: HttpErrorResponse) => {
        this.dialogService.showErrorDialog(
          'DIALOG.PERSONAL_DATA_FAILED.TITLE',
          'DIALOG.PERSONAL_DATA_FAILED.CONTENT',
          error
        );
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
}
