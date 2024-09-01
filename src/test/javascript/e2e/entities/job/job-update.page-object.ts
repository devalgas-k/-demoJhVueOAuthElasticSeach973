import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class JobUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('demoJhVueOAuthElasticSearch973App.job.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  jobTitleInput: ElementFinder = element(by.css('input#job-jobTitle'));

  minSalaryInput: ElementFinder = element(by.css('input#job-minSalary'));

  maxSalaryInput: ElementFinder = element(by.css('input#job-maxSalary'));

  subSalaryInput: ElementFinder = element(by.css('input#job-subSalary'));

  totalSalaryInput: ElementFinder = element(by.css('input#job-totalSalary'));

  dateInput: ElementFinder = element(by.css('input#job-date'));

  codeCodeInput: ElementFinder = element(by.css('input#job-codeCode'));

  profilInput: ElementFinder = element(by.css('input#file_profil'));

  taskSelect = element(by.css('select#job-task'));

  employeeSelect = element(by.css('select#job-employee'));
}
