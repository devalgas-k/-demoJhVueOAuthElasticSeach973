/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ExpertiseUpdateComponent from '@/entities/expertise/expertise-update.vue';
import ExpertiseClass from '@/entities/expertise/expertise-update.component';
import ExpertiseService from '@/entities/expertise/expertise.service';

import ExperienceService from '@/entities/experience/experience.service';
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
  describe('Expertise Management Update Component', () => {
    let wrapper: Wrapper<ExpertiseClass>;
    let comp: ExpertiseClass;
    let expertiseServiceStub: SinonStubbedInstance<ExpertiseService>;

    beforeEach(() => {
      expertiseServiceStub = sinon.createStubInstance<ExpertiseService>(ExpertiseService);

      wrapper = shallowMount<ExpertiseClass>(ExpertiseUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          expertiseService: () => expertiseServiceStub,
          alertService: () => new AlertService(),

          experienceService: () =>
            sinon.createStubInstance<ExperienceService>(ExperienceService, {
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
        comp.expertise = entity;
        expertiseServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(expertiseServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.expertise = entity;
        expertiseServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(expertiseServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundExpertise = { id: 123 };
        expertiseServiceStub.find.resolves(foundExpertise);
        expertiseServiceStub.retrieve.resolves([foundExpertise]);

        // WHEN
        comp.beforeRouteEnter({ params: { expertiseId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.expertise).toBe(foundExpertise);
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
