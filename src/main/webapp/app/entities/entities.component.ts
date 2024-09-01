import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import RegionService from './region/region.service';
import CountryService from './country/country.service';
import LocationService from './location/location.service';
import DepartmentService from './department/department.service';
import TaskService from './task/task.service';
import EmployeeService from './employee/employee.service';
import JobService from './job/job.service';
import JobHistoryService from './job-history/job-history.service';
import ExpertiseService from './expertise/expertise.service';
import ExperienceService from './experience/experience.service';
import MessageService from './message/message.service';
import SubjectService from './subject/subject.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('regionService') private regionService = () => new RegionService();
  @Provide('countryService') private countryService = () => new CountryService();
  @Provide('locationService') private locationService = () => new LocationService();
  @Provide('departmentService') private departmentService = () => new DepartmentService();
  @Provide('taskService') private taskService = () => new TaskService();
  @Provide('employeeService') private employeeService = () => new EmployeeService();
  @Provide('jobService') private jobService = () => new JobService();
  @Provide('jobHistoryService') private jobHistoryService = () => new JobHistoryService();
  @Provide('expertiseService') private expertiseService = () => new ExpertiseService();
  @Provide('experienceService') private experienceService = () => new ExperienceService();
  @Provide('messageService') private messageService = () => new MessageService();
  @Provide('subjectService') private subjectService = () => new SubjectService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}
