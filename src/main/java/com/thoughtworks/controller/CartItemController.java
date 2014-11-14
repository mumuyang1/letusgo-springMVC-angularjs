package com.thoughtworks.controller;

import com.thoughtworks.entity.CartItem;
import com.thoughtworks.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class CartItemController {

    @Autowired
    private CartItemService cartItemServiceImpl;

    @RequestMapping(value = "cartitems", method = RequestMethod.GET)
    public List<CartItem> getCartItems() {

        return cartItemServiceImpl.getCartItems();
    }

    @RequestMapping(value = "cartitems", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void addCartItem(@RequestBody CartItem cartItem) {
        cartItemServiceImpl.addCartItem(cartItem);
    }

    @RequestMapping(value = "/cartitems/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void modifyCartItem(@RequestBody CartItem cartItem) {
        cartItemServiceImpl.modifyCartItem(cartItem);
    }

    @RequestMapping(value = "/cartitems/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCartItem(@PathVariable int id) {
        cartItemServiceImpl.deleteCartItem(id);
    }

    @RequestMapping(value = "cartitems",method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCartItems(){
        cartItemServiceImpl.deleteCartItems();
    }

}
