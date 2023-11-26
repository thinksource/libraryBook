import { mount } from 'enzyme'
import Enzyme from "enzyme"
import { beforeEach, describe, expect, test, vi } from 'vitest'
import Modal from './Modal'
import Adapter from "@cfaester/enzyme-adapter-react-18"

let site="http://localhost"

Enzyme.configure({adapter: new Adapter()})
describe("test my modal component", ()=>{

    test("Modal with new and post method",()=>{
        let wrapper = mount(<Modal title="Add new book" buttonTxt='new book' url={site+"books/"} method="post" book={{}}>
                <div>internal content</div>
            </Modal>)
        expect(wrapper.text()).toBe('new book')
        expect(wrapper.getDOMNode().nodeName).toBe("BUTTON")
        let clickcomp= wrapper.simulate("click").childAt(1).childAt(0)
        let title = clickcomp.find("h3")
        expect(wrapper.children().length).toBeGreaterThan(1)
        expect(title.childAt(0).text()).toBe("Add new book")
        expect(title.childAt(1).text()).toBe("X")
        expect(clickcomp.containsMatchingElement(<div>internal content</div>)).toBeTruthy()
        title.childAt(1).simulate("click")
        expect(wrapper.getDOMNode().nodeName).toBe("BUTTON")
    })
})