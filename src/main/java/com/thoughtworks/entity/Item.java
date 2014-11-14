package com.thoughtworks.entity;

public class Item {

    private int id;
    private String name;
    private String unit;
    private double price;
    private int categoryId;

    public Item() {
    }

    public Item(int id,String name, String unit, double price, int categoryId) {
        this.id = id;
        this.name = name;
        this.unit = unit;
        this.price = price;
        this.categoryId = categoryId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public String getUnit() {
        return unit;
    }

    public int getCategoryId() {
        return categoryId;
    }

}
