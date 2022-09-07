package com.revature.repositories;

import com.revature.models.Product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    /**
     * Returns a list of all products in the database that are associated with the
     * given keyword.
     *
     * @param keyword - the keyword to search for
     * @return a list of all products whose name contains the given keyword
     */
    @Query("SELECT p FROM Product p WHERE UPPER(name) LIKE CONCAT('%',UPPER(:keyword),'%')")
    List<Product> searchByName(@Param("keyword") String keyword);
}
