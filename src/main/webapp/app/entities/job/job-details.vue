<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="job">
        <h2 class="jh-entity-heading" data-cy="jobDetailsHeading">
          <span v-text="$t('demoJhVueOAuthElasticSearch973App.job.detail.title')">Job</span> {{ job.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.job.jobTitle')">Job Title</span>
          </dt>
          <dd>
            <span>{{ job.jobTitle }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.job.minSalary')">Min Salary</span>
          </dt>
          <dd>
            <span>{{ job.minSalary }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.job.maxSalary')">Max Salary</span>
          </dt>
          <dd>
            <span>{{ job.maxSalary }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.job.subSalary')">Sub Salary</span>
          </dt>
          <dd>
            <span>{{ job.subSalary }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.job.totalSalary')">Total Salary</span>
          </dt>
          <dd>
            <span>{{ job.totalSalary }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.job.date')">Date</span>
          </dt>
          <dd>
            <span>{{ job.date }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.job.codeCode')">Code Code</span>
          </dt>
          <dd>
            <span>{{ job.codeCode }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.job.profil')">Profil</span>
          </dt>
          <dd>
            <div v-if="job.profil">
              <a v-on:click="openFile(job.profilContentType, job.profil)">
                <img v-bind:src="'data:' + job.profilContentType + ';base64,' + job.profil" style="max-width: 100%" alt="job image" />
              </a>
              {{ job.profilContentType }}, {{ byteSize(job.profil) }}
            </div>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.job.task')">Task</span>
          </dt>
          <dd>
            <span v-for="(task, i) in job.tasks" :key="task.id"
              >{{ i > 0 ? ', ' : '' }}
              <router-link :to="{ name: 'TaskView', params: { taskId: task.id } }">{{ task.title }}</router-link>
            </span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.job.employee')">Employee</span>
          </dt>
          <dd>
            <div v-if="job.employee">
              <router-link :to="{ name: 'EmployeeView', params: { employeeId: job.employee.id } }">{{ job.employee.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="job.id" :to="{ name: 'JobEdit', params: { jobId: job.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./job-details.component.ts"></script>
