<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="message">
        <h2 class="jh-entity-heading" data-cy="messageDetailsHeading">
          <span v-text="$t('demoJhVueOAuthElasticSearch973App.message.detail.title')">Message</span> {{ message.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.message.name')">Name</span>
          </dt>
          <dd>
            <span>{{ message.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.message.email')">Email</span>
          </dt>
          <dd>
            <span>{{ message.email }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.message.phone')">Phone</span>
          </dt>
          <dd>
            <span>{{ message.phone }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.message.message')">Message</span>
          </dt>
          <dd>
            <span>{{ message.message }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.message.file')">File</span>
          </dt>
          <dd>
            <div v-if="message.file">
              <a v-on:click="openFile(message.fileContentType, message.file)" v-text="$t('entity.action.open')">open</a>
              {{ message.fileContentType }}, {{ byteSize(message.file) }}
            </div>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.message.city')">City</span>
          </dt>
          <dd>
            <span>{{ message.city }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.message.otherCountry')">Other Country</span>
          </dt>
          <dd>
            <span>{{ message.otherCountry }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.message.date')">Date</span>
          </dt>
          <dd>
            <span v-if="message.date">{{ $d(Date.parse(message.date), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('demoJhVueOAuthElasticSearch973App.message.subject')">Subject</span>
          </dt>
          <dd>
            <div v-if="message.subject">
              <router-link :to="{ name: 'SubjectView', params: { subjectId: message.subject.id } }">{{ message.subject.name }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="message.id" :to="{ name: 'MessageEdit', params: { messageId: message.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./message-details.component.ts"></script>
