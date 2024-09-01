<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="demoJhVueOAuthElasticSearch973App.message.home.createOrEditLabel"
          data-cy="MessageCreateUpdateHeading"
          v-text="$t('demoJhVueOAuthElasticSearch973App.message.home.createOrEditLabel')"
        >
          Create or edit a Message
        </h2>
        <div>
          <div class="form-group" v-if="message.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="message.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.message.name')" for="message-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="message-name"
              data-cy="name"
              :class="{ valid: !$v.message.name.$invalid, invalid: $v.message.name.$invalid }"
              v-model="$v.message.name.$model"
              required
            />
            <div v-if="$v.message.name.$anyDirty && $v.message.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.message.name.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.message.name.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 256 })"
              >
                This field cannot be longer than 256 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.message.email')" for="message-email"
              >Email</label
            >
            <input
              type="text"
              class="form-control"
              name="email"
              id="message-email"
              data-cy="email"
              :class="{ valid: !$v.message.email.$invalid, invalid: $v.message.email.$invalid }"
              v-model="$v.message.email.$model"
              required
            />
            <div v-if="$v.message.email.$anyDirty && $v.message.email.$invalid">
              <small class="form-text text-danger" v-if="!$v.message.email.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.message.email.pattern"
                v-text="$t('entity.validation.pattern', { pattern: 'Email' })"
              >
                This field should follow pattern for "Email".
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.message.phone')" for="message-phone"
              >Phone</label
            >
            <input
              type="text"
              class="form-control"
              name="phone"
              id="message-phone"
              data-cy="phone"
              :class="{ valid: !$v.message.phone.$invalid, invalid: $v.message.phone.$invalid }"
              v-model="$v.message.phone.$model"
            />
            <div v-if="$v.message.phone.$anyDirty && $v.message.phone.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.message.phone.pattern"
                v-text="$t('entity.validation.pattern', { pattern: 'Phone' })"
              >
                This field should follow pattern for "Phone".
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.message.message')" for="message-message"
              >Message</label
            >
            <textarea
              class="form-control"
              name="message"
              id="message-message"
              data-cy="message"
              :class="{ valid: !$v.message.message.$invalid, invalid: $v.message.message.$invalid }"
              v-model="$v.message.message.$model"
            ></textarea>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.message.file')" for="message-file">File</label>
            <div>
              <div v-if="message.file" class="form-text text-danger clearfix">
                <a class="pull-left" v-on:click="openFile(message.fileContentType, message.file)" v-text="$t('entity.action.open')">open</a
                ><br />
                <span class="pull-left">{{ message.fileContentType }}, {{ byteSize(message.file) }}</span>
                <button
                  type="button"
                  v-on:click="
                    message.file = null;
                    message.fileContentType = null;
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
                v-on:change="setFileData($event, message, 'file', false)"
                v-text="$t('entity.action.addblob')"
              />
            </div>
            <input
              type="hidden"
              class="form-control"
              name="file"
              id="message-file"
              data-cy="file"
              :class="{ valid: !$v.message.file.$invalid, invalid: $v.message.file.$invalid }"
              v-model="$v.message.file.$model"
            />
            <input
              type="hidden"
              class="form-control"
              name="fileContentType"
              id="message-fileContentType"
              v-model="message.fileContentType"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.message.city')" for="message-city">City</label>
            <input
              type="text"
              class="form-control"
              name="city"
              id="message-city"
              data-cy="city"
              :class="{ valid: !$v.message.city.$invalid, invalid: $v.message.city.$invalid }"
              v-model="$v.message.city.$model"
            />
            <div v-if="$v.message.city.$anyDirty && $v.message.city.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.message.city.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 256 })"
              >
                This field cannot be longer than 256 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('demoJhVueOAuthElasticSearch973App.message.otherCountry')"
              for="message-otherCountry"
              >Other Country</label
            >
            <input
              type="text"
              class="form-control"
              name="otherCountry"
              id="message-otherCountry"
              data-cy="otherCountry"
              :class="{ valid: !$v.message.otherCountry.$invalid, invalid: $v.message.otherCountry.$invalid }"
              v-model="$v.message.otherCountry.$model"
            />
            <div v-if="$v.message.otherCountry.$anyDirty && $v.message.otherCountry.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.message.otherCountry.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 256 })"
              >
                This field cannot be longer than 256 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.message.date')" for="message-date">Date</label>
            <div class="d-flex">
              <input
                id="message-date"
                data-cy="date"
                type="datetime-local"
                class="form-control"
                name="date"
                :class="{ valid: !$v.message.date.$invalid, invalid: $v.message.date.$invalid }"
                :value="convertDateTimeFromServer($v.message.date.$model)"
                @change="updateZonedDateTimeField('date', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('demoJhVueOAuthElasticSearch973App.message.subject')" for="message-subject"
              >Subject</label
            >
            <select class="form-control" id="message-subject" data-cy="subject" name="subject" v-model="message.subject" required>
              <option v-if="!message.subject" v-bind:value="null" selected></option>
              <option
                v-bind:value="message.subject && subjectOption.id === message.subject.id ? message.subject : subjectOption"
                v-for="subjectOption in subjects"
                :key="subjectOption.id"
              >
                {{ subjectOption.name }}
              </option>
            </select>
          </div>
          <div v-if="$v.message.subject.$anyDirty && $v.message.subject.$invalid">
            <small class="form-text text-danger" v-if="!$v.message.subject.required" v-text="$t('entity.validation.required')">
              This field is required.
            </small>
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
            :disabled="$v.message.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./message-update.component.ts"></script>
