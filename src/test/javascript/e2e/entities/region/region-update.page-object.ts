import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class RegionUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('demoJhVueOAuthElasticSearch973App.region.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  regionNameInput: ElementFinder = element(by.css('input#region-regionName'));
}
