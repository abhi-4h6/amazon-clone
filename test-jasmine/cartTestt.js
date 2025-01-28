import { addtocart, cart, loadfromstorage } from "../data/cart.js";

describe('test suite', () => {
    it('checks length of cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadfromstorage();
        addtocart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.length).toEqual(1);
    });
});
