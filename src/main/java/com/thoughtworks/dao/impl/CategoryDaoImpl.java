package com.thoughtworks.dao.impl;

import com.thoughtworks.dao.CategoryDao;
import com.thoughtworks.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class CategoryDaoImpl implements CategoryDao {

    public CategoryDaoImpl() {

    }

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Category> getCategories() {

        return jdbcTemplate.query("select * from categories;", new RowMapper<Category>() {

            @Override
            public Category mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new Category(
                        rs.getInt("c_id"),
                        rs.getString("c_name"));
            }
        });
    }

    @Override
    public Category getCategory(int id) {

        return jdbcTemplate.queryForObject("select * from categories where c_id = ?;", new Object[]{id}, new RowMapper<Category>() {
            @Override
            public Category mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new Category(
                        rs.getInt("c_id"),
                        rs.getString("c_name"));
            }
        });
    }

    @Override
    public void deleteCategory(int id) {
        jdbcTemplate.update("delete from categories where c_id = ?;", new Object[]{id});
    }

    @Override
    public void addCategory(Category category) {

        jdbcTemplate.update("INSERT INTO categories VALUES(?,?)",
                category.getId(),
                category.getName());
    }

    @Override
    public void modifyCategory(Category category) {

        jdbcTemplate.update("UPDATE categories SET c_name=? where c_id = ?",
                category.getName(),
                category.getId()
        );
    }

}
