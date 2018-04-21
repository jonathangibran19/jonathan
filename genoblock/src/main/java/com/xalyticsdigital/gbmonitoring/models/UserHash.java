package com.xalyticsdigital.gbmonitoring.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class UserHash extends BaseEntity {

    @Column(columnDefinition = "TEXT")
    private String hash;
    private LocalDateTime fechaDeIngreso;

    public UserHash() {
    }

    public UserHash(String hash) {
        this.hash = hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public String getHash() {
        return hash;
    }

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public LocalDateTime getFechaDeIngreso() {
        return fechaDeIngreso;
    }

    public void setFechaDeIngreso(LocalDateTime fechaDeIngreso) {
        this.fechaDeIngreso = fechaDeIngreso;
    }

}
