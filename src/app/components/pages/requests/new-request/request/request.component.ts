import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatFormFieldAppearance} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatDatepickerInput, MatDateRangeInput} from '@angular/material/datepicker';
import {MatSelect} from '@angular/material/select';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit, AfterViewInit {

  formFieldsStyle: MatFormFieldAppearance = 'standard';
  hours = Array.from(Array(24).keys());
  minutes = Array.from(Array(60).keys());
  // TODO getting userInfo from back-end or account settings component
  userInfo = {
    firstNameAndSurname: 'Jakub Pietrzak',
    academicTitle: 'jeszcze bez tytułu',
    institute: 'instytut pisania najlepszej magisterki',
    phoneNumber: '+48 123 456 789',
    birthDate: new Date('1998-03-11'),
    documentSeriesNumbers: ['AAA 12345', 'AA 12345']
  };
  // TODO getting these 3 arrays form back-end
  vehicles = [
    {value: 0, name: 'Samochód'},
    {value: 1, name: 'Autobus'},
    {value: 2, name: 'Pociąg'},
    {value: 3, name: 'Samolot'}
  ];
  identityDocuments = [
    {value: 0, name: 'Dowód osobisty'},
    {value: 1, name: 'Paszport'}
  ];
  paymentTypes = [
    {value: 0, name: 'Gotówka'},
    {value: 1, name: 'Przelew'}
  ];

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
  @ViewChild('vehicleSelect') vehicleSelect: MatSelect;
  @ViewChild('route', {read: MatInput}) route: MatInput;
  @ViewChild('departureMinuteSelect') departureMinuteSelect: MatSelect;
  @ViewChild('departureHourSelect') departureHourSelect: MatSelect;
  @ViewChild('departureDate', {read: MatDatepickerInput}) departureDate: MatDatepickerInput<Date>;
  @ViewChild('carrier', {read: MatInput}) carrier: MatInput;

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
    this.firstNameAndSurname.value = this.userInfo.firstNameAndSurname;
    this.academicTitle.value = this.userInfo.academicTitle;
    this.institute.value = this.userInfo.institute;
    this.phoneNumber.value = this.userInfo.phoneNumber;
    this.allocationAccount.disabled = true;
    this.MPK.disabled = true;
    this.financialSource.disabled = true;
    this.project.disabled = true;
    this.firstNameAndSurnameInsurance.readonly = true;
    this.birthDate.disabled = true;
    this.firstNameAndSurnameInsurance.value = this.userInfo.firstNameAndSurname;
    this.birthDate.value = this.userInfo.birthDate;
    this.identityDocumentSerialNumber.readonly = true;
  }

  onIdChange(value: any) {
    this.identityDocumentSerialNumber.value = this.userInfo.documentSeriesNumbers[value];
  }

  submitForm(event: Event) {
    event.preventDefault();
    const formFields: object = {
      basicInfo: {
        firstNameAndSurname: this.firstNameAndSurname.value,
        academicTitle: this.academicTitle.value,
        institute: this.institute.value,
        phoneNumber: this.phoneNumber.value,
        destination: this.destination.value,
        abroadStartDate: this.formatDate(this.abroadDate.value.start),
        abroadEndDate: this.formatDate(this.abroadDate.value.end),
        purpose: this.purpose.value,
        conference: this.conference.value,
        subject: this.subject.value,
        conferenceStartDate: this.formatDate(this.conferenceDate.value.start),
        conferenceEndDate: this.formatDate(this.conferenceDate.value.end)
      },
      financialSource: {
        allocationAccount: this.allocationAccount.value,
        MPK: this.MPK.value,
        financialSource: this.financialSource.value,
        project: this.project.value
      },
      transport: {
        vehicleSelect: this.formatSelect(this.vehicleSelect.value),
        route: this.route.value,
        departureMinute: this.formatSelect(this.departureMinuteSelect.value),
        departureHour: this.formatSelect(this.departureMinuteSelect.value),
        departureDay: this.formatDate(this.departureDate.value),
        carrier: this.carrier.value
      },
      insurance: {
        firstNameAndSurnameInsurance: this.firstNameAndSurnameInsurance.value,
        birthDate: this.formatDate(this.birthDate.value),
        departureCountry: this.departureCountry.value,
        abroadStartDateInsurance: this.formatDate(this.abroadDateInsurance.value.start),
        abroadEndDateInsurance: this.formatDate(this.abroadDateInsurance.value.end),
        selfInsuredCheckbox: this.selfInsuredCheckbox.checked
      },
      advancePaymentRequest: {
        requestPaymentDestination: this.requestPaymentDestination.value,
        requestPaymentStartDate: this.formatDate(this.requestPaymentDate.value.start),
        requestPaymentEndDate: this.formatDate(this.requestPaymentDate.value.end),
        requestPaymentDays: this.requestPaymentDays.value,
        requestPaymentDaysAmount: this.requestPaymentDaysAmount.value,
        requestPaymentAccommodation: this.requestPaymentAccommodation.value,
        requestPaymentAccommodationLimit: this.requestPaymentAccommodationLimit.value,
        requestPaymentTravelDiet: this.requestPaymentTravelDiet.value,
        requestPaymentLocalTransportCosts: this.requestPaymentLocalTransportCosts.value,
        requestPaymentOtherExpensesDescription: this.requestPaymentOtherExpensesDescription.value,
        requestPaymentOtherExpensesValue: this.requestPaymentOtherExpensesValue.value,
        requestPaymentSummarizedCosts: this.requestPaymentSummarizedCosts.value
      },
      advancePayments: {
        conferenceFeeValue: this.conferenceFeeValue.value,
        conferenceFeePaymentTypeSelect: this.formatSelect(this.conferenceFeePaymentTypeSelect.value),
        depositValue: this.depositValue.value,
        depositPaymentTypeSelect: this.formatSelect(this.depositPaymentTypeSelect.value),
      },
      identityDocument: {
        identityDocumentTypeSelect: this.formatSelect(this.identityDocumentTypeSelect.value),
        identityDocumentSerialNumber: this.identityDocumentSerialNumber.value
      },
      comments: {
        comments: this.comments.value
      }
    };
  }

  formatDate(date: Date): string {
    return date ?
      `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}` : '';
  }

  formatSelect(value: any): any {
    if (value == null) {
      return '';
    }
    return value;
  }

}
