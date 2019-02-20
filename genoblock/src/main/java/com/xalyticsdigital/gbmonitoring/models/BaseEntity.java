package com.xalyticsdigital.gbmonitoring.models;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
//import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.slf4j.LoggerFactory;

@MappedSuperclass
@SuppressWarnings("serial")
public abstract class BaseEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id", nullable = false, columnDefinition = "BIGINT UNSIGNED")
    private Long id;

//    @Override
//    public String toString() {
//        try {
//            return new ObjectMapper()
//                    .registerModule(new JavaTimeModule())
//                    .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
//                    .writerWithDefaultPrettyPrinter()
//                    .writeValueAsString(this);
//        } catch (JsonProcessingException ex) {
//            LoggerFactory.getLogger(this.getClass()).error(ex.getMessage());
//            return null;
//        }
//    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
