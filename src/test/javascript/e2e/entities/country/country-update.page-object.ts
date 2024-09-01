import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class CountryUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('demoJhVueOAuthElasticSearch973App.country.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  countryNameInput: ElementFinder = element(by.css('input#country-countryName'));

  regionSelect = element(by.css('select#country-region'));
}
