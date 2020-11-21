export class AppRoutes {
  private static request = 'request';
  static home = '';
  static personalData = 'personal-data';
  static createRequest = 'create-request';
  static requestsListEmployee = 'requests-list';
  static requestsListDirector = 'director-panel';
  static requestsListWilda = 'wilda-panel';
  static requestsListRector = 'rector-panel';
  static settings = 'settings';
  static viewRequestEmployee = `${AppRoutes.requestsListEmployee}/${AppRoutes.request}`;
  static viewRequestDirector = `${AppRoutes.requestsListDirector}/${AppRoutes.request}`;
  static viewRequestWilda = `${AppRoutes.requestsListWilda}/${AppRoutes.request}`;
  static viewRequestRector = `${AppRoutes.requestsListRector}/${AppRoutes.request}`;
}
