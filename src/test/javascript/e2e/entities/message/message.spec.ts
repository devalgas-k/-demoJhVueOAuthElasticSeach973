/* tslint:disable no-unused-expression */
import { browser, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import MessageComponentsPage, { MessageDeleteDialog } from './message.page-object';
import MessageUpdatePage from './message-update.page-object';
import MessageDetailsPage from './message-details.page-object';

import {
  clear,
  click,
  getRecordsCount,
  isVisible,
  selectLastOption,
  waitUntilAllDisplayed,
  waitUntilAnyDisplayed,
  waitUntilCount,
  waitUntilDisplayed,
  waitUntilHidden,
} from '../../util/utils';

import path from 'path';

const expect = chai.expect;

describe('Message e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: MessageUpdatePage;
  let detailsPage: MessageDetailsPage;
  let listPage: MessageComponentsPage;
  /*let deleteDialog: MessageDeleteDialog;*/
  const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
  const absolutePath = path.resolve(__dirname, fileToUpload);
  let beforeRecordsCount = 0;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    await navBarPage.login(username, password);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });

  it('should load Messages', async () => {
    await navBarPage.getEntityPage('message');
    listPage = new MessageComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create Message page', async () => {
      await listPage.createButton.click();
      updatePage = new MessageUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getAttribute('id')).to.match(/demoJhVueOAuthElasticSearch973App.message.home.createOrEditLabel/);
    });

    /* it('should create and save Messages', async () => {

      await updatePage.nameInput.sendKeys('name');


      await updatePage.emailInput.sendKeys('l=@^9\~Ra.?&gt;D&lt;');


      await updatePage.phoneInput.sendKeys('.1637557315');


      await waitUntilDisplayed(updatePage.messageInput);
      await updatePage.messageInput.sendKeys('message');


      await waitUntilDisplayed(updatePage.fileInput);
      await updatePage.fileInput.sendKeys(absolutePath);


      await updatePage.cityInput.sendKeys('city');


      await updatePage.otherCountryInput.sendKeys('otherCountry');


      await updatePage.dateInput.sendKeys('01/01/2001' + protractor.Key.TAB + '02:30AM');

      // await selectLastOption(updatePage.subjectSelect);

      expect(await updatePage.saveButton.isEnabled()).to.be.true;
      await updatePage.saveButton.click();

      await waitUntilHidden(updatePage.saveButton);
      expect(await isVisible(updatePage.saveButton)).to.be.false;

      await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      expect(await listPage.records.count()).to.eq(beforeRecordsCount + 1);
    });*/

    /*
    describe('Details, Update, Delete flow', () => {

      after(async () => {

        const deleteButton = listPage.getDeleteButton(listPage.records.first());
        await click(deleteButton);

        deleteDialog = new MessageDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/demoJhVueOAuthElasticSearch973App.message.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details Message page and fetch data', async () => {

        const detailsButton = listPage.getDetailsButton(listPage.records.first());
        await click(detailsButton);

        detailsPage = new MessageDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit Message page, fetch data and update', async () => {

        const editButton = listPage.getEditButton(listPage.records.first());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

          await updatePage.nameInput.clear();
          await updatePage.nameInput.sendKeys('modified');

          await updatePage.emailInput.clear();
          await updatePage.emailInput.sendKeys('b@~&amp;6.&gt;ID');

          await updatePage.phoneInput.clear();
          await updatePage.phoneInput.sendKeys('+453729013.3556');

          await updatePage.messageInput.clear();
          await updatePage.messageInput.sendKeys('updatedmessage');

          await updatePage.cityInput.clear();
          await updatePage.cityInput.sendKeys('modified');

          await updatePage.otherCountryInput.clear();
          await updatePage.otherCountryInput.sendKeys('modified');

          await updatePage.dateInput.clear();
          await updatePage.dateInput.sendKeys('01/01/2019' + protractor.Key.TAB + '02:30AM');


        await updatePage.saveButton.click();

        await waitUntilHidden(updatePage.saveButton);

        expect(await isVisible(updatePage.saveButton)).to.be.false;
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });
    });
    */
  });
});
