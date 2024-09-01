import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class TaskUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('demoJhVueOAuthElasticSearch973App.task.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  titleInput: ElementFinder = element(by.css('input#task-title'));

  descriptionInput: ElementFinder = element(by.css('input#task-description'));
}
