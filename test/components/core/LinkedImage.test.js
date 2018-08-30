import { shallowMount, mount, RouterLinkStub } from '@vue/test-utils'
import NuxtLink from '@/.nuxt/components/nuxt-link'
import LinkedImage from '@/components/core/LinkedImage'

global.process.browser = true;
jest.useFakeTimers();

const createWrapper = (propsData, mountType=shallowMount) => {
    return mountType(LinkedImage, {
        attachToDocument: true,
        propsData,
        stubs: {
            RouterLink: RouterLinkStub
        }
    })
}

describe('LinkedImage.vue', () => {
    
    let wrapper,
        IMAGE       = 'image.jpg',
        IMAGE_ERROR = 'image-error.jpg',
        propsData   = {
                        src: IMAGE,
                        title: 'image title',
                        url:'/link/to/page'
                      }

    beforeEach(() => {
        LinkedImage.components = LinkedImage.components || {};
        LinkedImage.components.NuxtLink = NuxtLink
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
    
    it('should render LinkedImage without url', () => {
        wrapper = createWrapper({src:propsData.src, title:propsData.title}, mount);
        expect(wrapper.vm.$el).toMatchSnapshot();
    });
    
    it('should render LinkedImage with router-link', () => {
        wrapper = createWrapper(propsData);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('should render LinkedImage with http url', () => {
        wrapper = createWrapper({...propsData, url:'http://domain.name'});
        expect(wrapper.html()).toMatchSnapshot();
    });
    
    it('should render LinkedImage with square mode', () => {
        wrapper = createWrapper({...propsData, square:true}, mount);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('should render LinkedImage with thumbnail mode', () => {
        wrapper = createWrapper({...propsData, thumbnailMode:true}, mount);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('should render LinkedImage with verticalAlign', () => {
        wrapper = createWrapper({...propsData, verticalAlign:true}, mount);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('should emit onReady and onLoaded event', () => {
        Object.defineProperty(Image.prototype, 'complete',  {
            value: true
        })
        wrapper = createWrapper({...propsData}, mount);
        jest.runOnlyPendingTimers();
        expect(wrapper.emitted().onReady).toBeTruthy();
        expect(wrapper.emitted().onLoaded).toBeTruthy();
        expect(wrapper.emitted().onError).toBeFalsy();
    });

    it('should emit onReady and onError event', () => {
        Object.defineProperty(Image.prototype, 'complete',  {
            value: true
        })
        wrapper = createWrapper({...propsData, src:IMAGE_ERROR}, mount);
        jest.runOnlyPendingTimers();
        expect(wrapper.emitted().onReady).toBeTruthy();
        expect(wrapper.emitted().onLoaded).toBeFalsy();
        expect(wrapper.emitted().onError).toBeTruthy();
    });
})