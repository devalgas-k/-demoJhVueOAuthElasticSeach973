import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class DepartmentUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('demoJhVueOAuthElasticSearch973App.department.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  departmentNameInput: ElementFinder = element(by.css('input#department-departmentName'));

  locationSelect = element(by.css('select#department-location'));
}
