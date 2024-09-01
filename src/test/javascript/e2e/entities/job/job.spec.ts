/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import JobComponentsPage, { JobDeleteDialog } from './job.page-object';
import JobUpdatePage from './job-update.page-object';
import JobDetailsPage from './job-details.page-object';

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

describe('Job e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: JobUpdatePage;
  let detailsPage: JobDetailsPage;
  let listPage: JobComponentsPage;
  let deleteDialog: JobDeleteDialog;
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

  it('should load Jobs', async () => {
    await navBarPage.getEntityPage('job');
    listPage = new JobComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create Job page', async () => {
      await listPage.createButton.click();
      updatePage = new JobUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getAttribute('id')).to.match(/demoJhVueOAuthElasticSearch973App.job.home.createOrEditLabel/);
    });

    it('should create and save Jobs', async () => {
      await updatePage.jobTitleInput.sendKeys('jobTitle');

      await updatePage.minSalaryInput.sendKeys('5');

      await updatePage.maxSalaryInput.sendKeys('5');

      await updatePage.subSalaryInput.sendKeys('5');

      await updatePage.totalSalaryInput.sendKeys('5');

      await updatePage.dateInput.sendKeys('2001-01-01');

      await updatePage.codeCodeInput.sendKeys('64c99148-3908-465d-8c4a-e510e3ade974');

      await waitUntilDisplayed(updatePage.profilInput);
      await updatePage.profilInput.sendKeys(absolutePath);

      // await selectLastOption(updatePage.taskSelect);
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
        const deleteButton = listPage.getDeleteButton(listPage.records.first());
        await click(deleteButton);

        deleteDialog = new JobDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/demoJhVueOAuthElasticSearch973App.job.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details Job page and fetch data', async () => {
        const detailsButton = listPage.getDetailsButton(listPage.records.first());
        await click(detailsButton);

        detailsPage = new JobDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit Job page, fetch data and update', async () => {
        const editButton = listPage.getEditButton(listPage.records.first());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

        await updatePage.jobTitleInput.clear();
        await updatePage.jobTitleInput.sendKeys('modified');

        await clear(updatePage.minSalaryInput);
        await updatePage.minSalaryInput.sendKeys('6');

        await clear(updatePage.maxSalaryInput);
        await updatePage.maxSalaryInput.sendKeys('6');

        await clear(updatePage.subSalaryInput);
        await updatePage.subSalaryInput.sendKeys('6');

        await clear(updatePage.totalSalaryInput);
        await updatePage.totalSalaryInput.sendKeys('6');

        await updatePage.dateInput.clear();
        await updatePage.dateInput.sendKeys('2019-01-01');

        await updatePage.codeCodeInput.clear();
        await updatePage.codeCodeInput.sendKeys('64c99148-3908-465d-8c4a-e510e3ade978');

        await updatePage.saveButton.click();

        await waitUntilHidden(updatePage.saveButton);

        expect(await isVisible(updatePage.saveButton)).to.be.false;
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });
    });
  });
});
