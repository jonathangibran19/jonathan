package com.xalyticsdigital.gbmonitoring.models.dao;



import java.io.Serializable;
import java.util.List;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.CriteriaSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional
public abstract class AbstractHibernateDao<T extends Serializable> implements GenericDAO<T>{
    
    @Autowired
    private SessionFactory sessionFactory;
    
    private Class<T> clazz;
    
    @Transactional(readOnly = true)
    @Override
    public T getById(Long id){
        Session session = sessionFactory.getCurrentSession();
        T entity = (T) session.get(clazz, id);
        return entity;
    }    
    @SuppressWarnings(value = "unchecked")
    @Transactional
    @Override
    public List<T> getAll(){
        Session session = sessionFactory.getCurrentSession();
        List<T> all = session.createCriteria(clazz)
                .setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY).list();
        return all;
    }
    
    @Transactional
    @Override
    public Long insert(T entity){
        Long idEntity;
        Session session = sessionFactory.openSession();
            session.beginTransaction();
            idEntity = (Long) session.save(entity);
            session.getTransaction().commit();
        session.close();
        return idEntity;
    }
    
    @Transactional
    @Override
    public T update(T entity){
        T finalObject;
        Session session = sessionFactory.openSession();
            session.beginTransaction();
            finalObject = (T) session.merge(entity);
            session.getTransaction().commit();
        session.close();
        return finalObject;
    }
    
    @Transactional
    @Override
    public void delete(T entity){
        Session session = sessionFactory.openSession();
            session.beginTransaction();
            session.delete(entity);
            session.getTransaction().commit();
            session.close();
        
    }
    
    public void setClazz(Class<T> clazz) {
        this.clazz = clazz;
    }

    public Class<T> getClazz() {
        return clazz;
    }
}
