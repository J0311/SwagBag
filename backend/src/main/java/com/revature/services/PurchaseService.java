package com.revature.services;

import com.revature.models.Purchase;

import com.revature.repositories.PurchaseRepository;

import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;

    public PurchaseService(PurchaseRepository purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }

    public Purchase save(Purchase purchase) {
        return purchaseRepository.save(purchase);
    }
    
    public List<Purchase> saveAll(List<Purchase> purchaseList) {
    	return purchaseRepository.saveAll(purchaseList);
    }

}
