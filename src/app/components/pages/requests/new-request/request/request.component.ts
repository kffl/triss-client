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
        vehicleSelect: this.vehicleSelect.value ? this.vehicleSelect.value : '',
        route: this.route.value,
        departureMinute: this.departureMinuteSelect.value ? this.departureMinuteSelect.value : '',
        departureHour: this.departureHourSelect.value ? this.departureHourSelect.value : '',
        departureDay: this.formatDate(this.departureDate.value),
        carrier: this.carrier.value
      },
      insurance: {
        firstNameAndSurnameInsurance: this.firstNameAndSurnameInsurance.value,
        birthDate: this.formatDate(this.birthDate.value),
        departureCountry: this.departureCountry,
        abroadStartDateInsurance: this.formatDate(this.abroadDateInsurance.value.start),
        abroadEndDateInsurance: this.formatDate(this.abroadDateInsurance.value.end),
        selfInsuredCheckbox: this.selfInsuredCheckbox.checked
      },
      advancePaymentRequest: {
        // destination: this.destination.value,
      },
      advancePayments: {},
      identityDocument: {},
      comments: {}
    };
  }

  formatDate(date: Date): string {
    return date ?
      `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}` : '';
  }

}
