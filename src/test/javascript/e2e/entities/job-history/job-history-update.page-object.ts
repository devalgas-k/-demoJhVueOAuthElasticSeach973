import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class JobHistoryUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('demoJhVueOAuthElasticSearch973App.jobHistory.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  startDateInput: ElementFinder = element(by.css('input#job-history-startDate'));

  endDateInput: ElementFinder = element(by.css('input#job-history-endDate'));

  languageSelect = element(by.css('select#job-history-language'));
  jobSelect = element(by.css('select#job-history-job'));

  departmentSelect = element(by.css('select#job-history-department'));

  employeeSelect = element(by.css('select#job-history-employee'));
}
