package com.xalyticsdigital.gbmonitoring.models.dao;

import java.util.List;

public interface GenericDAO<T> {
    T getById(Long id);
    List<T> getAll();
    Long insert(T entity);
    void delete(T entity);
    T update(T entity);
}
