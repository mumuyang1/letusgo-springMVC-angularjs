package com.thoughtworks.service.impl;

import com.thoughtworks.dao.CartItemDatabaseDao;
import com.thoughtworks.entity.CartItem;
import com.thoughtworks.entity.CartItemDatabase;
import com.thoughtworks.service.CartItemService;
import com.thoughtworks.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service

public class CartItemServiceImpl implements CartItemService {

    @Autowired
    private CartItemDatabaseDao cartItemDatabaseDaoImpl;

    @Autowired
    private ItemService itemServiceImpl;

    @Override
    public List<CartItem> getCartItems() {

        List<CartItem> cartItems = new ArrayList<CartItem>();
        List<CartItemDatabase> cartItemsDatabase = cartItemDatabaseDaoImpl.getCartItems();

        for (CartItemDatabase cartItemDatabase : cartItemsDatabase) {
            cartItems.add(new CartItem(cartItemDatabase.getId(), itemServiceImpl.getItem(cartItemDatabase.getItemId()), cartItemDatabase.getCount()));
        }
        return cartItems;
    }

    @Override
    public void addCartItem(CartItem cartItem) {
        cartItemDatabaseDaoImpl.addCartItem(cartItem);
    }

    @Override
    public void modifyCartItem(CartItem cartItem) {
        cartItemDatabaseDaoImpl.modifyCartItem(cartItem);
    }

    @Override
    public void deleteCartItem(int id) {
        cartItemDatabaseDaoImpl.deleteCartItem(id);
    }

    @Override
    public void deleteCartItems() {
        cartItemDatabaseDaoImpl.deleteCartItems();
    }
}
