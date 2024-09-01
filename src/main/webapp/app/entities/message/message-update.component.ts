import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { required, maxLength } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';

import SubjectService from '@/entities/subject/subject.service';
import { ISubject } from '@/shared/model/subject.model';

import { IMessage, Message } from '@/shared/model/message.model';
import MessageService from './message.service';

const validations: any = {
  message: {
    name: {
      required,
      maxLength: maxLength(256),
    },
    email: {
      required,
    },
    phone: {},
    message: {},
    file: {},
    city: {
      maxLength: maxLength(256),
    },
    otherCountry: {
      maxLength: maxLength(256),
    },
    date: {},
    subject: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class MessageUpdate extends mixins(JhiDataUtils) {
  @Inject('messageService') private messageService: () => MessageService;
  @Inject('alertService') private alertService: () => AlertService;

  public message: IMessage = new Message();

  @Inject('subjectService') private subjectService: () => SubjectService;

  public subjects: ISubject[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.messageId) {
        vm.retrieveMessage(to.params.messageId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.message.id) {
      this.messageService()
        .update(this.message)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('demoJhVueOAuthElasticSearch973App.message.updated', { param: param.id });
          return (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.messageService()
        .create(this.message)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('demoJhVueOAuthElasticSearch973App.message.created', { param: param.id });
          (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date && dayjs(date).isValid()) {
      return dayjs(date).format(DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.message[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.message[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.message[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.message[field] = null;
    }
  }

  public retrieveMessage(messageId): void {
    this.messageService()
      .find(messageId)
      .then(res => {
        res.date = new Date(res.date);
        this.message = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.subjectService()
      .retrieve()
      .then(res => {
        this.subjects = res.data;
      });
  }
}
