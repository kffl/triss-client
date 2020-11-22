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
    academicDegree: string
    advanceApplicationId: number
    birthDate: string
    comments: string
    conference: string
    conferenceEndDate: string
    conferenceStartDate: string
    createdOn: string
    directorComments: string
    employeeId: number
    financialSourceId: number
    firstName: string
    id: number
    identityDocumentNumber: string
    identityDocumentType: string
    instituteId: number
    phoneNumber: string
    placeId: number
    prepaymentId: number
    purpose: string
    rectorComments: string
    selfInsured: boolean
    status: string
    subject: string
    surname: string
    wildaComments: string
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
    active: boolean;
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
