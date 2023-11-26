import {describe, expect, test} from "vitest";
import {render, fireEvent, screen} from '@testing-library/react'
import Bookdetail from "./Bookdetail";
import { GlobalProvider } from "./GlobalContext";

const mockedContext = {
         name: "book name",
         author: "author name",
         price: 1.0,
         borrowStatus: false     
};

const newName = "new book"



describe("Book detail component test", ()=>{
    test("renders component with mocked context", ()=>{
        const bookdetail= render(
            <GlobalProvider bookprovider={mockedContext}>
                <Bookdetail></Bookdetail>
            </GlobalProvider>
        )
        const inputs = screen.getAllByRole('textbox');
        expect(inputs[0].tagName).toBe("INPUT")
        expect(inputs[0].getAttribute("type")).toBe("text")
        expect(inputs[0].getAttribute("value")).toBe(mockedContext.name);
        fireEvent.change(inputs[0], { target: { value: newName } });
        expect(inputs[0].getAttribute("value")).toBe(newName);

        
        expect(inputs[1].tagName).toBe("INPUT")
        expect(inputs[1].getAttribute("type")).toBe("text")
        expect(inputs[1].getAttribute("value")).toBe(mockedContext.author);
        fireEvent.change(inputs[1], { target: { value: newName } });
        expect(inputs[1].getAttribute("value")).toBe(newName);

        const price = screen.getByRole("spinbutton")
        expect(price.tagName).toBe("INPUT")
        expect(price.getAttribute("value")).toEqual(mockedContext.price.toString());
        fireEvent.change(price, {target: {value: 2.44}});
        expect(price.getAttribute("value")).toEqual(String(2.44));

        const radios = screen.getAllByRole("radio")
        expect(radios[0].tagName).toBe("INPUT")
        expect(radios[0].getAttribute("checked")).toBe("checked");
        expect(radios[1].tagName).toBe("INPUT")
        expect(radios[0].getAttribute("checked")).toBe("checked");

    })
})