import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {MatFormFieldAppearance} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatDatepickerInput, MatDateRangeInput, MatEndDate, MatStartDate} from '@angular/material/datepicker';
import {MatSelect} from '@angular/material/select';
import {MatCheckbox} from '@angular/material/checkbox';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {InfoDialogComponent} from '../../../../shared/info-dialog/info-dialog.component';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {UseCaseEnum} from '../../../../../extra/use-case-enum/use-case-enum';
import {FormData} from '../../../../../extra/request-interface/request-interface';
import {AppRoutes} from '../../../../../extra/routes/appRoutes';
import {Location} from '@angular/common';

interface Enum {
  value: number;
  namePl: string;
  nameEng: string;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @Input() useCase: UseCaseEnum;
  @Input() formData: FormData;

  formFieldsStyle: MatFormFieldAppearance = 'fill';
  transportMeansNumber = 1;
  transportMeansArray = [1];
  // TODO getting userInfo from back-end or account settings component
  userInfo = {
    firstName: 'Jakub',
    surname: 'Pietrzak',
    academicTitle: 'jeszcze bez tytułu',
    institute: 'instytut pisania najlepszej inżynierki',
    phoneNumber: '+48 123 456 789',
    birthDate: new Date('1998-03-11'),
    documentSeriesNumbers: ['AAA 12345', 'AA 12345']
  };

  // basic-info
  @ViewChild('firstName', {read: MatInput}) firstName: MatInput;
  @ViewChild('surname', {read: MatInput}) surname: MatInput;
  @ViewChild('academicTitle', {read: MatInput}) academicTitle: MatInput;
  @ViewChild('institute', {read: MatInput}) institute: MatInput;
  @ViewChild('phoneNumber', {read: MatInput}) phoneNumber: MatInput;
  @ViewChild('destinationCountry', {read: MatInput}) destinationCountry: MatInput;
  @ViewChild('destinationCity', {read: MatInput}) destinationCity: MatInput;
  @ViewChild('abroadDate') abroadDate: MatDateRangeInput<Date>;
  @ViewChild('abroadDateStart', {read: MatStartDate}) abroadDateStart: MatStartDate<Date>;
  @ViewChild('abroadDateEnd', {read: MatEndDate}) abroadDateEnd: MatStartDate<Date>;
  @ViewChild('purpose', {read: MatInput}) purpose: MatInput;
  @ViewChild('conference', {read: MatInput}) conference: MatInput;
  @ViewChild('subject', {read: MatInput}) subject: MatInput;
  @ViewChild('conferenceDate') conferenceDate: MatDateRangeInput<Date>;
  @ViewChild('conferenceDateStart', {read: MatStartDate}) conferenceDateStart: MatStartDate<Date>;
  @ViewChild('conferenceDateEnd', {read: MatEndDate}) conferenceDateEnd: MatStartDate<Date>;

  // financial-source
  @ViewChild('allocationAccount', {read: MatInput}) allocationAccount: MatInput;
  @ViewChild('MPK', {read: MatInput}) MPK: MatInput;
  @ViewChild('financialSource', {read: MatInput}) financialSource: MatInput;
  @ViewChild('project', {read: MatInput}) project: MatInput;

  // transport
  @ViewChildren('vehicleSelect') vehicleSelect: QueryList<MatSelect>;
  @ViewChildren('routeFrom', {read: MatInput}) routeFrom: QueryList<MatInput>;
  @ViewChildren('routeTo', {read: MatInput}) routeTo: QueryList<MatInput>;
  @ViewChildren('departureDate', {read: MatDatepickerInput}) departureDate: QueryList<MatDatepickerInput<Date>>;
  @ViewChildren('departureHour', {read: MatInput}) departureHour: QueryList<MatInput>;
  @ViewChildren('departureMinute', {read: MatInput}) departureMinute: QueryList<MatInput>;
  @ViewChildren('carrier', {read: MatInput}) carrier: QueryList<MatInput>;

  // insurance
  @ViewChild('firstNameInsurance', {read: MatInput}) firstNameInsurance: MatInput;
  @ViewChild('surnameInsurance', {read: MatInput}) surnameInsurance: MatInput;
  @ViewChild('birthDate', {read: MatDatepickerInput}) birthDate: MatDatepickerInput<Date>;
  @ViewChild('departureCountry', {read: MatInput}) departureCountry: MatInput;
  @ViewChild('abroadDateInsurance') abroadDateInsurance: MatDateRangeInput<Date>;
  @ViewChild('abroadDateInsuranceStart', {read: MatStartDate}) abroadDateInsuranceStart: MatStartDate<Date>;
  @ViewChild('abroadDateInsuranceEnd', {read: MatEndDate}) abroadDateInsuranceEnd: MatStartDate<Date>;
  @ViewChild('selfInsuredCheckbox', {read: MatCheckbox}) selfInsuredCheckbox: MatCheckbox;

  // advance-payment-request
  @ViewChild('requestPaymentDestination', {read: MatInput}) requestPaymentDestination: MatInput;
  @ViewChild('requestPaymentDate') requestPaymentDate: MatDateRangeInput<Date>;
  @ViewChild('requestPaymentDateStart', {read: MatStartDate}) requestPaymentDateStart: MatStartDate<Date>;
  @ViewChild('requestPaymentDateEnd', {read: MatEndDate}) requestPaymentDateEnd: MatStartDate<Date>;
  @ViewChild('requestPaymentDays', {read: MatInput}) requestPaymentDays: MatInput;
  @ViewChild('requestPaymentDaysAmount', {read: MatInput}) requestPaymentDaysAmount: MatInput;
  @ViewChild('requestPaymentAccommodation', {read: MatInput}) requestPaymentAccommodation: MatInput;
  @ViewChild('requestPaymentAccommodationLimit', {read: MatInput}) requestPaymentAccommodationLimit: MatInput;
  @ViewChild('requestPaymentTravelDiet', {read: MatInput}) requestPaymentTravelDiet: MatInput;
  @ViewChild('requestPaymentLocalTransportCosts', {read: MatInput}) requestPaymentLocalTransportCosts: MatInput;
  @ViewChild('requestPaymentOtherExpensesDescription', {read: MatInput}) requestPaymentOtherExpensesDescription: MatInput;
  @ViewChild('requestPaymentOtherExpensesValue', {read: MatInput}) requestPaymentOtherExpensesValue: MatInput;
  @ViewChild('requestPaymentDaysAmountSum', {read: MatInput}) requestPaymentDaysAmountSum: MatInput;
  @ViewChild('requestPaymentAccommodationSum', {read: MatInput}) requestPaymentAccommodationSum: MatInput;
  @ViewChild('requestPaymentSummarizedCosts', {read: MatInput}) requestPaymentSummarizedCosts: MatInput;

  // advance-payments
  @ViewChild('conferenceFeeValue', {read: MatInput}) conferenceFeeValue: MatInput;
  @ViewChild('conferenceFeePaymentTypeSelect') conferenceFeePaymentTypeSelect: MatSelect;
  @ViewChild('depositValue', {read: MatInput}) depositValue: MatInput;
  @ViewChild('depositPaymentTypeSelect') depositPaymentTypeSelect: MatSelect;

  // identity-document
  @ViewChild('identityDocumentTypeSelect') identityDocumentTypeSelect: MatSelect;
  @ViewChild('identityDocumentSerialNumber', {read: MatInput}) identityDocumentSerialNumber: MatInput;

  // comments
  @ViewChild('comments', {read: MatInput}) comments: MatInput;

  integerRegex = '^(0|[1-9][0-9]*)$';
  hourRegex = '^([0-9]|[0-1][0-9]|2[0-3])$';
  minuteRegex = '^([0-9]|[0-5][0-9])$';
  decimalSeparator: string;
  currencyRegex: string;
  enumLang: string;

  validationFailed = false;

  vehicles: Enum[];
  identityDocuments: Enum[];
  paymentTypes: Enum[];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private translateService: TranslateService,
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private location: Location
  ) {
    this.onLangChange(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe(generator => this.onLangChange(generator.lang));
  }

  ngOnInit(): void {
    this.getSelectEnums();
  }

  ngAfterViewInit() {
    this.setAutocompletingFields();
    this.setTransportQuantity();
    this.loadFormData();
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewChecked() {
    this.removeDisableClassFromSelects();
  }

  onLangChange(lang) {
    if (lang === 'pl') {
      this.decimalSeparator = ',';
      this.enumLang = 'namePl';
    } else {
      this.decimalSeparator = '.';
      this.enumLang = 'nameEng';
    }
    this.currencyRegex = `^([1-9][0-9]*|0)([${this.decimalSeparator}][0-9]{0,2})?$`;
  }

  setAutocompletingFields() {
    if (this.useCase === UseCaseEnum.Create) {
      this.firstName.value = this.userInfo.firstName;
      this.surname.value = this.userInfo.surname;
      this.academicTitle.value = this.userInfo.academicTitle;
      this.institute.value = this.userInfo.institute;
      this.phoneNumber.value = this.userInfo.phoneNumber;
      this.firstNameInsurance.value = this.userInfo.firstName;
      this.surnameInsurance.value = this.userInfo.surname;
      this.birthDate.value = this.userInfo.birthDate;
    }
  }

  getSelectEnums() {
    const url = `${window.location.protocol}//${window.location.hostname}:8080/enum`;
    this.http.get<Enum[]>(`${url}/vehicle`)
      .subscribe(vehicles => {
        this.vehicles = vehicles;
        this.loadTransportData();
      });
    this.http.get<Enum[]>(`${url}/documentType`)
      .subscribe(identityDocuments => {
        this.identityDocuments = identityDocuments;
        this.loadIdentityDocument();
      });
    this.http.get<Enum[]>(`${url}/paymentType`)
      .subscribe(paymentTypes => {
        this.paymentTypes = paymentTypes;
        this.loadPaymentTypes();
      });
  }

  onIdChange(value: any) {
    this.identityDocumentSerialNumber.value = this.userInfo.documentSeriesNumbers[value];
  }

  submitForm() {
    const formValues: object = this.getParsedFormData();
    const isFormValid = this.validateForm(formValues);
    if (!isFormValid) {
      this.validationFailed = true;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        title: 'DIALOG.REQUEST_VALIDATION_FAILED.TITLE',
        content: 'DIALOG.REQUEST_VALIDATION_FAILED.CONTENT',
        showCloseButton: true
      };
      this.dialog.open(InfoDialogComponent, dialogConfig);
    } else {
      this.sendFormData(formValues);
    }
  }

  setTransportQuantity() {
    if (this.useCase !== UseCaseEnum.Create) {
      this.transportMeansNumber = this.formData.transport.length;
      this.transportMeansArray = Array.from(Array(this.transportMeansNumber).keys()).map(val => val + 1);
    }
  }

  loadFormData() {
    if (this.useCase !== UseCaseEnum.Create) {
      // basic-info
      this.firstName.value = this.formData.application.firstName;
      this.surname.value = this.formData.application.surname;
      this.academicTitle.value = this.formData.application.academicDegree;
      this.institute.value = this.formData.institute.name;
      this.phoneNumber.value = this.formData.application.phoneNumber;
      this.firstNameInsurance.value = this.formData.application.firstName;
      this.surnameInsurance.value = this.formData.application.surname;
      this.destinationCountry.value = this.formData.place.country;
      this.destinationCity.value = this.formData.place.city;
      this.abroadDateStart.writeValue(new Date(this.formData.application.abroadStartDate));
      this.abroadDateEnd.writeValue(new Date(this.formData.application.abroadEndDate));
      this.purpose.value = this.formData.application.purpose;
      this.conference.value = this.formData.application.conference;
      this.subject.value = this.formData.application.subject;
      this.conferenceDateStart.writeValue(new Date(this.formData.application.conferenceStartDate));
      this.conferenceDateEnd.writeValue(new Date(this.formData.application.conferenceEndDate));
      // financial-source
      if (this.useCase !== UseCaseEnum.EmployeeRead) {
        this.allocationAccount.value = this.formData.financialSource.allocationAccount;
        this.MPK.value = this.formData.financialSource.mpk;
        this.financialSource.value = this.formData.financialSource.financialSource;
        this.project.value = this.formData.financialSource.project;
      }
      // insurance
      this.firstNameInsurance.value = this.formData.application.firstName;
      this.surnameInsurance.value = this.formData.application.surname;
      this.birthDate.value = new Date(this.formData.application.birthDate);
      this.departureCountry.value = this.formData.place.country;
      this.abroadDateInsuranceStart.writeValue(new Date(this.formData.application.abroadStartDateInsurance));
      this.abroadDateInsuranceEnd.writeValue(new Date(this.formData.application.abroadEndDateInsurance));
      this.selfInsuredCheckbox.checked = this.formData.application.selfInsured;
      // advance-payment-request
      this.requestPaymentDestination.value = this.formData.place.country;
      this.requestPaymentDateStart.writeValue(new Date(this.formData.advanceApplication.startDate));
      this.requestPaymentDateEnd.writeValue(new Date(this.formData.advanceApplication.endDate));
      this.requestPaymentDays.value = String(this.formData.advanceApplication.residenceDietQuantity);
      this.requestPaymentDaysAmount.value = String(this.formData.advanceApplication.residenceDietAmount);
      this.requestPaymentAccommodation.value = String(this.formData.advanceApplication.accommodationQuantity);
      this.requestPaymentAccommodationLimit.value = String(this.formData.advanceApplication.accommodationLimit);
      this.requestPaymentTravelDiet.value = String(this.formData.advanceApplication.travelDietAmount);
      this.requestPaymentLocalTransportCosts.value = String(this.formData.advanceApplication.travelCosts);
      this.requestPaymentOtherExpensesDescription.value = String(this.formData.advanceApplication.otherCostsDescription || '');
      this.requestPaymentOtherExpensesValue.value = String(this.formData.advanceApplication.otherCostsAmount || '');
      this.requestPaymentDaysAmountSum.value = String(this.formData.advanceApplication.residenceDietSum);
      this.requestPaymentAccommodationSum.value = String(this.formData.advanceApplication.accommodationSum);
      this.requestPaymentSummarizedCosts.value = String(this.formData.advanceApplication.advanceSum);
      // comments
      this.comments.value = this.formData.application.comments;
    }
  }

  loadPaymentTypes() {
    if (this.useCase !== UseCaseEnum.Create) {
      this.conferenceFeeValue.value = String(this.formData.advancePayments.conferenceFeeValue);
      this.conferenceFeePaymentTypeSelect.value = this.formData.advancePayments.conferenceFeePaymentTypeSelect;
      this.depositValue.value = String(this.formData.advancePayments.accommodationFeeValue);
      this.depositPaymentTypeSelect.value = this.formData.advancePayments.accommodationFeePaymentTypeSelect;
    }
  }

  loadIdentityDocument() {
    this.identityDocumentTypeSelect.value = this.formData.application.identityDocumentType;
    this.identityDocumentSerialNumber.value = this.formData.application.identityDocumentNumber;
  }

  loadTransportData() {
    if (this.useCase !== UseCaseEnum.Create) {
      this.vehicleSelect.toArray().map((item, i) => item.value = this.formData.transport[i].vehicleSelect);
      this.routeFrom.toArray().map((item, i) => item.value = this.formData.transport[i].destinationFrom);
      this.routeTo.toArray().map((item, i) => item.value = this.formData.transport[i].destinationTo);
      this.departureDate.toArray().map((item, i) => item.value = new Date(this.formData.transport[i].departureDay));
      this.departureHour.toArray().map((item, i) => item.value = String(this.formData.transport[i].departureHour));
      this.departureMinute.toArray().map((item, i) => item.value = String(this.formData.transport[i].departureMinute));
      this.carrier.toArray().map((item, i) => item.value = this.formData.transport[i].carrier);
    }
  }



  sendToWilda() {
    // TODO director to wilda
  }

  sendToRector() {
    // TODO wilda to rector
  }

  sendBackToWilda() {
    // TODO rector to wilda
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

  formatInput(str: string): string {
    const trimmed = str.trim();
    if (trimmed === '') {
      return null;
    }
    return trimmed;
  }

  getNumberFromInput(str: string): number {
    let num: number;
    if (!str || str.length === 0) {
      return null;
    }
    if (str.includes(',') || str.includes('.')) {
      num = parseFloat(str.replace(',', '.'));
    } else {
      num = parseInt(str, 10);
    }
    if (isNaN(num)) {
      return null;
    }
    return num;
  }

  getNumberLimited(str: string, maxValue: number): string {
    const num = this.getNumberFromInput(str);
    return num == null ? '' : String(num > maxValue ? maxValue : num);
  }

  getParsedFormData(): object {
    const transportArrays = {
      vehicleSelect: this.vehicleSelect.toArray().map(item => this.formatSelect(item.value)),
      routeFrom: this.routeFrom.toArray().map(item => this.formatInput(item.value)),
      routeTo: this.routeTo.toArray().map(item => this.formatInput(item.value)),
      departureDay: this.departureDate.toArray().map(item => this.formatDate(item.value)),
      departureHour: this.departureHour.toArray().map(item => this.getNumberFromInput(item.value)),
      departureMinute: this.departureMinute.toArray().map(item => this.getNumberFromInput(item.value)),
      carrier: this.carrier.toArray().map(item => this.formatInput(item.value))
    };
    const transportParsedArray = [];
    for (const i of Object.keys(this.transportMeansArray)) {
      transportParsedArray.push({
        vehicleSelect: transportArrays.vehicleSelect[i],
        routeFrom: transportArrays.routeFrom[i],
        routeTo: transportArrays.routeTo[i],
        departureDay: transportArrays.departureDay[i],
        departureHour: transportArrays.departureHour[i],
        departureMinute: transportArrays.departureMinute[i],
        carrier: transportArrays.carrier[i],
      });
    }
    return {
      application: {
        firstName: this.formatInput(this.firstName.value),
        surname: this.formatInput(this.surname.value),
        academicDegree: this.formatInput(this.academicTitle.value),
        abroadStartDate: this.formatDate(this.abroadDate.value.start),
        abroadEndDate: this.formatDate(this.abroadDate.value.end),
        purpose: this.formatInput(this.purpose.value),
        conference: this.formatInput(this.conference.value),
        subject: this.formatInput(this.subject.value),
        conferenceStartDate: this.formatDate(this.conferenceDate.value.start),
        conferenceEndDate: this.formatDate(this.conferenceDate.value.end),
        birthDate: this.formatDate(this.birthDate.value),
        abroadStartDateInsurance: this.formatDate(this.abroadDateInsurance.value.start),
        abroadEndDateInsurance: this.formatDate(this.abroadDateInsurance.value.end),
        selfInsured: this.selfInsuredCheckbox.checked,
        comments: this.formatInput(this.comments.value)
      },
      institute: {
        name: this.formatInput(this.institute.value)
      },
      place: {
        country: this.formatInput(this.destinationCountry.value),
        city: this.formatInput(this.destinationCity.value),
      },
      advanceApplication: {
        startDate: this.formatDate(this.requestPaymentDate.value.start),
        endDate: this.formatDate(this.requestPaymentDate.value.end),
        residenceDietQuantity: this.getNumberFromInput(this.requestPaymentDays.value),
        residenceDietAmount: this.getNumberFromInput(this.requestPaymentDaysAmount.value),
        accommodationQuantity: this.getNumberFromInput(this.requestPaymentDays.value),
        accommodationLimit: this.getNumberFromInput(this.requestPaymentAccommodationLimit.value),
        travelDietAmount: this.getNumberFromInput(this.requestPaymentTravelDiet.value),
        travelCosts: this.getNumberFromInput(this.requestPaymentLocalTransportCosts.value),
        otherCostsDescription: this.formatInput(this.requestPaymentOtherExpensesDescription.value),
        otherCostsAmount: this.getNumberFromInput(this.requestPaymentOtherExpensesValue.value),
        residenceDietSum: this.getNumberFromInput(this.requestPaymentDaysAmountSum.value),
        accommodationSum: this.getNumberFromInput(this.requestPaymentAccommodationSum.value),
        advanceSum: this.getNumberFromInput(this.requestPaymentSummarizedCosts.value)
      },
      identityDocument: {
        type: this.formatSelect(this.identityDocumentTypeSelect.value),
        number: this.formatInput(this.identityDocumentSerialNumber.value)
      },
      advancePayments: {
        accommodationFeeTypeSelect: this.formatSelect(this.depositPaymentTypeSelect.value),
        accommodationFeeValue: this.getNumberFromInput(this.depositValue.value),
        conferenceFeePaymentTypeSelect: this.formatSelect(this.conferenceFeePaymentTypeSelect.value),
        conferenceFeeValue: this.getNumberFromInput(this.conferenceFeeValue.value)
      },
      transport: transportParsedArray
    };
  }

  validateForm(form: object): boolean { // TODO after getting to know which fields are required
    // for (const property in form.application) {
    //   if (form.application.hasOwnProperty(property) && form.application[property] === null) {
    //     if (!(property === 'comments' || (!this.selfInsuredCheckbox.checked && (property === 'abroadStartDateInsurance' || property === 'abroadEndDateInsurance')))) {
    //       return false;
    //     }
    //   }
    // }
    // const formGroups = ['employee', 'institute', 'place', 'advanceApplication', 'advancePayments', 'identityDocument'];
    // for (const formGroup of formGroups) {
    //   for (const property in form[formGroup]) {
    //     if (form[formGroup].hasOwnProperty(property) && form[formGroup][property] === null) {
    //       return false;
    //     }
    //   }
    // }
    // for (const transportMean of form.transport) {
    //   for (const property in transportMean) {
    //     if (transportMean.hasOwnProperty(property) && property !== 'carrier' && transportMean[property] === null) {
    //       return false;
    //     }
    //   }
    // }
    return true;
  }

  sendFormData(form) {
    const url = `${window.location.protocol}//${window.location.hostname}:8080/application/create`;
    this.http.post(url, form).subscribe(
      () => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          title: 'DIALOG.REQUEST_SENT.TITLE',
          content: 'DIALOG.REQUEST_SENT.CONTENT',
          showCloseButton: false
        };
        this.dialog.open(InfoDialogComponent, dialogConfig);
        setTimeout(() => {
          this.router.navigateByUrl(AppRoutes.home).then(() => this.dialog.closeAll());
        }, 2000);
      },
      (error: HttpErrorResponse) => {
        this.translateService.get('DIALOG.REQUEST_NOT_SENT.CONTENT').subscribe(content => {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            title: 'DIALOG.REQUEST_NOT_SENT.TITLE',
            content: `${content} ${error.status} ${error.statusText}`,
            showCloseButton: true
          };
          this.dialog.open(InfoDialogComponent, dialogConfig);
        });
      },
    );
  }

  setAmountSum(daysString, amountString, resultInput) {
    const days: number = parseInt(daysString, 10);
    const amount: number = parseFloat(amountString.replace(',', '.'));
    if (!isNaN(days) && !isNaN(amount)) {
      resultInput.value = (days * amount).toFixed(2).replace('.', this.decimalSeparator);
    } else {
      resultInput.value = '';
    }
    this.setRequestPaymentSummarizedCosts();
  }

  setRequestPaymentSummarizedCosts() {
    const days: number = parseFloat(this.requestPaymentDaysAmountSum.value.replace(',', '.'));
    const accommodation: number = parseFloat(this.requestPaymentAccommodationSum.value.replace(',', '.'));
    const travelDiet: number = parseFloat(this.requestPaymentTravelDiet.value.replace(',', '.'));
    const transportCosts: number = parseFloat(this.requestPaymentLocalTransportCosts.value.replace(',', '.'));
    const otherCosts: number = parseFloat(this.requestPaymentOtherExpensesValue.value.replace(',', '.'));
    let sum = 0;
    for (const value of [days, accommodation, travelDiet, transportCosts, otherCosts]) {
      if (!isNaN(value)) {
        sum += value;
      }
    }
    this.requestPaymentSummarizedCosts.value = sum ? sum.toFixed(2).replace('.', this.decimalSeparator) : '';
  }

  incrementTransportMeansNumber() {
    this.transportMeansNumber++;
    this.transportMeansArray.push(this.transportMeansNumber);
  }

  decrementTransportMeansNumber() {
    this.transportMeansNumber--;
    this.transportMeansArray.pop();
  }

  validatePaste(element: HTMLInputElement, maxValue: number) {
    element.value = this.getNumberLimited(element.value, maxValue);
  }

  synchronizeCountryName() {
    this.requestPaymentDestination.value = this.destinationCountry.value;
    this.departureCountry.value = this.destinationCountry.value;
  }

  isObjectEmpty(object): boolean {
    return object == null ? true : !Object.values(object).some(x => (x !== null && x !== ''));
  }

  cancelForm() {
    this.location.back();
  }

  removeDisableClassFromSelects() {
    if (this.useCase !== UseCaseEnum.Create) {
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
}
