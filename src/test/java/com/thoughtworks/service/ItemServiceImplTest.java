package com.thoughtworks.service;

import com.thoughtworks.dao.ItemDao;
import com.thoughtworks.dao.impl.ItemDaoImpl;
import com.thoughtworks.entity.Item;
import com.thoughtworks.service.impl.ItemServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.ArrayList;
import java.util.List;

import static org.fest.assertions.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class ItemServiceImplTest {

    private ItemService itemServiceImpl = new ItemServiceImpl();

    private ItemDao itemDaoImpl;

    private Item item;

    @Before
    public void before() {
         itemDaoImpl = mock(ItemDaoImpl.class);
        List<Item> items = new ArrayList<Item>();
        items.add(new Item(1, "测试1", "斤", 11, 2));
        items.add(new Item(1, "测试2", "个", 22, 3));
        when(itemDaoImpl.getItems()).thenReturn(items);

        item = new Item(1,  "ming", "u", 0, 9);
        when(itemDaoImpl.getItem(1)).thenReturn(item);

        ReflectionTestUtils.setField(itemServiceImpl, "itemDaoImpl", itemDaoImpl);
    }

    @Test
    public void should_return_items() {
        assertThat(itemServiceImpl.getItems().get(0).getName()).isEqualTo("测试1");
    }

    @Test
    public void should_return_item_by_id() {
        assertThat(itemServiceImpl.getItem(1).getName()).isEqualTo("ming");
    }

    @Test
    public void should_delete_item_by_id() {
        itemServiceImpl.deleteItem(1);
        verify(itemDaoImpl).deleteItem(1);
    }

    @Test
    public void should_create_item(){
        itemServiceImpl.addItem(item);
        verify(itemDaoImpl).addItem(item);
    }

    @Test
    public void should_modify_item(){
        itemServiceImpl.modifyItem(item);
        verify(itemDaoImpl).modifyItem(item);
    }
}
