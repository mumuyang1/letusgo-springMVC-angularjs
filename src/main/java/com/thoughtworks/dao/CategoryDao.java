package com.thoughtworks.dao;

import com.thoughtworks.entity.Category;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryDao {

    public List<Category> getCategories();

    public Category getCategory(int id);

    public void deleteCategory(int id);

    public void addCategory(Category category);

    public void modifyCategory(Category category);

}
