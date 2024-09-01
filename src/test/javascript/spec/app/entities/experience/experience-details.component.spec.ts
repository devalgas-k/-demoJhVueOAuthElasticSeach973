/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ExperienceDetailComponent from '@/entities/experience/experience-details.vue';
import ExperienceClass from '@/entities/experience/experience-details.component';
import ExperienceService from '@/entities/experience/experience.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Experience Management Detail Component', () => {
    let wrapper: Wrapper<ExperienceClass>;
    let comp: ExperienceClass;
    let experienceServiceStub: SinonStubbedInstance<ExperienceService>;

    beforeEach(() => {
      experienceServiceStub = sinon.createStubInstance<ExperienceService>(ExperienceService);

      wrapper = shallowMount<ExperienceClass>(ExperienceDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { experienceService: () => experienceServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundExperience = { id: 123 };
        experienceServiceStub.find.resolves(foundExperience);

        // WHEN
        comp.retrieveExperience(123);
        await comp.$nextTick();

        // THEN
        expect(comp.experience).toBe(foundExperience);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundExperience = { id: 123 };
        experienceServiceStub.find.resolves(foundExperience);

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
