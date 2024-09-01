<template>
  <div>
    <h2 id="page-heading" data-cy="ExperienceHeading">
      <span v-text="$t('demoJhVueOAuthElasticSearch973App.experience.home.title')" id="experience-heading">Experiences</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('demoJhVueOAuthElasticSearch973App.experience.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'ExperienceCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-experience"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.experience.home.createLabel')"> Create a new Experience </span>
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
              v-bind:placeholder="$t('demoJhVueOAuthElasticSearch973App.experience.home.search')"
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
    <div class="alert alert-warning" v-if="!isFetching && experiences && experiences.length === 0">
      <span v-text="$t('demoJhVueOAuthElasticSearch973App.experience.home.notFound')">No experiences found</span>
    </div>
    <div class="table-responsive" v-if="experiences && experiences.length > 0">
      <table class="table table-striped" aria-describedby="experiences">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span v-text="$t('global.field.id')">ID</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('title')">
              <span v-text="$t('demoJhVueOAuthElasticSearch973App.experience.title')">Title</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'title'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('company')">
              <span v-text="$t('demoJhVueOAuthElasticSearch973App.experience.company')">Company</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'company'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('description')">
              <span v-text="$t('demoJhVueOAuthElasticSearch973App.experience.description')">Description</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'description'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('logoCompany')">
              <span v-text="$t('demoJhVueOAuthElasticSearch973App.experience.logoCompany')">Logo Company</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'logoCompany'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('inProgress')">
              <span v-text="$t('demoJhVueOAuthElasticSearch973App.experience.inProgress')">In Progress</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'inProgress'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('contract')">
              <span v-text="$t('demoJhVueOAuthElasticSearch973App.experience.contract')">Contract</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'contract'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('startDate')">
              <span v-text="$t('demoJhVueOAuthElasticSearch973App.experience.startDate')">Start Date</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'startDate'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('endDate')">
              <span v-text="$t('demoJhVueOAuthElasticSearch973App.experience.endDate')">End Date</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'endDate'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="experience in experiences" :key="experience.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ExperienceView', params: { experienceId: experience.id } }">{{ experience.id }}</router-link>
            </td>
            <td>{{ experience.title }}</td>
            <td>{{ experience.company }}</td>
            <td>{{ experience.description }}</td>
            <td>
              <a v-if="experience.logoCompany" v-on:click="openFile(experience.logoCompanyContentType, experience.logoCompany)">
                <img
                  v-bind:src="'data:' + experience.logoCompanyContentType + ';base64,' + experience.logoCompany"
                  style="max-height: 30px"
                  alt="experience image"
                />
              </a>
              <span v-if="experience.logoCompany">{{ experience.logoCompanyContentType }}, {{ byteSize(experience.logoCompany) }}</span>
            </td>
            <td>{{ experience.inProgress }}</td>
            <td v-text="$t('demoJhVueOAuthElasticSearch973App.Contract.' + experience.contract)">{{ experience.contract }}</td>
            <td>{{ experience.startDate }}</td>
            <td>{{ experience.endDate }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ExperienceView', params: { experienceId: experience.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ExperienceEdit', params: { experienceId: experience.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(experience)"
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
          id="demoJhVueOAuthElasticSearch973App.experience.delete.question"
          data-cy="experienceDeleteDialogHeading"
          v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-experience-heading" v-text="$t('demoJhVueOAuthElasticSearch973App.experience.delete.question', { id: removeId })">
          Are you sure you want to delete this Experience?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-experience"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeExperience()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="experiences && experiences.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./experience.component.ts"></script>
