import {AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MatFormFieldAppearance} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatDatepickerInput, MatDateRangeInput} from '@angular/material/datepicker';
import {MatSelect} from '@angular/material/select';
import {MatCheckbox} from '@angular/material/checkbox';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {InfoDialogComponent} from '../../../../extra/info-dialog/info-dialog.component';
import {HttpClient} from '@angular/common/http';

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
export class RequestComponent implements OnInit, AfterViewInit {

  formFieldsStyle: MatFormFieldAppearance = 'fill';
  transportMeansNumber = 1;
  transportMeansArray = [1];
  hours = Array.from(Array(24).keys());
  minutes = Array.from(Array(60).keys());
  // TODO getting userInfo from back-end or account settings component
  userInfo = {
    firstNameAndSurname: 'Jakub Pietrzak',
    academicTitle: 'jeszcze bez tytułu',
    institute: 'instytut pisania najlepszej inżynierki',
    phoneNumber: '+48 123 456 789',
    birthDate: new Date('1998-03-11'),
    documentSeriesNumbers: ['AAA 12345', 'AA 12345']
  };

  // basic-info
  @ViewChild('firstNameAndSurname', {read: MatInput}) firstNameAndSurname: MatInput;
  @ViewChild('academicTitle', {read: MatInput}) academicTitle: MatInput;
  @ViewChild('institute', {read: MatInput}) institute: MatInput;
  @ViewChild('phoneNumber', {read: MatInput}) phoneNumber: MatInput;
  @ViewChild('destination', {read: MatInput}) destination: MatInput;
  @ViewChild('abroadDate') abroadDate: MatDateRangeInput<Date>;
  @ViewChild('purpose', {read: MatInput}) purpose: MatInput;
  @ViewChild('conference', {read: MatInput}) conference: MatInput;
  @ViewChild('subject', {read: MatInput}) subject: MatInput;
  @ViewChild('conferenceDate') conferenceDate: MatDateRangeInput<Date>;

  // financial-source
  @ViewChild('allocationAccount', {read: MatInput}) allocationAccount: MatInput;
  @ViewChild('MPK', {read: MatInput}) MPK: MatInput;
  @ViewChild('financialSource', {read: MatInput}) financialSource: MatInput;
  @ViewChild('project', {read: MatInput}) project: MatInput;

  // transport
  @ViewChildren('vehicleSelect') vehicleSelect: QueryList<MatSelect>;
  @ViewChildren('routeFrom', {read: MatInput}) routeFrom: QueryList<MatInput>;
  @ViewChildren('routeTo', {read: MatInput}) routeTo: QueryList<MatInput>;
  @ViewChildren('departureMinuteSelect') departureMinuteSelect: QueryList<MatSelect>;
  @ViewChildren('departureHourSelect') departureHourSelect: QueryList<MatSelect>;
  @ViewChildren('departureDate', {read: MatDatepickerInput}) departureDate: QueryList<MatDatepickerInput<Date>>;
  @ViewChildren('carrier', {read: MatInput}) carrier: QueryList<MatInput>;

  // insurance
  @ViewChild('firstNameAndSurnameInsurance', {read: MatInput}) firstNameAndSurnameInsurance: MatInput;
  @ViewChild('birthDate', {read: MatDatepickerInput}) birthDate: MatDatepickerInput<Date>;
  @ViewChild('departureCountry', {read: MatInput}) departureCountry: MatInput;
  @ViewChild('abroadDateInsurance') abroadDateInsurance: MatDateRangeInput<Date>;
  @ViewChild('selfInsuredCheckbox', {read: MatCheckbox}) selfInsuredCheckbox: MatCheckbox;

  // advance-payment-request
  @ViewChild('requestPaymentDestination', {read: MatInput}) requestPaymentDestination: MatInput;
  @ViewChild('requestPaymentDate') requestPaymentDate: MatDateRangeInput<Date>;
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

  integerRegex = '^([0]|[1-9][0-9]*)$';
  decimalSeparator: string;
  currencyRegex: string;
  enumLang: string;

  vehicles: Enum[];
  identityDocuments: Enum[];
  paymentTypes: Enum[];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private translateService: TranslateService,
    private dialog: MatDialog,
    private http: HttpClient
  ) {
    this.onLangChange(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe(generator => this.onLangChange(generator.lang));
  }

  ngOnInit(): void {
    this.getSelectEnums();
  }
  ngAfterViewInit() {
    this.setAutocompletingFields();
    this.changeDetectorRef.detectChanges();
  }

  onLangChange(lang) {
    if (lang === 'pl') {
      this.decimalSeparator = ',';
      this.enumLang = 'namePl';
    } else {
      this.decimalSeparator = '.';
      this.enumLang = 'nameEng';
    }
    this.currencyRegex = `^([1-9][0-9]*|[0])([${this.decimalSeparator}][0-9]{0,2})?$`;
  }

  setAutocompletingFields() {
    this.firstNameAndSurname.value = this.userInfo.firstNameAndSurname;
    this.academicTitle.value = this.userInfo.academicTitle;
    this.institute.value = this.userInfo.institute;
    this.phoneNumber.value = this.userInfo.phoneNumber;
    this.firstNameAndSurnameInsurance.value = this.userInfo.firstNameAndSurname;
    this.birthDate.value = this.userInfo.birthDate;
  }

  getSelectEnums() {
    const url = `${window.location.protocol}//${window.location.hostname}:8080/enum`;
    this.http.get<Enum[]>(`${url}/vehicle`)
      .subscribe(vehicles => this.vehicles = vehicles);
    this.http.get<Enum[]>(`${url}/documentType`)
      .subscribe(identityDocuments => this.identityDocuments = identityDocuments);
    this.http.get<Enum[]>(`${url}/paymentType`)
      .subscribe(paymentTypes => this.paymentTypes = paymentTypes);
  }

  onIdChange(value: any) {
    this.identityDocumentSerialNumber.value = this.userInfo.documentSeriesNumbers[value];
  }

  submitForm() {
    const formValues: object = this.getParsedFormData();
    const isFormValid = this.validateForm(formValues);
    if (!isFormValid) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        title: 'DIALOG.REQUEST_VALIDATION_FAILED.TITLE',
        content: 'DIALOG.REQUEST_VALIDATION_FAILED.CONTENT'
      };
      this.dialog.open(InfoDialogComponent, dialogConfig);
    }
    else {
      this.sendFormData(formValues);
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

  formatInput(str: string): string {
    if (str === '') {
      return null;
    }
    return str;
  }

  getNumberFromInput(str: string): number {
    let num: number;
    if (str === '') {
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

  getParsedFormData(): object {
    const transportArrays = {
      vehicleSelect: this.vehicleSelect.toArray().map(item => this.formatSelect(item.value)),
      routeFrom: this.routeFrom.toArray().map(item => this.formatInput(item.value)),
      routeTo: this.routeTo.toArray().map(item => this.formatInput(item.value)),
      departureMinute: this.departureMinuteSelect.toArray().map(item => this.formatSelect(item.value)),
      departureHour: this.departureHourSelect.toArray().map(item => this.formatSelect(item.value)),
      departureDay: this.departureDate.toArray().map(item => this.formatDate(item.value)),
      carrier: this.carrier.toArray().map(item => this.formatInput(item.value))
    };
    const transportParsedArray = [];
    for (const i of Object.keys(this.transportMeansArray)) {
      transportParsedArray.push({
        vehicleSelect: transportArrays.vehicleSelect[i],
        routeFrom: transportArrays.routeFrom[i],
        routeTo: transportArrays.routeTo[i],
        departureMinute: transportArrays.departureMinute[i],
        departureHour: transportArrays.departureHour[i],
        departureDay: transportArrays.departureDay[i],
        carrier: transportArrays.carrier[i],
      });
    }
    return {
      basicInfo: {
        firstNameAndSurname: this.formatInput(this.firstNameAndSurname.value),
        academicTitle: this.formatInput(this.academicTitle.value),
        institute: this.formatInput(this.institute.value),
        phoneNumber: this.formatInput(this.phoneNumber.value),
        destination: this.formatInput(this.destination.value),
        abroadStartDate: this.formatDate(this.abroadDate.value.start),
        abroadEndDate: this.formatDate(this.abroadDate.value.end),
        purpose: this.formatInput(this.purpose.value),
        conference: this.formatInput(this.conference.value),
        subject: this.formatInput(this.subject.value),
        conferenceStartDate: this.formatDate(this.conferenceDate.value.start),
        conferenceEndDate: this.formatDate(this.conferenceDate.value.end)
      },
      financialSource: {
        allocationAccount: this.formatInput(this.allocationAccount.value),
        MPK: this.formatInput(this.MPK.value),
        financialSource: this.formatInput(this.financialSource.value),
        project: this.formatInput(this.project.value)
      },
      transport: transportParsedArray,
      insurance: {
        firstNameAndSurnameInsurance: this.formatInput(this.firstNameAndSurnameInsurance.value),
        birthDate: this.formatDate(this.birthDate.value),
        departureCountry: this.formatInput(this.departureCountry.value),
        abroadStartDateInsurance: this.formatDate(this.abroadDateInsurance.value.start),
        abroadEndDateInsurance: this.formatDate(this.abroadDateInsurance.value.end),
        selfInsuredCheckbox: this.selfInsuredCheckbox.checked
      },
      advancePaymentRequest: {
        requestPaymentDestination: this.formatInput(this.requestPaymentDestination.value),
        requestPaymentStartDate: this.formatDate(this.requestPaymentDate.value.start),
        requestPaymentEndDate: this.formatDate(this.requestPaymentDate.value.end),
        requestPaymentDays: this.getNumberFromInput(this.requestPaymentDays.value),
        requestPaymentDaysAmount: this.getNumberFromInput(this.requestPaymentDaysAmount.value),
        requestPaymentAccommodation: this.getNumberFromInput(this.requestPaymentAccommodation.value),
        requestPaymentAccommodationLimit: this.getNumberFromInput(this.requestPaymentAccommodationLimit.value),
        requestPaymentTravelDiet: this.getNumberFromInput(this.requestPaymentTravelDiet.value),
        requestPaymentLocalTransportCosts: this.getNumberFromInput(this.requestPaymentLocalTransportCosts.value),
        requestPaymentOtherExpensesDescription: this.formatInput(this.requestPaymentOtherExpensesDescription.value),
        requestPaymentOtherExpensesValue: this.getNumberFromInput(this.requestPaymentOtherExpensesValue.value),
        requestPaymentDaysAmountSum: this.getNumberFromInput(this.requestPaymentDaysAmountSum.value),
        requestPaymentAccommodationSum: this.getNumberFromInput(this.requestPaymentAccommodationSum.value),
        requestPaymentSummarizedCosts: this.getNumberFromInput(this.requestPaymentSummarizedCosts.value)
      },
      advancePayments: {
        conferenceFeeValue: this.getNumberFromInput(this.conferenceFeeValue.value),
        conferenceFeePaymentTypeSelect: this.formatSelect(this.conferenceFeePaymentTypeSelect.value),
        depositValue: this.getNumberFromInput(this.depositValue.value),
        depositPaymentTypeSelect: this.formatSelect(this.depositPaymentTypeSelect.value),
      },
      identityDocument: {
        identityDocumentTypeSelect: this.formatSelect(this.identityDocumentTypeSelect.value),
        identityDocumentSerialNumber: this.formatInput(this.identityDocumentSerialNumber.value)
      },
      comments: this.formatInput(this.comments.value)
    };
  }

  validateForm(form): boolean {
    const formGroups = ['basicInfo', 'advancePaymentRequest', 'advancePayments', 'identityDocument'];
    if (!this.selfInsuredCheckbox.checked) {
      formGroups.push('insurance');
    }
    for (const formGroup of formGroups) {
      for (const property in form[formGroup]) {
        if (form[formGroup].hasOwnProperty(property) && form[formGroup][property] === null) {
          return false;
        }
      }
    }
    for (const transportMean of form.transport) {
      for (const property in transportMean) {
        if (transportMean.hasOwnProperty(property) && property !== 'carrier' && transportMean[property] === null) {
          return false;
        }
      }
    }
    return true;
  }

  sendFormData(form) {
  //  TODO sending form data to backend
    console.log(JSON.stringify(form));
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
}
