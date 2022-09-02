package com.revature.repositories;

import com.revature.models.Product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query("SELECT p FROM Product p WHERE UPPER(name) LIKE CONCAT('%',UPPER(:keyword),'%')")
    public List<Product> searchByName(@Param ("keyword") String keyword );
         
}
