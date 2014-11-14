package com.thoughtworks.dao.impl;

import com.thoughtworks.dao.ItemDao;
import com.thoughtworks.entity.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class ItemDaoImpl implements ItemDao {

    public ItemDaoImpl() {

    }

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Item> getItems() {

        return jdbcTemplate.query("select * from items;", new RowMapper<Item>() {

            @Override
            public Item mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new Item(
                        rs.getInt("i_id"),
                        rs.getString("i_name"),
                        rs.getString("i_unit"),
                        rs.getDouble("i_price"),
                        rs.getInt("i_categoryid"));
            }
        });
    }

    @Override
    public Item getItem(int id) {

        return jdbcTemplate.queryForObject("select * from items where i_id = ?;", new Object[]{id}, new RowMapper<Item>() {
            @Override
            public Item mapRow(ResultSet rs, int i) throws SQLException {
                return new Item(
                        rs.getInt("i_id"),
                        rs.getString("i_name"),
                        rs.getString("i_unit"),
                        rs.getDouble("i_price"),
                        rs.getInt("i_categoryid"));
            }
        });
    }

    @Override
    public void deleteItem(int id) {
        jdbcTemplate.update("delete from items where i_id = ?;", new Object[]{id});
    }

    @Override
    public void addItem(Item item) {

        jdbcTemplate.update("INSERT INTO items VALUES(?,?,?,?,?)",
                item.getId(),
                item.getName(),
                item.getUnit(),
                item.getPrice(),
                item.getCategoryId());
    }

    @Override
    public void modifyItem(Item item) {

        jdbcTemplate.update("UPDATE items SET i_name=?,i_unit=?,i_price=?,i_categoryid=? where i_id = ?",
                item.getName(),
                item.getUnit(),
                item.getPrice(),
                item.getCategoryId(),
                item.getId()
        );
    }
}
