package com.revature.services;

import com.revature.dtos.ProductInfo;
import com.revature.models.Product;
import com.revature.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * Returns a list of all products in the database. If no products exist, an
     * empty
     * list is returned.
     *
     * @return a list of all products in the database
     */
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    /**
     * Returns the product with the given id if it exists in the database.
     *
     * @param id - the id of the product to retrieve
     * @return an optional containing the product with the given id if it exists
     */
    public Optional<Product> findById(int id) {
        return productRepository.findById(id);
    }

    /**
     * Saves the given product to the database.
     *
     * @param product - the product to save
     * @return the saved product
     */
    public Product save(Product product) {
        return productRepository.save(product);
    }

    /**
     * Saves all the given products to the database.
     *
     * @param productList - the list of products to save
     * @param metadata    - the metadata to save
     * @return the saved products
     */
    public List<Product> saveAll(List<Product> productList, List<ProductInfo> metadata) {
        return productRepository.saveAll(productList);
    }

    /**
     * Deletes the product with the given id from the database.
     *
     * @param id - the id of the product to delete
     */
    public void delete(int id) {
        productRepository.deleteById(id);
    }

    /**
     * Returns a list of products with the given keyword in the name.
     *
     * @param kw - the keyword to search for
     * @return a list of products with the given keyword in the name
     */
    public List<Product> searchByName(String kw) {
        return productRepository.searchByName(kw);
    }
}
