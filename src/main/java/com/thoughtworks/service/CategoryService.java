package com.thoughtworks.service;

import com.thoughtworks.entity.Category;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {

    public List<Category> getCategories();

    public Category getCategory(int id);

    public void deleteCategory(int id);

    public void addCategory(Category category);

    public void modifyCategory(Category category);
}
