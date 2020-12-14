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
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {UseCaseEnum} from '../../../../../extra/use-case-enum/use-case-enum';
import {FinancialSource, FormData, Transport} from '../../../../../extra/request-interface/request-interface';
import {AppRoutes} from '../../../../../extra/routes/appRoutes';
import {Location} from '@angular/common';
import {InstituteInterface} from '../../../../../extra/institute-interface/institute.interface';
import {RequestDataService} from '../../../../../services/request-data.service';
import {RejectInfo} from '../../../../shared/reject-dialog/reject-dialog.component';
import {DialogService} from '../../../../../services/dialog.service';
import {RestService, Enum} from '../../../../../services/rest-service';
import {Observable} from 'rxjs';
import {SafeHttpClient} from '../../../../shared/security/SafeHtppClient';
import {StatusEnum} from '../../../../../extra/status-enum/status-enum';
import {SecurityService} from '../../../../shared/security/SecurityService';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @Input() useCase: UseCaseEnum;
  @Input() formData: FormData;
  @Input() status: number;

  formFieldsStyle: MatFormFieldAppearance = 'fill';
  transportMeansNumber = 1;
  transportMeansArray = [1];

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

  employeeId: number = null;
  employeeInstitute: InstituteInterface = null;

  statusEnum: Enum = null;
  statusText: string = null;
  declineReason: string = null;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private translateService: TranslateService,
    private http: SafeHttpClient,
    private router: Router,
    private location: Location,
    private requestService: RequestDataService,
    private dialogService: DialogService,
    private restService: RestService,
    private securityService: SecurityService
  ) {
    this.onLangChange(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe(generator => this.onLangChange(generator.lang));
  }

  ngOnInit(): void {
    this.getSelectEnums();
    this.getStatus();
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
    this.showStatus();
  }

  setAutocompletingFields() {
    if (this.useCase === UseCaseEnum.Create) {
      this.restService.getPersonalData().subscribe(personalData => {
        this.restService.getInstitutes().subscribe(institutes => {
          this.employeeInstitute = institutes.find(institute => personalData.instituteID === institute.id);
          this.institute.value = this.employeeInstitute.name;
        }, (error: HttpErrorResponse) => this.securityService.checkErrorAndRedirectToELogin(error));
        this.firstName.value = personalData.firstName;
        this.surname.value = personalData.surname;
        this.academicTitle.value = personalData.academicDegree;
        this.phoneNumber.value = personalData.phoneNumber;
        this.firstNameInsurance.value = personalData.firstName;
        this.surnameInsurance.value = personalData.surname;
        this.birthDate.value = new Date(personalData.birthDate);
        this.employeeId = personalData.employeeId;
      }, (error: HttpErrorResponse) => this.securityService.checkErrorAndRedirectToELogin(error));
    }
  }

  getStatus() {
    this.restService.getStatuses().subscribe(statuses => {
      this.statusEnum = statuses.find(status => this.status === status.id);
      this.showStatus();
    }, (error: HttpErrorResponse) => this.securityService.checkErrorAndRedirectToELogin(error));
  }

  showStatus() {
    if (this.statusEnum == null) {
      this.translateService.get('STATUS.CREATE').subscribe(value => {
        this.statusText = value;
      });
    } else {
      this.statusText = this.statusEnum[this.enumLang];
    }
  }

  getSelectEnums() {
    this.restService.getVehicles()
      .subscribe(vehicles => {
        this.vehicles = vehicles;
        this.loadTransportData();
      }, (error: HttpErrorResponse) => this.securityService.checkErrorAndRedirectToELogin(error));
    this.restService.getDocumentTypes()
      .subscribe(identityDocuments => {
        this.identityDocuments = identityDocuments;
        this.loadIdentityDocument();
      }, (error: HttpErrorResponse) => this.securityService.checkErrorAndRedirectToELogin(error));
    this.restService.getPaymentTypes()
      .subscribe(paymentTypes => {
        this.paymentTypes = paymentTypes;
        this.loadPaymentTypes();
      }, (error: HttpErrorResponse) => this.securityService.checkErrorAndRedirectToELogin(error));
  }

  submitForm() {
    const formValues: FormData = this.getParsedFormData();
    const isFormValid = this.validateForm(formValues);
    if (!isFormValid) {
      this.validationFailedDialog();
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
      const selfInsured = this.formData.application.selfInsured;
      if (!selfInsured) {
        this.abroadDateInsuranceStart.writeValue(new Date(this.formData.application.abroadStartDateInsurance));
        this.abroadDateInsuranceEnd.writeValue(new Date(this.formData.application.abroadEndDateInsurance));
      }
      this.selfInsuredCheckbox.checked = selfInsured;
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
      // decline-reason
      this.getDeclineReason();
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
    if (this.useCase !== UseCaseEnum.Create) {
      this.identityDocumentTypeSelect.value = this.formData.application.identityDocumentType;
      this.identityDocumentSerialNumber.value = this.formData.application.identityDocumentNumber;
    }
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

  getDeclineReason() {
    this.declineReason =
      this.formData.application.directorComments ||
      this.formData.application.wildaComments ||
      this.formData.application.rectorComments;
  }

  validationFailedDialog() {
    this.validationFailed = true;
    this.dialogService.showSimpleDialog(
      'DIALOG.REQUEST_VALIDATION_FAILED.TITLE',
      'DIALOG.REQUEST_VALIDATION_FAILED.CONTENT'
    );
  }

  approveRejectDialog(
    restObservable: Observable<any>,
    goBackUrl: string,
    titleSuccess: string,
    contentSuccess: string,
    titleError: string,
    contentError: string
  ) {
    restObservable.subscribe(
      () => {
        this.dialogService.showSimpleDialog(titleSuccess, contentSuccess, false);
        setTimeout(() => {
          this.router.navigateByUrl(goBackUrl).then(() => this.dialogService.getDialog().closeAll());
        }, 2000);
      },
      (error: HttpErrorResponse) => {
        this.securityService.checkErrorAndRedirectToELogin(error);
        this.dialogService.showErrorDialog(titleError, contentError, error);
      });
  }

  rejectForm() {
    this.dialogService.showRejectDialog().beforeClosed().subscribe((result: RejectInfo) => {
      if (result.rejected) {
        let restObservable: Observable<any> = null;
        let goBackUrl: string = null;
        switch (this.useCase) {
          case UseCaseEnum.Director: {
            this.formData.application.directorComments = result.reason;
            this.formData.application.status = this.status;
            restObservable = this.restService.rejectAsDirector(this.formData);
            goBackUrl = AppRoutes.requestsListDirector;
            break;
          }
          case UseCaseEnum.WildaApprove: {
            this.formData.application.wildaComments = result.reason;
            this.formData.application.status = this.status;
            restObservable = this.restService.rejectAsWilda(this.formData);
            goBackUrl = AppRoutes.requestsListWilda;
            break;
          }
          case UseCaseEnum.Rector: {
            this.formData.application.rectorComments = result.reason;
            this.formData.application.status = this.status;
            restObservable = this.restService.rejectAsRector(this.formData);
            goBackUrl = AppRoutes.requestsListRector;
            break;
          }
        }
        this.approveRejectDialog(
          restObservable,
          goBackUrl,
          'DIALOG.REQUEST_REJECTED.TITLE',
          'DIALOG.REQUEST_REJECTED.CONTENT',
          'DIALOG.REQUEST_REJECT_FAIL.TITLE',
          'DIALOG.REQUEST_REJECT_FAIL.CONTENT'
        );
      }
    });
  }

  sendToWilda() {
    const financialSource: FinancialSource = this.getParsedFinancialSourceData();
    const isValidFinancialSource = this.validateFinancialSource(financialSource);
    if (isValidFinancialSource) {
      this.formData.financialSource = financialSource;
      this.formData.application.status = this.status;
      this.approveForm(this.restService.approveAsDirector(this.formData), AppRoutes.requestsListDirector);
    } else {
      this.validationFailedDialog();
    }
  }

  sendToRector() {
    this.formData.application.status = this.status;
    this.approveForm(this.restService.approveAsWilda(this.formData), AppRoutes.requestsListWilda);
  }

  sendBackToWilda() {
    this.formData.application.status = this.status;
    this.approveForm(this.restService.approveAsRector(this.formData), AppRoutes.requestsListRector);
  }

  approveForm(restObservable: Observable<any>, goBackUrl: string) {
    this.approveRejectDialog(
      restObservable,
      goBackUrl,
      'DIALOG.REQUEST_APPROVED.TITLE',
      'DIALOG.REQUEST_APPROVED.CONTENT',
      'DIALOG.REQUEST_APPROVE_FAIL.TITLE',
      'DIALOG.REQUEST_APPROVE_FAIL.CONTENT'
      );
  }

  getParsedFormData(): FormData {
    const transportArrays = {
      vehicleSelect: this.vehicleSelect.toArray().map(item => this.requestService.formatSelect(item.value)),
      routeFrom: this.routeFrom.toArray().map(item => this.requestService.formatInput(item.value)),
      routeTo: this.routeTo.toArray().map(item => this.requestService.formatInput(item.value)),
      departureDay: this.departureDate.toArray().map(item => this.requestService.formatDate(item.value)),
      departureHour: this.departureHour.toArray().map(item => this.requestService.getNumberFromInput(item.value)),
      departureMinute: this.departureMinute.toArray().map(item => this.requestService.getNumberFromInput(item.value)),
      carrier: this.carrier.toArray().map(item => this.requestService.formatInput(item.value))
    };
    const transportParsedArray: Transport[] = [];
    for (const i of Object.keys(this.transportMeansArray)) {
      transportParsedArray.push({
        applicationID: null,
        vehicleSelect: transportArrays.vehicleSelect[i],
        destinationFrom: transportArrays.routeFrom[i],
        destinationTo: transportArrays.routeTo[i],
        departureDay: transportArrays.departureDay[i],
        departureHour: transportArrays.departureHour[i],
        departureMinute: transportArrays.departureMinute[i],
        carrier: transportArrays.carrier[i],
        id: null
      });
    }
    return {
      advanceApplication: {
        accommodationLimit: this.requestService.getNumberFromInput(this.requestPaymentAccommodationLimit.value),
        accommodationQuantity: this.requestService.getNumberFromInput(this.requestPaymentDays.value),
        accommodationSum: this.requestService.getNumberFromInput(this.requestPaymentAccommodationSum.value),
        advanceSum: this.requestService.getNumberFromInput(this.requestPaymentSummarizedCosts.value),
        endDate: this.requestService.formatDate(this.requestPaymentDate.value.end),
        id: null,
        otherCostsAmount: this.requestService.getNumberFromInput(this.requestPaymentOtherExpensesValue.value),
        otherCostsDescription: this.requestService.formatInput(this.requestPaymentOtherExpensesDescription.value),
        placeId: null,
        residenceDietAmount: this.requestService.getNumberFromInput(this.requestPaymentDaysAmount.value),
        residenceDietQuantity: this.requestService.getNumberFromInput(this.requestPaymentDays.value),
        residenceDietSum: this.requestService.getNumberFromInput(this.requestPaymentDaysAmountSum.value),
        startDate: this.requestService.formatDate(this.requestPaymentDate.value.start),
        travelCosts: this.requestService.getNumberFromInput(this.requestPaymentLocalTransportCosts.value),
        travelDietAmount: this.requestService.getNumberFromInput(this.requestPaymentTravelDiet.value)
      },
      advancePayments: {
        accommodationFeePaymentTypeSelect: this.requestService.formatSelect(this.depositPaymentTypeSelect.value),
        accommodationFeeValue: this.requestService.getNumberFromInput(this.depositValue.value),
        conferenceFeePaymentTypeSelect: this.requestService.formatSelect(this.conferenceFeePaymentTypeSelect.value),
        conferenceFeeValue: this.requestService.getNumberFromInput(this.conferenceFeeValue.value)
      },
      application: {
        abroadEndDate: this.requestService.formatDate(this.abroadDate.value.end),
        abroadEndDateInsurance: this.requestService.formatDate(this.abroadDateInsurance.value.end),
        abroadStartDate: this.requestService.formatDate(this.abroadDate.value.start),
        abroadStartDateInsurance: this.requestService.formatDate(this.abroadDateInsurance.value.start),
        academicDegree: this.requestService.formatInput(this.academicTitle.value),
        advanceApplicationId: null,
        birthDate: this.requestService.formatDate(this.birthDate.value),
        comments: this.requestService.formatInput(this.comments.value),
        conference: this.requestService.formatInput(this.conference.value),
        conferenceStartDate: this.requestService.formatDate(this.conferenceDate.value.start),
        conferenceEndDate: this.requestService.formatDate(this.conferenceDate.value.end),
        createdOn: null,
        directorComments: null,
        employeeId: this.employeeId,
        financialSourceId: null,
        firstName: this.requestService.formatInput(this.firstName.value),
        id: null,
        identityDocumentNumber: this.requestService.formatInput(this.identityDocumentSerialNumber.value),
        identityDocumentType: this.requestService.formatSelect(this.identityDocumentTypeSelect.value),
        instituteId: this.employeeInstitute.id,
        phoneNumber: this.requestService.formatInput(this.phoneNumber.value),
        placeId: null,
        prepaymentId: null,
        purpose: this.requestService.formatInput(this.purpose.value),
        rectorComments: null,
        selfInsured: this.selfInsuredCheckbox.checked,
        status: StatusEnum.waitingForDirector,
        subject: this.requestService.formatInput(this.subject.value),
        surname: this.requestService.formatInput(this.surname.value),
        wildaComments: null
      },
      financialSource: null,
      institute: {
        id: this.employeeInstitute.id,
        name: this.employeeInstitute.name,
        active: this.employeeInstitute.active
      },
      place: {
        id: null,
        country: this.requestService.formatInput(this.destinationCountry.value),
        city: this.requestService.formatInput(this.destinationCity.value),
      },
      transport: transportParsedArray
    };
  }

  validateForm(form: FormData): boolean {
    const instituteFields = [form.institute.name];
    const placeFields = [form.place.country, form.place.city];
    const applicationFields = [
      form.application.firstName,
      form.application.surname,
      form.application.birthDate,
      form.application.academicDegree,
      form.application.phoneNumber,
      form.application.identityDocumentType,
      form.application.identityDocumentNumber,
      form.application.abroadStartDate,
      form.application.abroadEndDate,
      form.application.purpose,
      form.application.conference,
      form.application.subject,
      form.application.conferenceStartDate,
      form.application.conferenceEndDate,
      form.application.abroadStartDate,
      form.application.abroadEndDate,
    ];
    const advanceApplicationFields = [
      form.advanceApplication.startDate,
      form.advanceApplication.endDate,
      form.advanceApplication.residenceDietQuantity,
      form.advanceApplication.residenceDietAmount,
      form.advanceApplication.accommodationQuantity,
      form.advanceApplication.accommodationLimit,
      form.advanceApplication.travelDietAmount,
      form.advanceApplication.travelCosts,
    ];
    const advancePaymentsFields = [
      form.advancePayments.conferenceFeeValue,
      form.advancePayments.conferenceFeePaymentTypeSelect,
      form.advancePayments.accommodationFeeValue,
      form.advancePayments.accommodationFeePaymentTypeSelect
    ];
    const transportFields = [];
    form.transport.forEach(transportMean => transportFields.push(
      transportMean.destinationFrom,
      transportMean.destinationTo,
      transportMean.departureDay,
      transportMean.departureMinute,
      transportMean.departureHour,
      transportMean.vehicleSelect
    ));
    const sections = [
      instituteFields,
      placeFields,
      applicationFields,
      advanceApplicationFields,
      advancePaymentsFields,
      transportFields
    ];
    for (const section of sections) {
      if (section.some(field => field == null)) {
        return false;
      }
    }
    return true;
  }

  getParsedFinancialSourceData(): FinancialSource {
    return {
      id: null,
      allocationAccount: this.requestService.formatInput(this.allocationAccount.value),
      mpk: this.requestService.formatInput(this.MPK.value),
      financialSource: this.requestService.formatInput(this.financialSource.value),
      project: this.requestService.formatInput(this.project.value)
    };
  }

  validateFinancialSource(financialSource: FinancialSource): boolean {
    const fields = [
      financialSource.allocationAccount,
      financialSource.mpk,
      financialSource.financialSource,
      financialSource.project
    ];
    return !fields.some(field => field == null);
  }

  sendFormData(form: FormData) {
    this.restService.sendFormData(form).subscribe(
      () => {
        this.dialogService.showSimpleDialog(
          'DIALOG.REQUEST_SENT.TITLE',
          'DIALOG.REQUEST_SENT.CONTENT',
          false
        );
        setTimeout(() => {
          this.router.navigateByUrl(AppRoutes.home).then(() => this.dialogService.getDialog().closeAll());
        }, 2000);
      },
      (error: HttpErrorResponse) => {
        this.securityService.checkErrorAndRedirectToELogin(error);
        this.dialogService.showErrorDialog(
          'DIALOG.REQUEST_NOT_SENT.TITLE',
          'DIALOG.REQUEST_NOT_SENT.CONTENT',
          error
        );
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
    element.value = this.requestService.getNumberLimited(element.value, maxValue);
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
