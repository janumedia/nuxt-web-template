import { shallowMount, mount } from '@vue/test-utils'
import SlideImages from '@/components/list/slide-images'
import data from '../../fakeData/list-box-data'

global.process.browser = true;
jest.useFakeTimers();

SlideImages.components = SlideImages.components || {};

const createWrapper = (propsData, mountType=shallowMount) => {
    return mountType(SlideImages, {
        attachToDocument: true,
        propsData
    })
}

describe("slide-images.vue", () => {
    let wrapper, 
        list = data.listBox.find(item => item.slides).slides;
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

    it('should render slide-images', () => {
        wrapper = createWrapper({
            list
        });
        expect(wrapper.html()).toMatchSnapshot();
    });
    
    it('should firing imageReady', () => {

        Object.defineProperty(Image.prototype, 'src', {
            set: function(src) {
                this._src = src;
                this.onload();
            },
            get: function() {
                return this._src;
            }
        })

        wrapper = createWrapper({
            list
        }, mount);
        
        let imageReady = wrapper.vm.imageReady;
        let spy = jest.fn((e) => {
            //firing original method
            imageReady(e);
        })
        wrapper.setMethods({imageReady: spy});
        jest.runOnlyPendingTimers();
        expect(spy).toHaveBeenCalledTimes(wrapper.vm.list.length); 
    });
})