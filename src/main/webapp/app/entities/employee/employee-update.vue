<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="demoJhVueOAuthElasticSearch973App.employee.home.createOrEditLabel"
          data-cy="EmployeeCreateUpdateHeading"
          v-text="$t('demoJhVueOAuthElasticSearch973App.employee.home.createOrEditLabel')"
        >
          Create or edit a Employee
        </h2>
        <div>
          <div class="form-group" v-if="employee.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="employee.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.employee.firstName')" for="employee-firstName"
              >First Name</label
            >
            <input
              type="text"
              class="form-control"
              name="firstName"
              id="employee-firstName"
              data-cy="firstName"
              :class="{ valid: !$v.employee.firstName.$invalid, invalid: $v.employee.firstName.$invalid }"
              v-model="$v.employee.firstName.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.employee.lastName')" for="employee-lastName"
              >Last Name</label
            >
            <input
              type="text"
              class="form-control"
              name="lastName"
              id="employee-lastName"
              data-cy="lastName"
              :class="{ valid: !$v.employee.lastName.$invalid, invalid: $v.employee.lastName.$invalid }"
              v-model="$v.employee.lastName.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.employee.email')" for="employee-email"
              >Email</label
            >
            <input
              type="text"
              class="form-control"
              name="email"
              id="employee-email"
              data-cy="email"
              :class="{ valid: !$v.employee.email.$invalid, invalid: $v.employee.email.$invalid }"
              v-model="$v.employee.email.$model"
              required
            />
            <div v-if="$v.employee.email.$anyDirty && $v.employee.email.$invalid">
              <small class="form-text text-danger" v-if="!$v.employee.email.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.employee.email.pattern"
                v-text="$t('entity.validation.pattern', { pattern: 'Email' })"
              >
                This field should follow pattern for "Email".
              </small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('demoJhVueOAuthElasticSearch973App.employee.phoneNumber')"
              for="employee-phoneNumber"
              >Phone Number</label
            >
            <input
              type="text"
              class="form-control"
              name="phoneNumber"
              id="employee-phoneNumber"
              data-cy="phoneNumber"
              :class="{ valid: !$v.employee.phoneNumber.$invalid, invalid: $v.employee.phoneNumber.$invalid }"
              v-model="$v.employee.phoneNumber.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.employee.hireDate')" for="employee-hireDate"
              >Hire Date</label
            >
            <div class="d-flex">
              <input
                id="employee-hireDate"
                data-cy="hireDate"
                type="datetime-local"
                class="form-control"
                name="hireDate"
                :class="{ valid: !$v.employee.hireDate.$invalid, invalid: $v.employee.hireDate.$invalid }"
                :value="convertDateTimeFromServer($v.employee.hireDate.$model)"
                @change="updateInstantField('hireDate', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.employee.salary')" for="employee-salary"
              >Salary</label
            >
            <input
              type="number"
              class="form-control"
              name="salary"
              id="employee-salary"
              data-cy="salary"
              :class="{ valid: !$v.employee.salary.$invalid, invalid: $v.employee.salary.$invalid }"
              v-model.number="$v.employee.salary.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('demoJhVueOAuthElasticSearch973App.employee.commissionPct')"
              for="employee-commissionPct"
              >Commission Pct</label
            >
            <input
              type="number"
              class="form-control"
              name="commissionPct"
              id="employee-commissionPct"
              data-cy="commissionPct"
              :class="{ valid: !$v.employee.commissionPct.$invalid, invalid: $v.employee.commissionPct.$invalid }"
              v-model.number="$v.employee.commissionPct.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.employee.level')" for="employee-level"
              >Level</label
            >
            <input
              type="number"
              class="form-control"
              name="level"
              id="employee-level"
              data-cy="level"
              :class="{ valid: !$v.employee.level.$invalid, invalid: $v.employee.level.$invalid }"
              v-model.number="$v.employee.level.$model"
            />
            <div v-if="$v.employee.level.$anyDirty && $v.employee.level.$invalid">
              <small class="form-text text-danger" v-if="!$v.employee.level.min" v-text="$t('entity.validation.min', { min: 1 })">
                This field should be at least 1.
              </small>
              <small class="form-text text-danger" v-if="!$v.employee.level.max" v-text="$t('entity.validation.max', { max: 14 })">
                This field cannot be longer than 14 characters.
              </small>
              <small class="form-text text-danger" v-if="!$v.employee.level.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.employee.contract')" for="employee-contract"
              >Contract</label
            >
            <select
              class="form-control"
              name="contract"
              :class="{ valid: !$v.employee.contract.$invalid, invalid: $v.employee.contract.$invalid }"
              v-model="$v.employee.contract.$model"
              id="employee-contract"
              data-cy="contract"
            >
              <option
                v-for="contract in contractValues"
                :key="contract"
                v-bind:value="contract"
                v-bind:label="$t('demoJhVueOAuthElasticSearch973App.Contract.' + contract)"
              >
                {{ contract }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.employee.cv')" for="employee-cv">Cv</label>
            <div>
              <div v-if="employee.cv" class="form-text text-danger clearfix">
                <a class="pull-left" v-on:click="openFile(employee.cvContentType, employee.cv)" v-text="$t('entity.action.open')">open</a
                ><br />
                <span class="pull-left">{{ employee.cvContentType }}, {{ byteSize(employee.cv) }}</span>
                <button
                  type="button"
                  v-on:click="
                    employee.cv = null;
                    employee.cvContentType = null;
                  "
                  class="btn btn-secondary btn-xs pull-right"
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                </button>
              </div>
              <input
                type="file"
                ref="file_cv"
                id="file_cv"
                data-cy="cv"
                v-on:change="setFileData($event, employee, 'cv', false)"
                v-text="$t('entity.action.addblob')"
              />
            </div>
            <input
              type="hidden"
              class="form-control"
              name="cv"
              id="employee-cv"
              data-cy="cv"
              :class="{ valid: !$v.employee.cv.$invalid, invalid: $v.employee.cv.$invalid }"
              v-model="$v.employee.cv.$model"
            />
            <input type="hidden" class="form-control" name="cvContentType" id="employee-cvContentType" v-model="employee.cvContentType" />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.employee.manager')" for="employee-manager"
              >Manager</label
            >
            <select class="form-control" id="employee-manager" data-cy="manager" name="manager" v-model="employee.manager">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="employee.manager && employeeOption.id === employee.manager.id ? employee.manager : employeeOption"
                v-for="employeeOption in employees"
                :key="employeeOption.id"
              >
                {{ employeeOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.employee.department')" for="employee-department"
              >Department</label
            >
            <select class="form-control" id="employee-department" data-cy="department" name="department" v-model="employee.department">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  employee.department && departmentOption.id === employee.department.id ? employee.department : departmentOption
                "
                v-for="departmentOption in departments"
                :key="departmentOption.id"
              >
                {{ departmentOption.id }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.employee.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./employee-update.component.ts"></script>
