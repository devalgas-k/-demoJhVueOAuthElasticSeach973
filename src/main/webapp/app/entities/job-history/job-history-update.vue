<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="demoJhVueOAuthElasticSearch973App.jobHistory.home.createOrEditLabel"
          data-cy="JobHistoryCreateUpdateHeading"
          v-text="$t('demoJhVueOAuthElasticSearch973App.jobHistory.home.createOrEditLabel')"
        >
          Create or edit a JobHistory
        </h2>
        <div>
          <div class="form-group" v-if="jobHistory.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="jobHistory.id" readonly />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('demoJhVueOAuthElasticSearch973App.jobHistory.startDate')"
              for="job-history-startDate"
              >Start Date</label
            >
            <div class="d-flex">
              <input
                id="job-history-startDate"
                data-cy="startDate"
                type="datetime-local"
                class="form-control"
                name="startDate"
                :class="{ valid: !$v.jobHistory.startDate.$invalid, invalid: $v.jobHistory.startDate.$invalid }"
                :value="convertDateTimeFromServer($v.jobHistory.startDate.$model)"
                @change="updateInstantField('startDate', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.jobHistory.endDate')" for="job-history-endDate"
              >End Date</label
            >
            <div class="d-flex">
              <input
                id="job-history-endDate"
                data-cy="endDate"
                type="datetime-local"
                class="form-control"
                name="endDate"
                :class="{ valid: !$v.jobHistory.endDate.$invalid, invalid: $v.jobHistory.endDate.$invalid }"
                :value="convertDateTimeFromServer($v.jobHistory.endDate.$model)"
                @change="updateInstantField('endDate', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('demoJhVueOAuthElasticSearch973App.jobHistory.language')"
              for="job-history-language"
              >Language</label
            >
            <select
              class="form-control"
              name="language"
              :class="{ valid: !$v.jobHistory.language.$invalid, invalid: $v.jobHistory.language.$invalid }"
              v-model="$v.jobHistory.language.$model"
              id="job-history-language"
              data-cy="language"
            >
              <option
                v-for="language in languageValues"
                :key="language"
                v-bind:value="language"
                v-bind:label="$t('demoJhVueOAuthElasticSearch973App.Language.' + language)"
              >
                {{ language }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.jobHistory.file')" for="job-history-file"
              >File</label
            >
            <div>
              <div v-if="jobHistory.file" class="form-text text-danger clearfix">
                <a class="pull-left" v-on:click="openFile(jobHistory.fileContentType, jobHistory.file)" v-text="$t('entity.action.open')"
                  >open</a
                ><br />
                <span class="pull-left">{{ jobHistory.fileContentType }}, {{ byteSize(jobHistory.file) }}</span>
                <button
                  type="button"
                  v-on:click="
                    jobHistory.file = null;
                    jobHistory.fileContentType = null;
                  "
                  class="btn btn-secondary btn-xs pull-right"
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                </button>
              </div>
              <input
                type="file"
                ref="file_file"
                id="file_file"
                data-cy="file"
                v-on:change="setFileData($event, jobHistory, 'file', false)"
                v-text="$t('entity.action.addblob')"
              />
            </div>
            <input
              type="hidden"
              class="form-control"
              name="file"
              id="job-history-file"
              data-cy="file"
              :class="{ valid: !$v.jobHistory.file.$invalid, invalid: $v.jobHistory.file.$invalid }"
              v-model="$v.jobHistory.file.$model"
            />
            <input
              type="hidden"
              class="form-control"
              name="fileContentType"
              id="job-history-fileContentType"
              v-model="jobHistory.fileContentType"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.jobHistory.date')" for="job-history-date"
              >Date</label
            >
            <div class="d-flex">
              <input
                id="job-history-date"
                data-cy="date"
                type="datetime-local"
                class="form-control"
                name="date"
                :class="{ valid: !$v.jobHistory.date.$invalid, invalid: $v.jobHistory.date.$invalid }"
                :value="convertDateTimeFromServer($v.jobHistory.date.$model)"
                @change="updateZonedDateTimeField('date', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('demoJhVueOAuthElasticSearch973App.jobHistory.duration')"
              for="job-history-duration"
              >Duration</label
            >
            <input
              type="text"
              class="form-control"
              name="duration"
              id="job-history-duration"
              data-cy="duration"
              :class="{ valid: !$v.jobHistory.duration.$invalid, invalid: $v.jobHistory.duration.$invalid }"
              v-model="$v.jobHistory.duration.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.jobHistory.job')" for="job-history-job"
              >Job</label
            >
            <select class="form-control" id="job-history-job" data-cy="job" name="job" v-model="jobHistory.job">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="jobHistory.job && jobOption.id === jobHistory.job.id ? jobHistory.job : jobOption"
                v-for="jobOption in jobs"
                :key="jobOption.id"
              >
                {{ jobOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('demoJhVueOAuthElasticSearch973App.jobHistory.department')"
              for="job-history-department"
              >Department</label
            >
            <select class="form-control" id="job-history-department" data-cy="department" name="department" v-model="jobHistory.department">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  jobHistory.department && departmentOption.id === jobHistory.department.id ? jobHistory.department : departmentOption
                "
                v-for="departmentOption in departments"
                :key="departmentOption.id"
              >
                {{ departmentOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('demoJhVueOAuthElasticSearch973App.jobHistory.employee')"
              for="job-history-employee"
              >Employee</label
            >
            <select class="form-control" id="job-history-employee" data-cy="employee" name="employee" v-model="jobHistory.employee">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="jobHistory.employee && employeeOption.id === jobHistory.employee.id ? jobHistory.employee : employeeOption"
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
            :disabled="$v.jobHistory.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./job-history-update.component.ts"></script>
