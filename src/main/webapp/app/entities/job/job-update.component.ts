import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import TaskService from '@/entities/task/task.service';
import { ITask } from '@/shared/model/task.model';

import EmployeeService from '@/entities/employee/employee.service';
import { IEmployee } from '@/shared/model/employee.model';

import { IJob, Job } from '@/shared/model/job.model';
import JobService from './job.service';

const validations: any = {
  job: {
    jobTitle: {
      required,
    },
    minSalary: {},
    maxSalary: {},
    subSalary: {},
    totalSalary: {},
    date: {},
    codeCode: {},
    profil: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class JobUpdate extends mixins(JhiDataUtils) {
  @Inject('jobService') private jobService: () => JobService;
  @Inject('alertService') private alertService: () => AlertService;

  public job: IJob = new Job();

  @Inject('taskService') private taskService: () => TaskService;

  public tasks: ITask[] = [];

  @Inject('employeeService') private employeeService: () => EmployeeService;

  public employees: IEmployee[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.jobId) {
        vm.retrieveJob(to.params.jobId);
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
    this.job.tasks = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.job.id) {
      this.jobService()
        .update(this.job)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('demoJhVueOAuthElasticSearch973App.job.updated', { param: param.id });
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
      this.jobService()
        .create(this.job)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('demoJhVueOAuthElasticSearch973App.job.created', { param: param.id });
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

  public retrieveJob(jobId): void {
    this.jobService()
      .find(jobId)
      .then(res => {
        this.job = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public clearInputImage(field, fieldContentType, idInput): void {
    if (this.job && field && fieldContentType) {
      if (Object.prototype.hasOwnProperty.call(this.job, field)) {
        this.job[field] = null;
      }
      if (Object.prototype.hasOwnProperty.call(this.job, fieldContentType)) {
        this.job[fieldContentType] = null;
      }
      if (idInput) {
        (<any>this).$refs[idInput] = null;
      }
    }
  }

  public initRelationships(): void {
    this.taskService()
      .retrieve()
      .then(res => {
        this.tasks = res.data;
      });
    this.employeeService()
      .retrieve()
      .then(res => {
        this.employees = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      return selectedVals.find(value => option.id === value.id) ?? option;
    }
    return option;
  }
}
