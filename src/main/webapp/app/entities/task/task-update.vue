<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="demoJhVueOAuthElasticSearch973App.task.home.createOrEditLabel"
          data-cy="TaskCreateUpdateHeading"
          v-text="$t('demoJhVueOAuthElasticSearch973App.task.home.createOrEditLabel')"
        >
          Create or edit a Task
        </h2>
        <div>
          <div class="form-group" v-if="task.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="task.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.task.title')" for="task-title">Title</label>
            <input
              type="text"
              class="form-control"
              name="title"
              id="task-title"
              data-cy="title"
              :class="{ valid: !$v.task.title.$invalid, invalid: $v.task.title.$invalid }"
              v-model="$v.task.title.$model"
              required
            />
            <div v-if="$v.task.title.$anyDirty && $v.task.title.$invalid">
              <small class="form-text text-danger" v-if="!$v.task.title.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.task.title.maxLength" v-text="$t('entity.validation.maxlength', { max: 256 })">
                This field cannot be longer than 256 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.task.title.pattern"
                v-text="$t('entity.validation.pattern', { pattern: 'Title' })"
              >
                This field should follow pattern for "Title".
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.task.description')" for="task-description"
              >Description</label
            >
            <textarea
              class="form-control"
              name="description"
              id="task-description"
              data-cy="description"
              :class="{ valid: !$v.task.description.$invalid, invalid: $v.task.description.$invalid }"
              v-model="$v.task.description.$model"
            ></textarea>
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
            :disabled="$v.task.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./task-update.component.ts"></script>
