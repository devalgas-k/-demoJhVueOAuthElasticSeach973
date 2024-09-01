/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ExperienceUpdateComponent from '@/entities/experience/experience-update.vue';
import ExperienceClass from '@/entities/experience/experience-update.component';
import ExperienceService from '@/entities/experience/experience.service';

import ExpertiseService from '@/entities/expertise/expertise.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.use(ToastPlugin);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('Experience Management Update Component', () => {
    let wrapper: Wrapper<ExperienceClass>;
    let comp: ExperienceClass;
    let experienceServiceStub: SinonStubbedInstance<ExperienceService>;

    beforeEach(() => {
      experienceServiceStub = sinon.createStubInstance<ExperienceService>(ExperienceService);

      wrapper = shallowMount<ExperienceClass>(ExperienceUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          experienceService: () => experienceServiceStub,
          alertService: () => new AlertService(),

          expertiseService: () =>
            sinon.createStubInstance<ExpertiseService>(ExpertiseService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.experience = entity;
        experienceServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(experienceServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.experience = entity;
        experienceServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(experienceServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundExperience = { id: 123 };
        experienceServiceStub.find.resolves(foundExperience);
        experienceServiceStub.retrieve.resolves([foundExperience]);

        // WHEN
        comp.beforeRouteEnter({ params: { experienceId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.experience).toBe(foundExperience);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
