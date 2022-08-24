package com.revature.controllers;

import com.revature.annotations.Authorized;
import com.revature.dtos.ProductInfo;
import com.revature.models.Order;
import com.revature.models.Product;
import com.revature.models.Purchase;
import com.revature.models.User;
import com.revature.repositories.PurchaseRepository;
import com.revature.services.OrderService;
import com.revature.services.ProductService;
import com.revature.services.PurchaseService;
import com.revature.services.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"}, allowCredentials = "true")
public class ProductController {

    private final ProductService productService;
    private final UserService userService;
    private final OrderService orderService;
    private final PurchaseService purchaseService;

    public ProductController(ProductService productService, UserService userService, OrderService orderService, PurchaseService purchaseService) {
        this.productService = productService;
        this.userService = userService;  
        this.orderService = orderService;
        this.purchaseService = purchaseService;
    }

    @Authorized
    @GetMapping
    public ResponseEntity<List<Product>> getInventory() {
        return ResponseEntity.ok(productService.findAll());
    }

    @Authorized
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") int id) {
        Optional<Product> optional = productService.findById(id);

        if(!optional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(optional.get());
    }

    @Authorized
    @PutMapping
    public ResponseEntity<Product> upsert(@RequestBody Product product) {
        return ResponseEntity.ok(productService.save(product));
    }

    @Authorized
    @PatchMapping
    public ResponseEntity<List<Product>> purchase(@RequestBody List<ProductInfo> metadata) { 	
    	List<Product> productList = new ArrayList<Product>();
        List<Purchase> purchaseList = new ArrayList<Purchase>();
        
        Order order = new Order();
       
        User user = userService.findById(1).get();
        
        order.setPurchaseTime(LocalDateTime.now());
        order.setUser(user);
        
    
    	for (int i = 0; i < metadata.size(); i++) {
    		Optional<Product> optional = productService.findById(metadata.get(i).getId());
            Purchase purchase = new Purchase();
            

    		if(!optional.isPresent()) {
    			return ResponseEntity.notFound().build();
    		}

    		Product product = optional.get();

    		if(product.getQuantity() - metadata.get(i).getQuantity() < 0) {
    			return ResponseEntity.badRequest().build();
    		}
    		
            purchase.setProduct(product);
            purchase.setOrder(order);
            purchase.setPricePerItem(product.getPrice());
            purchase.setQuantity(metadata.get(i).getQuantity());

    		product.setQuantity(product.getQuantity() - metadata.get(i).getQuantity());
    		productList.add(product);
            purchaseList.add(purchase);
    	}

        order.setPurchases(purchaseList);
        
        productService.saveAll(productList, metadata);
        orderService.save(order);
        purchaseService.saveAll(purchaseList);

        return ResponseEntity.ok(productList);
    }

    @Authorized
    @DeleteMapping("/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable("id") int id) {
        Optional<Product> optional = productService.findById(id);

        if(!optional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        productService.delete(id);

        return ResponseEntity.ok(optional.get());
    }
}
