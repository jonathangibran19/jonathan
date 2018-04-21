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
    private String email;
    private String password;
    private String nombreArchivo;

    public UserHash() {
    }

    public UserHash(String hash, LocalDateTime fechaDeIngreso, String email, String password, String nombreArchivo) {
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
    public LocalDateTime getFechaDeIngreso() {
        return fechaDeIngreso;
    }

    public void setFechaDeIngreso(LocalDateTime fechaDeIngreso) {
        this.fechaDeIngreso = fechaDeIngreso;
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
