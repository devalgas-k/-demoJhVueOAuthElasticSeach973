import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { IEmployee } from '@/shared/model/employee.model';
import EmployeeService from './employee.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class EmployeeDetails extends mixins(JhiDataUtils) {
  @Inject('employeeService') private employeeService: () => EmployeeService;
  @Inject('alertService') private alertService: () => AlertService;

  public employee: IEmployee = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.employeeId) {
        vm.retrieveEmployee(to.params.employeeId);
      }
    });
  }

  public retrieveEmployee(employeeId) {
    this.employeeService()
      .find(employeeId)
      .then(res => {
        this.employee = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
