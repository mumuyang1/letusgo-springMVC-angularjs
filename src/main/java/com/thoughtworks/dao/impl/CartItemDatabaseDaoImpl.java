package com.thoughtworks.dao.impl;

import com.thoughtworks.dao.CartItemDatabaseDao;
import com.thoughtworks.entity.CartItem;
import com.thoughtworks.entity.CartItemDatabase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class CartItemDatabaseDaoImpl implements CartItemDatabaseDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<CartItemDatabase> getCartItems() {

        return jdbcTemplate.query("select * from cart_items;", new RowMapper<CartItemDatabase>() {
            @Override
            public CartItemDatabase mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new CartItemDatabase(rs.getInt("id"),rs.getInt("i_id"),rs.getDouble("count"));
            }
        }) ;
    }

    @Override
    public CartItemDatabase getCartItem(int id) {
        return jdbcTemplate.queryForObject("select * from cart_items where id = ?;", new Object[]{id}, new RowMapper<CartItemDatabase>() {
            @Override
            public CartItemDatabase mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new CartItemDatabase(
                        rs.getInt("id"),
                        rs.getInt("i_id"),
                        rs.getDouble("count"));
            }
        });
    }

    @Override
    public void addCartItem(CartItem cartItem) {
        jdbcTemplate.update("insert into cart_items values (?,?,?);",cartItem.getId(),cartItem.getItem().getId(),cartItem.getCount());
    }

    @Override
    public void modifyCartItem(CartItem cartItem) {
        jdbcTemplate.update(" update cart_items set count = ? where id = ?;",cartItem.getCount(),cartItem.getId());
    }

    @Override
    public void deleteCartItem(int id) {
        jdbcTemplate.update("delete from cart_items where id = ?",id);
    }
}

