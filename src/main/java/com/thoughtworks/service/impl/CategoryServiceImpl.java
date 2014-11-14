package com.thoughtworks.service.impl;

import com.thoughtworks.dao.CategoryDao;
import com.thoughtworks.entity.Category;
import com.thoughtworks.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryDao categoryDaoImpl;

    @Override
    public List<Category> getCategories() {
        return categoryDaoImpl.getCategories();
    }

    @Override
    public Category getCategory(int id) {
        return categoryDaoImpl.getCategory(id);
    }

    @Override
    public void deleteCategory(int id) {
        categoryDaoImpl.deleteCategory(id);
    }

    @Override
    public void addCategory(Category category) {
        categoryDaoImpl.addCategory(category);
    }

    @Override
    public void modifyCategory(Category category) {
        categoryDaoImpl.modifyCategory(category);
    }
}
