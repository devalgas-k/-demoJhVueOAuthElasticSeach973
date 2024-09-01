<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="demoJhVueOAuthElasticSearch973App.experience.home.createOrEditLabel"
          data-cy="ExperienceCreateUpdateHeading"
          v-text="$t('demoJhVueOAuthElasticSearch973App.experience.home.createOrEditLabel')"
        >
          Create or edit a Experience
        </h2>
        <div>
          <div class="form-group" v-if="experience.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="experience.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.experience.title')" for="experience-title"
              >Title</label
            >
            <input
              type="text"
              class="form-control"
              name="title"
              id="experience-title"
              data-cy="title"
              :class="{ valid: !$v.experience.title.$invalid, invalid: $v.experience.title.$invalid }"
              v-model="$v.experience.title.$model"
              required
            />
            <div v-if="$v.experience.title.$anyDirty && $v.experience.title.$invalid">
              <small class="form-text text-danger" v-if="!$v.experience.title.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.experience.title.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 256 })"
              >
                This field cannot be longer than 256 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.experience.title.pattern"
                v-text="$t('entity.validation.pattern', { pattern: 'Title' })"
              >
                This field should follow pattern for "Title".
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.experience.company')" for="experience-company"
              >Company</label
            >
            <input
              type="text"
              class="form-control"
              name="company"
              id="experience-company"
              data-cy="company"
              :class="{ valid: !$v.experience.company.$invalid, invalid: $v.experience.company.$invalid }"
              v-model="$v.experience.company.$model"
              required
            />
            <div v-if="$v.experience.company.$anyDirty && $v.experience.company.$invalid">
              <small class="form-text text-danger" v-if="!$v.experience.company.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.experience.company.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 256 })"
              >
                This field cannot be longer than 256 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.experience.company.pattern"
                v-text="$t('entity.validation.pattern', { pattern: 'Company' })"
              >
                This field should follow pattern for "Company".
              </small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('demoJhVueOAuthElasticSearch973App.experience.description')"
              for="experience-description"
              >Description</label
            >
            <textarea
              class="form-control"
              name="description"
              id="experience-description"
              data-cy="description"
              :class="{ valid: !$v.experience.description.$invalid, invalid: $v.experience.description.$invalid }"
              v-model="$v.experience.description.$model"
            ></textarea>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('demoJhVueOAuthElasticSearch973App.experience.logoCompany')"
              for="experience-logoCompany"
              >Logo Company</label
            >
            <div>
              <img
                v-bind:src="'data:' + experience.logoCompanyContentType + ';base64,' + experience.logoCompany"
                style="max-height: 100px"
                v-if="experience.logoCompany"
                alt="experience image"
              />
              <div v-if="experience.logoCompany" class="form-text text-danger clearfix">
                <span class="pull-left">{{ experience.logoCompanyContentType }}, {{ byteSize(experience.logoCompany) }}</span>
                <button
                  type="button"
                  v-on:click="clearInputImage('logoCompany', 'logoCompanyContentType', 'file_logoCompany')"
                  class="btn btn-secondary btn-xs pull-right"
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                </button>
              </div>
              <input
                type="file"
                ref="file_logoCompany"
                id="file_logoCompany"
                data-cy="logoCompany"
                v-on:change="setFileData($event, experience, 'logoCompany', true)"
                accept="image/*"
                v-text="$t('entity.action.addimage')"
              />
            </div>
            <input
              type="hidden"
              class="form-control"
              name="logoCompany"
              id="experience-logoCompany"
              data-cy="logoCompany"
              :class="{ valid: !$v.experience.logoCompany.$invalid, invalid: $v.experience.logoCompany.$invalid }"
              v-model="$v.experience.logoCompany.$model"
            />
            <input
              type="hidden"
              class="form-control"
              name="logoCompanyContentType"
              id="experience-logoCompanyContentType"
              v-model="experience.logoCompanyContentType"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('demoJhVueOAuthElasticSearch973App.experience.inProgress')"
              for="experience-inProgress"
              >In Progress</label
            >
            <input
              type="checkbox"
              class="form-check"
              name="inProgress"
              id="experience-inProgress"
              data-cy="inProgress"
              :class="{ valid: !$v.experience.inProgress.$invalid, invalid: $v.experience.inProgress.$invalid }"
              v-model="$v.experience.inProgress.$model"
              required
            />
            <div v-if="$v.experience.inProgress.$anyDirty && $v.experience.inProgress.$invalid">
              <small class="form-text text-danger" v-if="!$v.experience.inProgress.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.experience.contract')" for="experience-contract"
              >Contract</label
            >
            <select
              class="form-control"
              name="contract"
              :class="{ valid: !$v.experience.contract.$invalid, invalid: $v.experience.contract.$invalid }"
              v-model="$v.experience.contract.$model"
              id="experience-contract"
              data-cy="contract"
              required
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
            <div v-if="$v.experience.contract.$anyDirty && $v.experience.contract.$invalid">
              <small class="form-text text-danger" v-if="!$v.experience.contract.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('demoJhVueOAuthElasticSearch973App.experience.startDate')"
              for="experience-startDate"
              >Start Date</label
            >
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="experience-startDate"
                  v-model="$v.experience.startDate.$model"
                  name="startDate"
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
                id="experience-startDate"
                data-cy="startDate"
                type="text"
                class="form-control"
                name="startDate"
                :class="{ valid: !$v.experience.startDate.$invalid, invalid: $v.experience.startDate.$invalid }"
                v-model="$v.experience.startDate.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.experience.endDate')" for="experience-endDate"
              >End Date</label
            >
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="experience-endDate"
                  v-model="$v.experience.endDate.$model"
                  name="endDate"
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
                id="experience-endDate"
                data-cy="endDate"
                type="text"
                class="form-control"
                name="endDate"
                :class="{ valid: !$v.experience.endDate.$invalid, invalid: $v.experience.endDate.$invalid }"
                v-model="$v.experience.endDate.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label v-text="$t('demoJhVueOAuthElasticSearch973App.experience.expertise')" for="experience-expertise">Expertise</label>
            <select
              class="form-control"
              id="experience-expertise"
              data-cy="expertise"
              multiple
              name="expertise"
              v-if="experience.expertise !== undefined"
              v-model="experience.expertise"
            >
              <option
                v-bind:value="getSelected(experience.expertise, expertiseOption)"
                v-for="expertiseOption in expertise"
                :key="expertiseOption.id"
              >
                {{ expertiseOption.title }}
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
            :disabled="$v.experience.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./experience-update.component.ts"></script>
