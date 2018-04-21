
package com.xalyticsdigital.gbmonitoring.models;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class ShareUsers extends BaseEntity {
        
    @ManyToOne
    @JoinColumn(name = "propietario")
    private UserHash propietario;    
    @ManyToOne
    @JoinColumn(name = "cliente")
    private UserHash cliente;
    private Short isEnable;
    
    public ShareUsers(){
        
    }

    public ShareUsers(UserHash propietario, UserHash cliente, Short isEnable) {
        this.propietario = propietario;
        this.cliente = cliente;
        this.isEnable = isEnable;
    }       

    public UserHash getPropietario() {
        return propietario;
    }

    public void setPropietario(UserHash propietario) {
        this.propietario = propietario;
    }

    public UserHash getCliente() {
        return cliente;
    }

    public void setCliente(UserHash cliente) {
        this.cliente = cliente;
    }    

    public Short getIsEnable() {
        return isEnable;
    }

    public void setIsEnable(Short isEnable) {
        this.isEnable = isEnable;
    }
    
    
}
