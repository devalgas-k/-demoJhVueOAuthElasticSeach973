import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { required, maxLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import ExpertiseService from '@/entities/expertise/expertise.service';
import { IExpertise } from '@/shared/model/expertise.model';

import { IExperience, Experience } from '@/shared/model/experience.model';
import ExperienceService from './experience.service';
import { Contract } from '@/shared/model/enumerations/contract.model';

const validations: any = {
  experience: {
    title: {
      required,
      maxLength: maxLength(256),
    },
    company: {
      required,
      maxLength: maxLength(256),
    },
    description: {},
    logoCompany: {},
    inProgress: {
      required,
    },
    contract: {
      required,
    },
    startDate: {},
    endDate: {},
  },
};

@Component({
  validations,
})
export default class ExperienceUpdate extends mixins(JhiDataUtils) {
  @Inject('experienceService') private experienceService: () => ExperienceService;
  @Inject('alertService') private alertService: () => AlertService;

  public experience: IExperience = new Experience();

  @Inject('expertiseService') private expertiseService: () => ExpertiseService;

  public expertise: IExpertise[] = [];
  public contractValues: string[] = Object.keys(Contract);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.experienceId) {
        vm.retrieveExperience(to.params.experienceId);
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
    this.experience.expertise = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.experience.id) {
      this.experienceService()
        .update(this.experience)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('demoJhVueOAuthElasticSearch973App.experience.updated', { param: param.id });
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
      this.experienceService()
        .create(this.experience)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('demoJhVueOAuthElasticSearch973App.experience.created', { param: param.id });
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

  public retrieveExperience(experienceId): void {
    this.experienceService()
      .find(experienceId)
      .then(res => {
        this.experience = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public clearInputImage(field, fieldContentType, idInput): void {
    if (this.experience && field && fieldContentType) {
      if (Object.prototype.hasOwnProperty.call(this.experience, field)) {
        this.experience[field] = null;
      }
      if (Object.prototype.hasOwnProperty.call(this.experience, fieldContentType)) {
        this.experience[fieldContentType] = null;
      }
      if (idInput) {
        (<any>this).$refs[idInput] = null;
      }
    }
  }

  public initRelationships(): void {
    this.expertiseService()
      .retrieve()
      .then(res => {
        this.expertise = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      return selectedVals.find(value => option.id === value.id) ?? option;
    }
    return option;
  }
}
