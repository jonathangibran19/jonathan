
package com.xalyticsdigital.gbmonitoring.models.dao.implement;

import com.xalyticsdigital.gbmonitoring.models.ShareUsers;
import com.xalyticsdigital.gbmonitoring.models.dao.AbstractHibernateDao;
import com.xalyticsdigital.gbmonitoring.models.dao.ShareUsersDAO;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository("shareUsersDAO")
public class ShareUsersDAOImplements extends AbstractHibernateDao<ShareUsers> implements ShareUsersDAO{
    
    public ShareUsersDAOImplements() {
        setClazz(ShareUsers.class);
    }
    
}
