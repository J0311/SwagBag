package com.revature.repositories;

import com.revature.models.Product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query(value = "select * from product where name like concat('%',:keyword,'%')", nativeQuery = true)
    public List<Product> getSearchedProducts(@Param ("keyword") String keyword );
         
}
