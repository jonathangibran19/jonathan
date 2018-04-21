package com.xalyticsdigital.gbmonitoring.models.dao;

import com.xalyticsdigital.gbmonitoring.models.UserHash;

public interface UserHashDAO extends GenericDAO<UserHash> {
    
    public UserHashDAO getByHash(String hash);    
    
}
