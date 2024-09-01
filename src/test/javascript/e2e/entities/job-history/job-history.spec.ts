/* tslint:disable no-unused-expression */
import { browser, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import JobHistoryComponentsPage, { JobHistoryDeleteDialog } from './job-history.page-object';
import JobHistoryUpdatePage from './job-history-update.page-object';
import JobHistoryDetailsPage from './job-history-details.page-object';

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

const expect = chai.expect;

describe('JobHistory e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: JobHistoryUpdatePage;
  let detailsPage: JobHistoryDetailsPage;
  let listPage: JobHistoryComponentsPage;
  let deleteDialog: JobHistoryDeleteDialog;
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

  it('should load JobHistories', async () => {
    await navBarPage.getEntityPage('job-history');
    listPage = new JobHistoryComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create JobHistory page', async () => {
      await listPage.createButton.click();
      updatePage = new JobHistoryUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getAttribute('id')).to.match(/demoJhVueOAuthElasticSearch973App.jobHistory.home.createOrEditLabel/);
    });

    it('should create and save JobHistories', async () => {
      await updatePage.startDateInput.sendKeys('01/01/2001' + protractor.Key.TAB + '02:30AM');

      await updatePage.endDateInput.sendKeys('01/01/2001' + protractor.Key.TAB + '02:30AM');

      await selectLastOption(updatePage.languageSelect);

      // await selectLastOption(updatePage.jobSelect);
      // await selectLastOption(updatePage.departmentSelect);
      // await selectLastOption(updatePage.employeeSelect);

      expect(await updatePage.saveButton.isEnabled()).to.be.true;
      await updatePage.saveButton.click();

      await waitUntilHidden(updatePage.saveButton);
      expect(await isVisible(updatePage.saveButton)).to.be.false;

      await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      expect(await listPage.records.count()).to.eq(beforeRecordsCount + 1);
    });

    describe('Details, Update, Delete flow', () => {
      after(async () => {
        const deleteButton = listPage.getDeleteButton(listPage.records.last());
        await click(deleteButton);

        deleteDialog = new JobHistoryDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/demoJhVueOAuthElasticSearch973App.jobHistory.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details JobHistory page and fetch data', async () => {
        const detailsButton = listPage.getDetailsButton(listPage.records.last());
        await click(detailsButton);

        detailsPage = new JobHistoryDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit JobHistory page, fetch data and update', async () => {
        const editButton = listPage.getEditButton(listPage.records.last());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

        await updatePage.startDateInput.clear();
        await updatePage.startDateInput.sendKeys('01/01/2019' + protractor.Key.TAB + '02:30AM');

        await updatePage.endDateInput.clear();
        await updatePage.endDateInput.sendKeys('01/01/2019' + protractor.Key.TAB + '02:30AM');

        await updatePage.saveButton.click();

        await waitUntilHidden(updatePage.saveButton);

        expect(await isVisible(updatePage.saveButton)).to.be.false;
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });
    });
  });
});
