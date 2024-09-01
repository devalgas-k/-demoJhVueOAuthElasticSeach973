<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="demoJhVueOAuthElasticSearch973App.expertise.home.createOrEditLabel"
          data-cy="ExpertiseCreateUpdateHeading"
          v-text="$t('demoJhVueOAuthElasticSearch973App.expertise.home.createOrEditLabel')"
        >
          Create or edit a Expertise
        </h2>
        <div>
          <div class="form-group" v-if="expertise.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="expertise.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.expertise.title')" for="expertise-title"
              >Title</label
            >
            <input
              type="text"
              class="form-control"
              name="title"
              id="expertise-title"
              data-cy="title"
              :class="{ valid: !$v.expertise.title.$invalid, invalid: $v.expertise.title.$invalid }"
              v-model="$v.expertise.title.$model"
              required
            />
            <div v-if="$v.expertise.title.$anyDirty && $v.expertise.title.$invalid">
              <small class="form-text text-danger" v-if="!$v.expertise.title.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.expertise.title.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 256 })"
              >
                This field cannot be longer than 256 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.expertise.title.pattern"
                v-text="$t('entity.validation.pattern', { pattern: 'Title' })"
              >
                This field should follow pattern for "Title".
              </small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('demoJhVueOAuthElasticSearch973App.expertise.description')"
              for="expertise-description"
              >Description</label
            >
            <textarea
              class="form-control"
              name="description"
              id="expertise-description"
              data-cy="description"
              :class="{ valid: !$v.expertise.description.$invalid, invalid: $v.expertise.description.$invalid }"
              v-model="$v.expertise.description.$model"
            ></textarea>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.expertise.level')" for="expertise-level"
              >Level</label
            >
            <input
              type="number"
              class="form-control"
              name="level"
              id="expertise-level"
              data-cy="level"
              :class="{ valid: !$v.expertise.level.$invalid, invalid: $v.expertise.level.$invalid }"
              v-model.number="$v.expertise.level.$model"
            />
            <div v-if="$v.expertise.level.$anyDirty && $v.expertise.level.$invalid">
              <small class="form-text text-danger" v-if="!$v.expertise.level.min" v-text="$t('entity.validation.min', { min: 20 })">
                This field should be at least 20.
              </small>
              <small class="form-text text-danger" v-if="!$v.expertise.level.max" v-text="$t('entity.validation.max', { max: 100 })">
                This field cannot be longer than 100 characters.
              </small>
              <small class="form-text text-danger" v-if="!$v.expertise.level.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
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
            :disabled="$v.expertise.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./expertise-update.component.ts"></script>
