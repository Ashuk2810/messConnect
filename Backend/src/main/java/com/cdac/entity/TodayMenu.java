package com.cdac.entity;

import java.time.LocalDate;

import com.cdac.enums.FoodCategory;

import jakarta.persistence.*;

@Entity
@Table(
    name = "today_menu",
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = {"food_id", "category", "menu_date"}
        )
    }
)
public class TodayMenu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menuId;

    @ManyToOne
    @JoinColumn(name = "food_id", nullable = false)
    private Food food;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FoodCategory category;

    @Column(name = "menu_date", nullable = false)
    private LocalDate menuDate;

    public TodayMenu() {
    }

    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }

    public Food getFood() {
        return food;
    }

    public void setFood(Food food) {
        this.food = food;
    }

    public FoodCategory getCategory() {
        return category;
    }

    public void setCategory(FoodCategory category) {
        this.category = category;
    }

    public LocalDate getMenuDate() {
        return menuDate;
    }

    public void setMenuDate(LocalDate menuDate) {
        this.menuDate = menuDate;
    }
}