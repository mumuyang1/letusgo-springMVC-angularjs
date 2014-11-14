package com.thoughtworks.service;

import com.thoughtworks.dao.CategoryDao;
import com.thoughtworks.dao.impl.CategoryDaoImpl;
import com.thoughtworks.entity.Category;
import com.thoughtworks.service.impl.CategoryServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.ArrayList;
import java.util.List;

import static org.fest.assertions.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class CategoryServiceImplTest {

    private CategoryService categoryServiceImpl = new CategoryServiceImpl();

    private CategoryDao categoryDaoImpl = new CategoryDaoImpl();

    private Category category;

    @Before
    public void before() {
        categoryDaoImpl = mock(CategoryDaoImpl.class);
        List<Category> categories = new ArrayList<Category>();
        categories.add(new Category(1,"test1"));
        categories.add(new Category(2,"test2"));
        when(categoryDaoImpl.getCategories()).thenReturn(categories);

        category = new Category(3,"test3");
        when(categoryDaoImpl.getCategory(3)).thenReturn(category);

        ReflectionTestUtils.setField(categoryServiceImpl, "categoryDaoImpl", categoryDaoImpl);
    }

    @Test
    public void should_return_categories(){
        assertThat(categoryServiceImpl.getCategories().get(0).getName()).isEqualTo("test1");
    }

    @Test
    public void should_return_category_by_id(){
        assertThat(categoryServiceImpl.getCategory(3).getName()).isEqualTo("test3");
    }

    @Test
    public void should_delete_category_by_id(){
        categoryServiceImpl.deleteCategory(1);
        verify(categoryDaoImpl).deleteCategory(1);
    }

    @Test
    public void should_create_category(){
        categoryServiceImpl.addCategory(category);
        verify(categoryDaoImpl).addCategory(category);
    }

    @Test
    public void should_modify_category(){
        categoryServiceImpl.modifyCategory(category);
        verify(categoryDaoImpl).modifyCategory(category);
    }
}
