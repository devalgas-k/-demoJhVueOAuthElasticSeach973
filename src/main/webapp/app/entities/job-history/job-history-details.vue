<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="jobHistory">
        <h2 class="jh-entity-heading" data-cy="jobHistoryDetailsHeading">
          <span v-text="$t('demoJhVueOAuthElasticSearch973App.jobHistory.detail.title')">JobHistory</span> {{ jobHistory.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.jobHistory.startDate')">Start Date</span>
          </dt>
          <dd>
            <span v-if="jobHistory.startDate">{{ $d(Date.parse(jobHistory.startDate), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.jobHistory.endDate')">End Date</span>
          </dt>
          <dd>
            <span v-if="jobHistory.endDate">{{ $d(Date.parse(jobHistory.endDate), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.jobHistory.language')">Language</span>
          </dt>
          <dd>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.Language.' + jobHistory.language)">{{ jobHistory.language }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.jobHistory.file')">File</span>
          </dt>
          <dd>
            <div v-if="jobHistory.file">
              <a v-on:click="openFile(jobHistory.fileContentType, jobHistory.file)" v-text="$t('entity.action.open')">open</a>
              {{ jobHistory.fileContentType }}, {{ byteSize(jobHistory.file) }}
            </div>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.jobHistory.date')">Date</span>
          </dt>
          <dd>
            <span v-if="jobHistory.date">{{ $d(Date.parse(jobHistory.date), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.jobHistory.duration')">Duration</span>
          </dt>
          <dd>
            <span>{{ jobHistory.duration | duration }} ({{ jobHistory.duration }})</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.jobHistory.job')">Job</span>
          </dt>
          <dd>
            <div v-if="jobHistory.job">
              <router-link :to="{ name: 'JobView', params: { jobId: jobHistory.job.id } }">{{ jobHistory.job.id }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.jobHistory.department')">Department</span>
          </dt>
          <dd>
            <div v-if="jobHistory.department">
              <router-link :to="{ name: 'DepartmentView', params: { departmentId: jobHistory.department.id } }">{{
                jobHistory.department.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.jobHistory.employee')">Employee</span>
          </dt>
          <dd>
            <div v-if="jobHistory.employee">
              <router-link :to="{ name: 'EmployeeView', params: { employeeId: jobHistory.employee.id } }">{{
                jobHistory.employee.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="jobHistory.id"
          :to="{ name: 'JobHistoryEdit', params: { jobHistoryId: jobHistory.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./job-history-details.component.ts"></script>
