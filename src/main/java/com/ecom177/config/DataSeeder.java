package com.ecom177.config;

import com.ecom177.entity.Category;
import com.ecom177.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.count() == 0) {
            categoryRepository.save(new Category("Books", "Books and educational materials"));
            categoryRepository.save(new Category("Electronics", "Electronic devices and gadgets"));
        }
    }
}