package com.cdac.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "bill_item")
public class BillItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long billItemId;

    @ManyToOne
    @JoinColumn(name = "bill_id", nullable = false)
    private Bill bill;

    @ManyToOne
    @JoinColumn(name = "food_id", nullable = false)
    private Food food;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Double price;
     
    @Column(nullable = false)
    private Boolean corrected = false;
    
    @Column(nullable = false)
    private Integer correctedQuantity = 0;

    public BillItem() {
    }

    public Long getBillItemId() {
        return billItemId;
    }

    public void setBillItemId(Long billItemId) {
        this.billItemId = billItemId;
    }

    public Bill getBill() {
        return bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }

    public Food getFood() {
        return food;
    }

    public void setFood(Food food) {
        this.food = food;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
    public Boolean getCorrected() {
        return corrected;
    }

    public void setCorrected(Boolean corrected) {
        this.corrected = corrected;
    }
    public Integer getCorrectedQuantity() {
        return correctedQuantity;
    }

    public void setCorrectedQuantity(Integer correctedQuantity) {
        this.correctedQuantity = correctedQuantity;
    }
}