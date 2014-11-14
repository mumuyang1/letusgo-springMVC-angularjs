package com.thoughtworks.service;

import com.thoughtworks.entity.CartItem;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartItemService {

    public List<CartItem> getCartItems();

    public void addCartItem(CartItem cartItem);

    public void modifyCartItem(CartItem cartItem);

    public void deleteCartItem(int id);

    public void deleteCartItems();
}
