package com.thoughtworks.controller;

import com.thoughtworks.entity.CartItem;
import com.thoughtworks.entity.Item;
import com.thoughtworks.service.CartItemService;
import com.thoughtworks.service.impl.CartItemServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.ArrayList;
import java.util.List;

import static org.fest.assertions.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class CartItemControllerTest {


    private CartItemService cartItemServiceImpl;
    private CartItemController cartItemController = new CartItemController();


    private Item item1 = new Item(1, "测试1", "斤", 11, 2);
    private Item item2 = new Item(2, "测试2", "斤", 11, 3);

    private CartItem cartItem = new CartItem(1,item1,1);

    @Before
    public void before() {
        cartItemServiceImpl = mock(CartItemServiceImpl.class);
        List<CartItem> cartItemList = new ArrayList<CartItem>();
        cartItemList.add(new CartItem(1, item1, 1));
        cartItemList.add(new CartItem(2, item2, 2));
        when(cartItemServiceImpl.getCartItems()).thenReturn(cartItemList);

        ReflectionTestUtils.setField(cartItemController, "cartItemServiceImpl", cartItemServiceImpl);
    }

    @Test
    public void should_return_cartItems() {
        assertThat(cartItemController.getCartItems().get(0).getCount()).isEqualTo(1);
    }

    @Test
    public void should_create_cartItem(){
        cartItemController.addCartItem(cartItem);
        verify(cartItemServiceImpl).addCartItem(cartItem);
    }

    @Test
    public void should_modify_cartItem(){
        cartItemController.modifyCartItem(cartItem);
        verify(cartItemServiceImpl).modifyCartItem(cartItem);
    }

    @Test
    public void should_delete_cartItem_by_id(){
        cartItemController.deleteCartItem(1);
        verify(cartItemServiceImpl).deleteCartItem(1);
    }
}
