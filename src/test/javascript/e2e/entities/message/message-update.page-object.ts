import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class MessageUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('demoJhVueOAuthElasticSearch973App.message.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  nameInput: ElementFinder = element(by.css('input#message-name'));

  emailInput: ElementFinder = element(by.css('input#message-email'));

  phoneInput: ElementFinder = element(by.css('input#message-phone'));

  messageInput: ElementFinder = element(by.css('textarea#message-message'));

  fileInput: ElementFinder = element(by.css('input#file_file'));

  cityInput: ElementFinder = element(by.css('input#message-city'));

  otherCountryInput: ElementFinder = element(by.css('input#message-otherCountry'));

  dateInput: ElementFinder = element(by.css('input#message-date'));

  subjectSelect = element(by.css('select#message-subject'));
}
