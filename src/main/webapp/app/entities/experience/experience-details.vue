<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="experience">
        <h2 class="jh-entity-heading" data-cy="experienceDetailsHeading">
          <span v-text="$t('demoJhVueOAuthElasticSearch973App.experience.detail.title')">Experience</span> {{ experience.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.experience.title')">Title</span>
          </dt>
          <dd>
            <span>{{ experience.title }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.experience.company')">Company</span>
          </dt>
          <dd>
            <span>{{ experience.company }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.experience.description')">Description</span>
          </dt>
          <dd>
            <span>{{ experience.description }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.experience.logoCompany')">Logo Company</span>
          </dt>
          <dd>
            <div v-if="experience.logoCompany">
              <a v-on:click="openFile(experience.logoCompanyContentType, experience.logoCompany)">
                <img
                  v-bind:src="'data:' + experience.logoCompanyContentType + ';base64,' + experience.logoCompany"
                  style="max-width: 100%"
                  alt="experience image"
                />
              </a>
              {{ experience.logoCompanyContentType }}, {{ byteSize(experience.logoCompany) }}
            </div>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.experience.inProgress')">In Progress</span>
          </dt>
          <dd>
            <span>{{ experience.inProgress }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.experience.contract')">Contract</span>
          </dt>
          <dd>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.Contract.' + experience.contract)">{{ experience.contract }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.experience.startDate')">Start Date</span>
          </dt>
          <dd>
            <span>{{ experience.startDate }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.experience.endDate')">End Date</span>
          </dt>
          <dd>
            <span>{{ experience.endDate }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.experience.expertise')">Expertise</span>
          </dt>
          <dd>
            <span v-for="(expertise, i) in experience.expertise" :key="expertise.id"
              >{{ i > 0 ? ', ' : '' }}
              <router-link :to="{ name: 'ExpertiseView', params: { expertiseId: expertise.id } }">{{ expertise.title }}</router-link>
            </span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="experience.id"
          :to="{ name: 'ExperienceEdit', params: { experienceId: experience.id } }"
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

<script lang="ts" src="./experience-details.component.ts"></script>
