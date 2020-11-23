export class PageInfo {
    filter: any;
    orderBy: string;
    desc: boolean;
    pageSize: number;
    pageNumber: number;
}

export class ApplicationRow {
    id: number;
    employeeId: number;
    country: string;
    city: string;
    abroadStartDate: Date;
    abroadEndDate: Date;
    status: Date;
}
