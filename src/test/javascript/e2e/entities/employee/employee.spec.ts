/* tslint:disable no-unused-expression */
import { browser, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import EmployeeComponentsPage, { EmployeeDeleteDialog } from './employee.page-object';
import EmployeeUpdatePage from './employee-update.page-object';
import EmployeeDetailsPage from './employee-details.page-object';

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

describe('Employee e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: EmployeeUpdatePage;
  let detailsPage: EmployeeDetailsPage;
  let listPage: EmployeeComponentsPage;
  let deleteDialog: EmployeeDeleteDialog;
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

  it('should load Employees', async () => {
    await navBarPage.getEntityPage('employee');
    listPage = new EmployeeComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create Employee page', async () => {
      await listPage.createButton.click();
      updatePage = new EmployeeUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getAttribute('id')).to.match(/demoJhVueOAuthElasticSearch973App.employee.home.createOrEditLabel/);
    });

    it('should create and save Employees', async () => {
      await updatePage.firstNameInput.sendKeys('firstName');

      await updatePage.lastNameInput.sendKeys('lastName');

      await updatePage.emailInput.sendKeys('email');

      await updatePage.phoneNumberInput.sendKeys('phoneNumber');

      await updatePage.hireDateInput.sendKeys('01/01/2001' + protractor.Key.TAB + '02:30AM');

      await updatePage.salaryInput.sendKeys('5');

      await updatePage.commissionPctInput.sendKeys('5');

      // await selectLastOption(updatePage.managerSelect);
      // await selectLastOption(updatePage.departmentSelect);

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

        deleteDialog = new EmployeeDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/demoJhVueOAuthElasticSearch973App.employee.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details Employee page and fetch data', async () => {
        const detailsButton = listPage.getDetailsButton(listPage.records.last());
        await click(detailsButton);

        detailsPage = new EmployeeDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit Employee page, fetch data and update', async () => {
        const editButton = listPage.getEditButton(listPage.records.last());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

        await updatePage.firstNameInput.clear();
        await updatePage.firstNameInput.sendKeys('modified');

        await updatePage.lastNameInput.clear();
        await updatePage.lastNameInput.sendKeys('modified');

        await updatePage.emailInput.clear();
        await updatePage.emailInput.sendKeys('modified');

        await updatePage.phoneNumberInput.clear();
        await updatePage.phoneNumberInput.sendKeys('modified');

        await updatePage.hireDateInput.clear();
        await updatePage.hireDateInput.sendKeys('01/01/2019' + protractor.Key.TAB + '02:30AM');

        await clear(updatePage.salaryInput);
        await updatePage.salaryInput.sendKeys('6');

        await clear(updatePage.commissionPctInput);
        await updatePage.commissionPctInput.sendKeys('6');

        await updatePage.saveButton.click();

        await waitUntilHidden(updatePage.saveButton);

        expect(await isVisible(updatePage.saveButton)).to.be.false;
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });
    });
  });
});
