<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="demoJhVueOAuthElasticSearch973App.subject.home.createOrEditLabel"
          data-cy="SubjectCreateUpdateHeading"
          v-text="$t('demoJhVueOAuthElasticSearch973App.subject.home.createOrEditLabel')"
        >
          Create or edit a Subject
        </h2>
        <div>
          <div class="form-group" v-if="subject.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="subject.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.subject.name')" for="subject-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="subject-name"
              data-cy="name"
              :class="{ valid: !$v.subject.name.$invalid, invalid: $v.subject.name.$invalid }"
              v-model="$v.subject.name.$model"
              required
            />
            <div v-if="$v.subject.name.$anyDirty && $v.subject.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.subject.name.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.subject.name.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 256 })"
              >
                This field cannot be longer than 256 characters.
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
            :disabled="$v.subject.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./subject-update.component.ts"></script>
