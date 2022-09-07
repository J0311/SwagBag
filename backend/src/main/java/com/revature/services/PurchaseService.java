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

    /**
     * Saves the given purchase to the database.
     *
     * @param purchase - the purchase to save
     * @return the saved purchase
     */
    public Purchase save(Purchase purchase) {
        return purchaseRepository.save(purchase);
    }

    /**
     * Saves all the given purchases to the database.
     *
     * @param purchaseList - the list of purchases to save
     * @return the saved purchases
     */
    public List<Purchase> saveAll(List<Purchase> purchaseList) {
        return purchaseRepository.saveAll(purchaseList);
    }

}
