<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="expertise">
        <h2 class="jh-entity-heading" data-cy="expertiseDetailsHeading">
          <span v-text="$t('demoJhVueOAuthElasticSearch973App.expertise.detail.title')">Expertise</span> {{ expertise.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.expertise.title')">Title</span>
          </dt>
          <dd>
            <span>{{ expertise.title }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.expertise.description')">Description</span>
          </dt>
          <dd>
            <span>{{ expertise.description }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.expertise.level')">Level</span>
          </dt>
          <dd>
            <span>{{ expertise.level }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="expertise.id"
          :to="{ name: 'ExpertiseEdit', params: { expertiseId: expertise.id } }"
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

<script lang="ts" src="./expertise-details.component.ts"></script>
