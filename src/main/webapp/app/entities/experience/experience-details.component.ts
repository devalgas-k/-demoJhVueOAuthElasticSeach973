import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { IExperience } from '@/shared/model/experience.model';
import ExperienceService from './experience.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ExperienceDetails extends mixins(JhiDataUtils) {
  @Inject('experienceService') private experienceService: () => ExperienceService;
  @Inject('alertService') private alertService: () => AlertService;

  public experience: IExperience = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.experienceId) {
        vm.retrieveExperience(to.params.experienceId);
      }
    });
  }

  public retrieveExperience(experienceId) {
    this.experienceService()
      .find(experienceId)
      .then(res => {
        this.experience = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
