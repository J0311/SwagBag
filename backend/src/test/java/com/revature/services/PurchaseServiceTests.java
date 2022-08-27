package com.revature.services;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.revature.models.Purchase;
import com.revature.repositories.PurchaseRepository;

@ContextConfiguration(classes = { PurchaseService.class })
@ExtendWith(SpringExtension.class)
public class PurchaseServiceTests {

    @MockBean
    private PurchaseRepository purchaseRepository;

    @Autowired
    private PurchaseService purchaseService;

    private List<Purchase> testPurchases;

    @BeforeEach
    public void setUp() {
        testPurchases = new ArrayList<Purchase>();
        testPurchases.add(0, new Purchase(0, null, null, 7, 10.50F));
        testPurchases.add(1, new Purchase(1, null, null, 18, 94.99F));
    }

    @Test
    void testSave() {
        Mockito.when(purchaseRepository.save(Mockito.any())).thenReturn(testPurchases.get(0));
        Purchase saved = purchaseService.save(testPurchases.get(0));
        assertEquals(testPurchases.get(0).getQuantity(), saved.getQuantity());
    }

    @Test
    void testSaveAll() {
        Mockito.when(purchaseRepository.saveAll(Mockito.any())).thenReturn(testPurchases);
        List<Purchase> savedList = purchaseService.saveAll(testPurchases);
        assertEquals(testPurchases.size(), savedList.size());
    }
}
