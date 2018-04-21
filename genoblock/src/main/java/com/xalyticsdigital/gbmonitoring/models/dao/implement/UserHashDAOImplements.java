/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.xalyticsdigital.gbmonitoring.models.dao.implement;

import com.xalyticsdigital.gbmonitoring.models.UserHash;
import com.xalyticsdigital.gbmonitoring.models.dao.AbstractHibernateDao;
import com.xalyticsdigital.gbmonitoring.models.dao.UserHashDAO;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository("userHashDAO")
public class UserHashDAOImplements extends AbstractHibernateDao<UserHash> implements UserHashDAO {
    
    public UserHashDAOImplements() {
        setClazz(UserHash.class);
    }
    
    @Override
    public UserHashDAO getByHash(String hash) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
