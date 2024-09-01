import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { required, maxLength, numeric, minValue, maxValue } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import ExperienceService from '@/entities/experience/experience.service';
import { IExperience } from '@/shared/model/experience.model';

import { IExpertise, Expertise } from '@/shared/model/expertise.model';
import ExpertiseService from './expertise.service';

const validations: any = {
  expertise: {
    title: {
      required,
      maxLength: maxLength(256),
    },
    description: {},
    level: {
      numeric,
      min: minValue(20),
      max: maxValue(100),
    },
  },
};

@Component({
  validations,
})
export default class ExpertiseUpdate extends mixins(JhiDataUtils) {
  @Inject('expertiseService') private expertiseService: () => ExpertiseService;
  @Inject('alertService') private alertService: () => AlertService;

  public expertise: IExpertise = new Expertise();

  @Inject('experienceService') private experienceService: () => ExperienceService;

  public experiences: IExperience[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.expertiseId) {
        vm.retrieveExpertise(to.params.expertiseId);
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
    if (this.expertise.id) {
      this.expertiseService()
        .update(this.expertise)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('demoJhVueOAuthElasticSearch973App.expertise.updated', { param: param.id });
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
      this.expertiseService()
        .create(this.expertise)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('demoJhVueOAuthElasticSearch973App.expertise.created', { param: param.id });
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

  public retrieveExpertise(expertiseId): void {
    this.expertiseService()
      .find(expertiseId)
      .then(res => {
        this.expertise = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.experienceService()
      .retrieve()
      .then(res => {
        this.experiences = res.data;
      });
  }
}
