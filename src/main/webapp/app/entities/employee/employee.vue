<template>
  <div>
    <h2 id="page-heading" data-cy="EmployeeHeading">
      <span v-text="$t('demoJhVueOAuthElasticSearch973App.employee.home.title')" id="employee-heading">Employees</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('demoJhVueOAuthElasticSearch973App.employee.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'EmployeeCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-employee"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.employee.home.createLabel')"> Create a new Employee </span>
          </button>
        </router-link>
      </div>
    </h2>
    <div class="row">
      <div class="col-sm-12">
        <form name="searchForm" class="form-inline" v-on:submit.prevent="search(currentSearch)">
          <div class="input-group w-100 mt-3">
            <input
              type="text"
              class="form-control"
              name="currentSearch"
              id="currentSearch"
              v-bind:placeholder="$t('demoJhVueOAuthElasticSearch973App.employee.home.search')"
              v-model="currentSearch"
            />
            <button type="button" id="launch-search" class="btn btn-primary" v-on:click="search(currentSearch)">
              <font-awesome-icon icon="search"></font-awesome-icon>
            </button>
            <button type="button" id="clear-search" class="btn btn-secondary" v-on:click="clear()" v-if="currentSearch">
              <font-awesome-icon icon="trash"></font-awesome-icon>
            </button>
          </div>
        </form>
      </div>
    </div>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && employees && employees.length === 0">
      <span v-text="$t('demoJhVueOAuthElasticSearch973App.employee.home.notFound')">No employees found</span>
    </div>
    <div class="table-responsive" v-if="employees && employees.length > 0">
      <table class="table table-striped" aria-describedby="employees">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span v-text="$t('global.field.id')">ID</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('firstName')">
              <span v-text="$t('demoJhVueOAuthElasticSearch973App.employee.firstName')">First Name</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'firstName'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('lastName')">
              <span v-text="$t('demoJhVueOAuthElasticSearch973App.employee.lastName')">Last Name</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'lastName'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('email')">
              <span v-text="$t('demoJhVueOAuthElasticSearch973App.employee.email')">Email</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'email'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('phoneNumber')">
              <span v-text="$t('demoJhVueOAuthElasticSearch973App.employee.phoneNumber')">Phone Number</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'phoneNumber'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('hireDate')">
              <span v-text="$t('demoJhVueOAuthElasticSearch973App.employee.hireDate')">Hire Date</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'hireDate'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('salary')">
              <span v-text="$t('demoJhVueOAuthElasticSearch973App.employee.salary')">Salary</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'salary'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('commissionPct')">
              <span v-text="$t('demoJhVueOAuthElasticSearch973App.employee.commissionPct')">Commission Pct</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'commissionPct'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('level')">
              <span v-text="$t('demoJhVueOAuthElasticSearch973App.employee.level')">Level</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'level'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('contract')">
              <span v-text="$t('demoJhVueOAuthElasticSearch973App.employee.contract')">Contract</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'contract'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('cv')">
              <span v-text="$t('demoJhVueOAuthElasticSearch973App.employee.cv')">Cv</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'cv'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('manager.id')">
              <span v-text="$t('demoJhVueOAuthElasticSearch973App.employee.manager')">Manager</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'manager.id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('department.id')">
              <span v-text="$t('demoJhVueOAuthElasticSearch973App.employee.department')">Department</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'department.id'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'EmployeeView', params: { employeeId: employee.id } }">{{ employee.id }}</router-link>
            </td>
            <td>{{ employee.firstName }}</td>
            <td>{{ employee.lastName }}</td>
            <td>{{ employee.email }}</td>
            <td>{{ employee.phoneNumber }}</td>
            <td>{{ employee.hireDate ? $d(Date.parse(employee.hireDate), 'short') : '' }}</td>
            <td>{{ employee.salary }}</td>
            <td>{{ employee.commissionPct }}</td>
            <td>{{ employee.level }}</td>
            <td v-text="$t('demoJhVueOAuthElasticSearch973App.Contract.' + employee.contract)">{{ employee.contract }}</td>
            <td>
              <a v-if="employee.cv" v-on:click="openFile(employee.cvContentType, employee.cv)" v-text="$t('entity.action.open')">open</a>
              <span v-if="employee.cv">{{ employee.cvContentType }}, {{ byteSize(employee.cv) }}</span>
            </td>
            <td>
              <div v-if="employee.manager">
                <router-link :to="{ name: 'EmployeeView', params: { employeeId: employee.manager.id } }">{{
                  employee.manager.id
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="employee.department">
                <router-link :to="{ name: 'DepartmentView', params: { departmentId: employee.department.id } }">{{
                  employee.department.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'EmployeeView', params: { employeeId: employee.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'EmployeeEdit', params: { employeeId: employee.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(employee)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span
          id="demoJhVueOAuthElasticSearch973App.employee.delete.question"
          data-cy="employeeDeleteDialogHeading"
          v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-employee-heading" v-text="$t('demoJhVueOAuthElasticSearch973App.employee.delete.question', { id: removeId })">
          Are you sure you want to delete this Employee?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-employee"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeEmployee()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="employees && employees.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./employee.component.ts"></script>
