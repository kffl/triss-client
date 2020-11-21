export interface FormData {
  advanceApplication: {
    accommodationLimit: number
    accommodationQuantity: number
    accommodationSum: number
    advanceSum: number
    endDate: string
    id: number
    otherCostsAmount: number
    otherCostsDescription: string
    placeId: number
    residenceDietAmount: number
    residenceDietQuantity: number
    residenceDietSum: number
    startDate: string
    travelCosts: number
    travelDietAmount: number
  };
  advancePayments: {
    accommodationFeePaymentTypeSelect: string
    accommodationFeeValue: number
    conferenceFeePaymentTypeSelect: string
    conferenceFeeValue: number
  };
  application: {
    abroadEndDate: string
    abroadEndDateInsurance: string
    abroadStartDate: string
    abroadStartDateInsurance: string
    advanceRequestId: number
    comments: string
    conference: string
    conferenceEndDate: string
    conferenceStartDate: string
    createdOn: string
    employeeId: number
    financialSourceId: number
    id: number
    identityDocumentID: number
    instituteId: number
    placeId: number
    prepaymentId: number
    purpose: string
    selfInsured: false
    status: string
    subject: string
  };
  employee: {
    academicDegree: string
    birthDate: string
    employeeTypeID: number
    firstName: string
    id: number
    instituteID: number
    phoneNumber: string
    surname: string
  };
  financialSource: {
    allocationAccount: string
    financialSource: string
    id: number
    mpk: string
    project: string
  };
  identityDocument: {
    employeeID: number
    id: number
    number: string
    type: number
  };
  institute: {
    id: number;
    name: string;
  };
  place: {
    city: string
    country: string
    id: number
  };
  transport: Transport[];
}
interface Transport {
  applicationID: number;
  carrier: string;
  departureDay: string;
  departureHour: number;
  departureMinute: number;
  destinationFrom: string;
  destinationTo: string;
  id: number;
  vehicleSelect: string;
}

export interface FormWithStatus {
  form: FormData;
  status: string;
}
