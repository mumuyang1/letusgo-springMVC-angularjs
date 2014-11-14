package com.thoughtworks.service;

import com.thoughtworks.entity.Item;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ItemService {

    public List<Item> getItems();

    public Item getItem(int id);

    public void deleteItem(int id);
    
    public void addItem(Item item);

    public void modifyItem(Item item);
}
