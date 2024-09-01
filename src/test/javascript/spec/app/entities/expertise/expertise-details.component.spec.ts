/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ExpertiseDetailComponent from '@/entities/expertise/expertise-details.vue';
import ExpertiseClass from '@/entities/expertise/expertise-details.component';
import ExpertiseService from '@/entities/expertise/expertise.service';
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
  describe('Expertise Management Detail Component', () => {
    let wrapper: Wrapper<ExpertiseClass>;
    let comp: ExpertiseClass;
    let expertiseServiceStub: SinonStubbedInstance<ExpertiseService>;

    beforeEach(() => {
      expertiseServiceStub = sinon.createStubInstance<ExpertiseService>(ExpertiseService);

      wrapper = shallowMount<ExpertiseClass>(ExpertiseDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { expertiseService: () => expertiseServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundExpertise = { id: 123 };
        expertiseServiceStub.find.resolves(foundExpertise);

        // WHEN
        comp.retrieveExpertise(123);
        await comp.$nextTick();

        // THEN
        expect(comp.expertise).toBe(foundExpertise);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundExpertise = { id: 123 };
        expertiseServiceStub.find.resolves(foundExpertise);

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
