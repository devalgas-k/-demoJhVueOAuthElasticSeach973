import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { IExpertise } from '@/shared/model/expertise.model';
import ExpertiseService from './expertise.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ExpertiseDetails extends mixins(JhiDataUtils) {
  @Inject('expertiseService') private expertiseService: () => ExpertiseService;
  @Inject('alertService') private alertService: () => AlertService;

  public expertise: IExpertise = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.expertiseId) {
        vm.retrieveExpertise(to.params.expertiseId);
      }
    });
  }

  public retrieveExpertise(expertiseId) {
    this.expertiseService()
      .find(expertiseId)
      .then(res => {
        this.expertise = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
