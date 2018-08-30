import { shallowMount } from '@vue/test-utils'
import NuxtLink from '@/.nuxt/components/nuxt-link'
import ChessGrid from '@/components/list/chess-grid'
import data from '../../fakeData/chess-grid-data'

describe("chess-grid.vue", () => {
    
    let wrapper,
        items = data.chessGrid;
    
    beforeEach(() => {
        ChessGrid.components = ChessGrid.components || {}
        ChessGrid.components.NuxtLink = NuxtLink
        wrapper = shallowMount(ChessGrid, {
            propsData: {
                list: items
            }
        })
    });

    it('list is Array', () => {
        expect(wrapper.vm.list.constructor === Array).toBeTruthy();
    });

    it('should render chess-grid init state', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });
})