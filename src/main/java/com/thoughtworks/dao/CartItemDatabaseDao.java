package com.thoughtworks.dao;

import com.thoughtworks.entity.CartItem;
import com.thoughtworks.entity.CartItemDatabase;

import java.util.List;

public interface CartItemDatabaseDao {

    public List<CartItemDatabase> getCartItems();

    public CartItemDatabase getCartItem(int id);

    public void addCartItem(CartItem cartItem);

    public void modifyCartItem(CartItem cartItem);

    public void deleteCartItem(int id);

    public void deleteCartItems();

}
