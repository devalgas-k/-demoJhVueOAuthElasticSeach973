<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="demoJhVueOAuthElasticSearch973App.job.home.createOrEditLabel"
          data-cy="JobCreateUpdateHeading"
          v-text="$t('demoJhVueOAuthElasticSearch973App.job.home.createOrEditLabel')"
        >
          Create or edit a Job
        </h2>
        <div>
          <div class="form-group" v-if="job.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="job.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.job.jobTitle')" for="job-jobTitle"
              >Job Title</label
            >
            <input
              type="text"
              class="form-control"
              name="jobTitle"
              id="job-jobTitle"
              data-cy="jobTitle"
              :class="{ valid: !$v.job.jobTitle.$invalid, invalid: $v.job.jobTitle.$invalid }"
              v-model="$v.job.jobTitle.$model"
              required
            />
            <div v-if="$v.job.jobTitle.$anyDirty && $v.job.jobTitle.$invalid">
              <small class="form-text text-danger" v-if="!$v.job.jobTitle.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.job.minSalary')" for="job-minSalary"
              >Min Salary</label
            >
            <input
              type="number"
              class="form-control"
              name="minSalary"
              id="job-minSalary"
              data-cy="minSalary"
              :class="{ valid: !$v.job.minSalary.$invalid, invalid: $v.job.minSalary.$invalid }"
              v-model.number="$v.job.minSalary.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.job.maxSalary')" for="job-maxSalary"
              >Max Salary</label
            >
            <input
              type="number"
              class="form-control"
              name="maxSalary"
              id="job-maxSalary"
              data-cy="maxSalary"
              :class="{ valid: !$v.job.maxSalary.$invalid, invalid: $v.job.maxSalary.$invalid }"
              v-model.number="$v.job.maxSalary.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.job.subSalary')" for="job-subSalary"
              >Sub Salary</label
            >
            <input
              type="number"
              class="form-control"
              name="subSalary"
              id="job-subSalary"
              data-cy="subSalary"
              :class="{ valid: !$v.job.subSalary.$invalid, invalid: $v.job.subSalary.$invalid }"
              v-model.number="$v.job.subSalary.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.job.totalSalary')" for="job-totalSalary"
              >Total Salary</label
            >
            <input
              type="number"
              class="form-control"
              name="totalSalary"
              id="job-totalSalary"
              data-cy="totalSalary"
              :class="{ valid: !$v.job.totalSalary.$invalid, invalid: $v.job.totalSalary.$invalid }"
              v-model.number="$v.job.totalSalary.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.job.date')" for="job-date">Date</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="job-date"
                  v-model="$v.job.date.$model"
                  name="date"
                  class="form-control"
                  :locale="currentLanguage"
                  button-only
                  today-button
                  reset-button
                  close-button
                >
                </b-form-datepicker>
              </b-input-group-prepend>
              <b-form-input
                id="job-date"
                data-cy="date"
                type="text"
                class="form-control"
                name="date"
                :class="{ valid: !$v.job.date.$invalid, invalid: $v.job.date.$invalid }"
                v-model="$v.job.date.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.job.codeCode')" for="job-codeCode"
              >Code Code</label
            >
            <input
              type="text"
              class="form-control"
              name="codeCode"
              id="job-codeCode"
              data-cy="codeCode"
              :class="{ valid: !$v.job.codeCode.$invalid, invalid: $v.job.codeCode.$invalid }"
              v-model="$v.job.codeCode.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.job.profil')" for="job-profil">Profil</label>
            <div>
              <img
                v-bind:src="'data:' + job.profilContentType + ';base64,' + job.profil"
                style="max-height: 100px"
                v-if="job.profil"
                alt="job image"
              />
              <div v-if="job.profil" class="form-text text-danger clearfix">
                <span class="pull-left">{{ job.profilContentType }}, {{ byteSize(job.profil) }}</span>
                <button
                  type="button"
                  v-on:click="clearInputImage('profil', 'profilContentType', 'file_profil')"
                  class="btn btn-secondary btn-xs pull-right"
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                </button>
              </div>
              <input
                type="file"
                ref="file_profil"
                id="file_profil"
                data-cy="profil"
                v-on:change="setFileData($event, job, 'profil', true)"
                accept="image/*"
                v-text="$t('entity.action.addimage')"
              />
            </div>
            <input
              type="hidden"
              class="form-control"
              name="profil"
              id="job-profil"
              data-cy="profil"
              :class="{ valid: !$v.job.profil.$invalid, invalid: $v.job.profil.$invalid }"
              v-model="$v.job.profil.$model"
              required
            />
            <input type="hidden" class="form-control" name="profilContentType" id="job-profilContentType" v-model="job.profilContentType" />
            <div v-if="$v.job.profil.$anyDirty && $v.job.profil.$invalid">
              <small class="form-text text-danger" v-if="!$v.job.profil.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label v-text="$t('demoJhVueOAuthElasticSearch973App.job.task')" for="job-task">Task</label>
            <select
              class="form-control"
              id="job-tasks"
              data-cy="task"
              multiple
              name="task"
              v-if="job.tasks !== undefined"
              v-model="job.tasks"
            >
              <option v-bind:value="getSelected(job.tasks, taskOption)" v-for="taskOption in tasks" :key="taskOption.id">
                {{ taskOption.title }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.job.employee')" for="job-employee"
              >Employee</label
            >
            <select class="form-control" id="job-employee" data-cy="employee" name="employee" v-model="job.employee">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="job.employee && employeeOption.id === job.employee.id ? job.employee : employeeOption"
                v-for="employeeOption in employees"
                :key="employeeOption.id"
              >
                {{ employeeOption.id }}
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
            :disabled="$v.job.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./job-update.component.ts"></script>
