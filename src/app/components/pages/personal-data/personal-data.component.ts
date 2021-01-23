import {Component, OnInit} from '@angular/core';
import {MatFormFieldAppearance} from '@angular/material/form-field';
import {HttpErrorResponse} from '@angular/common/http';
import {PersonalDataInterface} from '../../../extra/personal-data-interface/personal-data.interface';
import {InstituteInterface} from '../../../extra/institute-interface/institute.interface';
import {BehaviorSubject} from 'rxjs';
import {find} from 'rxjs/operators';
import {RequestDataService} from '../../../services/request-data.service';
import {DialogService} from '../../../services/dialog.service';
import {RestService} from '../../../services/rest-service';
import {SecurityService} from '../../../services/security/SecurityService';
import {LocalStorageService} from '../../../services/security/LocalStorageService';
import {NgxSpinnerService} from 'ngx-spinner';
import {Result} from '../../shared/yes-no-dialog/yes-no-dialog.component';
import {PersonalDataService} from '../../../services/personal-data.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {

  formFieldsStyle: MatFormFieldAppearance = 'fill';
  isEditing = false;
  personalData: PersonalDataInterface;
  allInstitutes: InstituteInterface[] = null;
  personalDataReadySubject = new BehaviorSubject(false);

  today = new Date();
  firstName: string;
  surname: string;
  birthDate: Date = new Date();
  phoneNumber: string;
  academicTitle: string;
  instituteSelect: InstituteInterface = {
    id: null,
    name: null,
    active: null
  };

  constructor(
    private restService: RestService,
    private securityService: SecurityService,
    private requestService: RequestDataService,
    private dialogService: DialogService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private personalDataService: PersonalDataService
  ) { }

  ngOnInit(): void {
    this.getPersonalData();
    this.getInstitutes();
  }

  getPersonalData() {
    this.personalDataService.getPersonalData().subscribe(personalData => {
      this.personalData = personalData;
      this.loadPersonalData();
      this.personalDataReadySubject.next(true);
      this.personalDataReadySubject.complete();
    });
  }

  getInstitutes() {
    this.requestService.getInstitutes().subscribe(institutes => {
      this.allInstitutes = institutes.map(institute => Object.assign({}, institute));
      this.loadInstituteData();
    });
  }

  loadPersonalData() {
    this.firstName = this.personalData.firstName;
    this.surname = this.personalData.surname;
    this.birthDate = this.personalData.birthDate == null ? null : new Date(this.personalData.birthDate);
    this.phoneNumber = this.personalData.phoneNumber;
    this.academicTitle = this.personalData.academicDegree;
  }

  loadInstituteData() {
    this.personalDataReadySubject.pipe(find(ready => ready)).subscribe(() => {
      const searchedInstitute = this.allInstitutes.find(institute => institute.id === this.personalData.instituteID);
      if (searchedInstitute != null) {
        this.instituteSelect = searchedInstitute;
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
    if ([newPersonalData.phoneNumber, newPersonalData.academicDegree, newPersonalData.instituteID, newPersonalData.birthDate]
      .some(field => field == null || field === '')) {
      this.dialogService.showSimpleDialog(
        'PERSONAL_DATA.NOT_VALID_TITLE',
        'PERSONAL_DATA.NOT_VALID_CONTENT'
      );
      return;
    }
    this.dialogService.showYesNoDialog('DIALOG.PERSONAL_DATA_CONFIRM_SAVE.TITLE', 'DIALOG.PERSONAL_DATA_CONFIRM_SAVE.CONTENT')
      .beforeClosed().subscribe((result: Result) => {
      if (result.confirmed) {
        this.spinner.show();
        this.personalDataService.personalData = newPersonalData;
        this.restService.updatePersonalData(newPersonalData).subscribe(
          () => {
            this.dialogService.showSimpleDialog(
              'DIALOG.PERSONAL_DATA_SAVED.TITLE',
              'DIALOG.PERSONAL_DATA_SAVED.CONTENT'
            ).beforeClosed().subscribe(() => this.isEditing = false);
          },
          (error: HttpErrorResponse) => {
            this.spinner.hide();
            this.dialogService.showErrorDialog(
              'DIALOG.PERSONAL_DATA_FAILED.TITLE',
              'DIALOG.PERSONAL_DATA_FAILED.CONTENT',
              error
            );
          },
          () => this.spinner.hide());
      }
    });
  }
}
