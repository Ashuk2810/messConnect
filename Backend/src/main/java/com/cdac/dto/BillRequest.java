package com.cdac.dto;

import java.util.List;

public class BillRequest {

    private String userCode;

    private List<BillItemRequest> items;

    public BillRequest() {
    }

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(String userCode) {
        this.userCode = userCode;
    }

    public List<BillItemRequest> getItems() {
        return items;
    }

    public void setItems(List<BillItemRequest> items) {
        this.items = items;
    }
}