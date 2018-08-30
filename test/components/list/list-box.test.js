import { shallowMount } from '@vue/test-utils'
import LinkedImage from '@/components/core/LinkedImage'
import Button from '@/components/core/Button'
import GoogleMap from '@/components/vendor/google-map'
import GoogleReview from '@/components/vendor/google-review'
import ListBox from '@/components/list/list-box'
import data from '../../fakeData/list-box-data'

ListBox.components = ListBox.components || {}
LinkedImage.components = LinkedImage.components || {}
Button.components = Button.components || {}
GoogleMap.components = GoogleMap.components || {}
GoogleReview.components = GoogleReview.components || {}

const createWrapper = (propsData, mountType=shallowMount) => {
    return mountType(ListBox, {
        attachToDocument: true,
        propsData
    })
}

describe("list-box.vue", () => {
    let wrapper, items = data.listBox;
    
    it(`should render list-box with ${items.length} items`, () => {
        wrapper = createWrapper({
            list: items
        });
        expect(wrapper.html()).toMatchSnapshot();
    });

    it(`should has Google Map`, () => {
        wrapper = createWrapper({
            list: items.filter(item => item.googleMap)
        });
        expect(wrapper.find(GoogleMap)).toBeTruthy();
    });

    it(`should has Google Place Review`, () => {
        wrapper = createWrapper({
            list: items.filter(item => item.googleReview)
        });
        expect(wrapper.find(GoogleReview)).toBeTruthy();
    });
})