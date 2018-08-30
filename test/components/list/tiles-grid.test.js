import { shallowMount, mount, RouterLinkStub } from '@vue/test-utils'
import NuxtLink from '@/.nuxt/components/nuxt-link'
import TilesGrid from '@/components/list/tiles-grid'
import LinkedImage from '@/components/core/LinkedImage'
import Button from '@/components/core/Button'
import data from '../../fakeData/tiles-grid.data'

global.process.browser = true;
jest.useFakeTimers();

TilesGrid.components = TilesGrid.components || {};
TilesGrid.components.NuxtLink = NuxtLink;
LinkedImage.components = LinkedImage.components || {}
LinkedImage.components.NuxtLink = NuxtLink
Button.components = Button.components || {}
Button.components.NuxtLink = NuxtLink

const createWrapper = (propsData, mountType=shallowMount) => {
    return mountType(TilesGrid, {
        attachToDocument: true,
        propsData,
        stubs: {
            RouterLink: RouterLinkStub
        }
    })
}

describe("tiles-grid.vue", () => {
    let wrapper, items = data.tilesGrid;;
    beforeEach(() => {
        Object.defineProperty(Image.prototype, 'complete',  {
            value: true
        });
    });

    afterEach(() => {
        wrapper.destroy();

        Object.defineProperty(Image.prototype, 'complete',  {
            value: false
        });

        jest.clearAllTimers();
    });

    it('should render tiles-grid 2 columns', () => {
        wrapper = createWrapper({
            list: items.filter((item, index) => index < 3)
        });
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('should render tiles-grid 2 colummns with thumbnailMode', () => {
        wrapper = createWrapper({
            list: items.filter((item, index) => index < 2),
            thumbnailMode: true
        });
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('should render tiles-grid  3 columns', () => {
        wrapper = createWrapper({
            list: items.filter((item, index) => index < 3),
            numColumns: 3
        });
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('should firing imageReady', () => {
        wrapper = createWrapper({
            list: items.filter((item, index) => index < 3)
        }, mount);

        let imageReady = wrapper.vm.imageReady;
        let spy = jest.fn((e, index) => {
            imageReady(e, index);
            jest.runOnlyPendingTimers();
        })
        wrapper.setMethods({imageReady: spy});
        jest.runOnlyPendingTimers();
        expect(spy).toHaveBeenCalled();
    });
})