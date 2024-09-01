import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class ExperienceUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('demoJhVueOAuthElasticSearch973App.experience.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  titleInput: ElementFinder = element(by.css('input#experience-title'));

  companyInput: ElementFinder = element(by.css('input#experience-company'));

  descriptionInput: ElementFinder = element(by.css('textarea#experience-description'));

  logoCompanyInput: ElementFinder = element(by.css('input#file_logoCompany'));

  inProgressInput: ElementFinder = element(by.css('input#experience-inProgress'));

  contractSelect = element(by.css('select#experience-contract'));

  startDateInput: ElementFinder = element(by.css('input#experience-startDate'));

  endDateInput: ElementFinder = element(by.css('input#experience-endDate'));

  expertiseSelect = element(by.css('select#experience-expertise'));
}
