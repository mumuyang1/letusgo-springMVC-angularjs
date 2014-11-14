package com.thoughtworks.entity;

public class CartItemDatabase {

    private int id;
    private int itemId;
    private double count;

    public CartItemDatabase(int id, int itemId, double count) {
        this.id = id;
        this.itemId = itemId;
        this.count = count;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getItemId() {
        return itemId;
    }

    public double getCount() {
        return count;
    }

}
