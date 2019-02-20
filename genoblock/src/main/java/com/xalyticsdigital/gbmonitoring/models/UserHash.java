package com.xalyticsdigital.gbmonitoring.models;

import java.time.LocalDateTime;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class UserHash extends BaseEntity {

    @Column(columnDefinition = "TEXT")
    private String hash;
    private Date fechaDeIngreso;
    private String email;
    private String password;
    private String nombreArchivo;

    public UserHash() {
    }

    public UserHash(String hash, Date fechaDeIngreso, String email, String password, String nombreArchivo) {
        this.hash = hash;
        this.fechaDeIngreso = fechaDeIngreso;
        this.email = email;
        this.password = password;
        this.nombreArchivo = nombreArchivo;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public String getHash() {
        return hash;
    }

    //@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public void setFechaDeIngreso(Date fechaDeIngreso) {
        this.fechaDeIngreso = fechaDeIngreso;
    }

    public Date getFechaDeIngreso() {
        return fechaDeIngreso;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public String getNombreArchivo() {
        return nombreArchivo;
    }

    public void setNombreArchivo(String nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

}
