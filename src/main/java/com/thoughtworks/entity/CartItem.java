package com.thoughtworks.entity;

public class CartItem {

    private int id;
    private Item item;
    private double count;

    public CartItem() {
    }

    public CartItem(int id,Item item, double count) {
        this.id = id;
        this.item = item;
        this.count = count;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Item getItem() {
        return item;
    }

    public double getCount() {
        return count;
    }

}
