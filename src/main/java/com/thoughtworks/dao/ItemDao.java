package com.thoughtworks.dao;

import com.thoughtworks.entity.Item;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemDao {

    public List<Item> getItems();

    public Item getItem(int id);

    public void deleteItem(int id);

    public void addItem(Item item);

    public void modifyItem(Item item);

}
