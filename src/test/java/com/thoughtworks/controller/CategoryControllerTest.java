package com.thoughtworks.controller;

import com.thoughtworks.entity.Category;
import com.thoughtworks.service.CategoryService;
import com.thoughtworks.service.impl.CategoryServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.ArrayList;
import java.util.List;

import static org.fest.assertions.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

public class CategoryControllerTest {

    private CategoryService categoryServiceImpl;
    private CategoryController categoryController= new CategoryController();

    private Category category;

    @Before
    public void before() {
        categoryServiceImpl = mock(CategoryServiceImpl.class);
        List<Category> categories = new ArrayList<Category>();
        categories.add(new Category(1,"test1"));
        categories.add(new Category(2,"test2"));
        when(categoryServiceImpl.getCategories()).thenReturn(categories);

        category = new Category(3,"test3");
        when(categoryServiceImpl.getCategory(3)).thenReturn(category);

        ReflectionTestUtils.setField(categoryController, "categoryServiceImpl", categoryServiceImpl);
    }

    @Test
    public void should_return_categories(){
        assertThat(categoryController.getCategories().get(0).getName()).isEqualTo("test1");
    }

    @Test
    public void should_return_category_by_id(){
        assertThat(categoryController.getCategory(3).getName()).isEqualTo("test3");
    }

    @Test
    public void should_delete_category_by_id(){
        categoryController.deleteCategory(1);
        verify(categoryServiceImpl).deleteCategory(1);
    }

    @Test
    public void should_create_category(){
        categoryController.addCategory(category);
        verify(categoryServiceImpl).addCategory(category);
    }

    @Test
    public void should_modify_category(){
        categoryController.modifyCategory(1,category);
        verify(categoryServiceImpl).modifyCategory(category);
    }
}
