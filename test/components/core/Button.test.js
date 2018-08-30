import { shallowMount } from '@vue/test-utils'
import NuxtLink from '@/.nuxt/components/nuxt-link'
import Button from '@/components/core/Button'

describe('Button.vue', () => {
    let wrapper, btnLabel = 'button label';
    beforeEach(() => {
        Button.components = Button.components || {}
        Button.components.NuxtLink = NuxtLink
    });
    it('should render button with router', () => {
        wrapper = shallowMount(Button, {
            propsData: {
                url: 'router/link',
                label: btnLabel
            }
        })
        expect(wrapper.html()).toMatchSnapshot();
    });
    it('should render button with a href', () => {
        wrapper = shallowMount(Button, {
            propsData: {
                url: 'http://domain.com',
                label: btnLabel
            }
        })
        expect(wrapper.html()).toMatchSnapshot();
    });
    it('should render button with primary theme', () => {
        wrapper = shallowMount(Button, {
            propsData: {
                url: 'http://domain.com',
                label: btnLabel,
                primary: true
            }
        })
        expect(wrapper.html()).toMatchSnapshot();
    })
    it('should render button type submit', () => {
        wrapper = shallowMount(Button, {
            propsData: {
                label: btnLabel,
                submit: true
            }
        })
        expect(wrapper.html()).toMatchSnapshot();
    })
})