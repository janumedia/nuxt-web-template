import { shallowMount } from '@vue/test-utils'
import LazyImage from '@/components/core/LazyImage'
//
global.process.browser = true;
//
jest.useFakeTimers();

const createWrapper = propsData => shallowMount(LazyImage, {
    attachToDocument: true,
    propsData
})

describe('LazyImage.vue', () => {
    let wrapper,
        IMAGE       = 'image.jpg',
        IMAGE_ERROR = 'image-error.jpg',
        props       = { src: IMAGE, title: 'image title' };
        
    beforeAll(() => {
        LazyImage.components = LazyImage.components || {};
        Object.defineProperty(Image.prototype, 'src', {
            set: function(src) {
                this._src = src;
                if(src == IMAGE_ERROR) this.onerror();
                else this.onload();
            },
            get: function() {
                return this._src;
            }
        })
        
    });

    afterEach(() => {
        //reset
        Element.prototype.getBoundingClientRect = jest.fn(() => {
            return {
                width: 0,
                height: 0,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            }
        });

        Object.defineProperty(Image.prototype, 'complete',  {
            value: false
        });

        //destroy and release scrollListener
        wrapper.destroy();

        //reset setTimer
        jest.clearAllTimers();
    })
    
    it('should render LazyImage init state', () => {
        wrapper = createWrapper(props);
        jest.runOnlyPendingTimers();
        expect(wrapper.html()).toMatchSnapshot();
    });
    
    it('should render LazyImage with square size', () => {
        wrapper = createWrapper(props);
        jest.runOnlyPendingTimers();
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('should render LazyImage on ready state', () => {
        Object.defineProperty(Image.prototype, 'complete',  {
            value: true
        })
        
        wrapper = createWrapper(props);
        
        let spy = jest.fn(() => {
            expect(wrapper.html()).toMatchSnapshot();
        })
        
        wrapper.setMethods({imageReady: spy});
        jest.runOnlyPendingTimers();

        expect(spy).toHaveBeenCalledTimes(1);        
    });

    it('should render LazyImage when load complete', () => {
        Object.defineProperty(Image.prototype, 'complete',  {
            value: true
        })
        wrapper = createWrapper(props);
        jest.runOnlyPendingTimers();
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.emitted().onReady).toBeTruthy();
        expect(wrapper.emitted().onLoaded).toBeTruthy();
    });
    
    it('should render LazyImage when load error', () => {
        Object.defineProperty(Image.prototype, 'complete',  {
            value: true
        });
        wrapper = createWrapper({...props, src: IMAGE_ERROR});
        jest.runOnlyPendingTimers();
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.emitted().onError).toBeTruthy();
    });

    it('should stay in init state when outside viewPort', () => {
        //https://github.com/vuejs/vue-test-utils/issues/319#issuecomment-354667621
        //Element.prototype.scrollTo = jest.fn((x, y) => {});
        //https://stackoverflow.com/a/40006663/1578100
        //https://github.com/facebook/react/issues/4606#issuecomment-130106946
        Element.prototype.getBoundingClientRect = jest.fn(() => {
            return {
                width: 120,
                height: 120,
                top: 1200,
                left: 0,
                bottom: 0,
                right: 0,
            }
        })

        Object.defineProperty(Image.prototype, 'complete',  {
            value: true
        })
        
        wrapper = createWrapper(props);
        
        jest.runOnlyPendingTimers();
        //expect(wrapper.html()).toMatchSnapshot();
        //window.scrollTo(0, 1200);
        expect(wrapper.emitted().onReady).toBeFalsy();
        expect(wrapper.emitted().onLoaded).toBeFalsy();
        expect(wrapper.emitted().onError).toBeFalsy();
    });
})