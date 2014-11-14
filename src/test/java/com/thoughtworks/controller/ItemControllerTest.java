package com.thoughtworks.controller;

import com.thoughtworks.entity.Item;
import com.thoughtworks.service.ItemService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.ArrayList;
import java.util.List;

import static org.fest.assertions.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

public class ItemControllerTest {

    private ItemController itemController;

    private ItemService itemServiceImpl;

    private Item item;

    @Before
    public void before() {
        itemServiceImpl = mock(ItemService.class);
        List<Item> items = new ArrayList<Item>();
        items.add(new Item(1, "测试1", "斤", 11, 2));
        items.add(new Item(1, "测试2", "个", 22, 3));
        when(itemServiceImpl.getItems()).thenReturn(items);

        item = new Item(1, "ming", "u", 0, 9);
        when(itemServiceImpl.getItem(1)).thenReturn(item);
        itemController = new ItemController();

        ReflectionTestUtils.setField(itemController, "itemServiceImpl", itemServiceImpl);
    }

    @Test
    public void should_return_items() {
        assertThat(itemController.getItems().get(0).getName()).isEqualTo("测试1");
    }

    @Test
    public void should_return_item_by_id() {
        assertThat(itemController.getItem(1).getName()).isEqualTo("ming");
    }

    @Test
    public void should_delete_item_by_id() {
        itemController.deleteItem(1);
        verify(itemServiceImpl).deleteItem(1);
    }

    @Test
    public void should_create_item() {
        itemController.addItem(item);
        verify(itemServiceImpl).addItem(item);
    }

    @Test
    public void should_modify_item() {
        itemController.modifyItem(1,item);
        verify(itemServiceImpl).modifyItem(item);
    }
}