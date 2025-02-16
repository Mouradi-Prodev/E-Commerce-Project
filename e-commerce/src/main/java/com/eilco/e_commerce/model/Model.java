package com.eilco.e_commerce.model;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Data;

import java.sql.Timestamp;
import java.time.Instant;

@MappedSuperclass
@Data
public abstract class Model {
    @Column(name = "created_at", nullable = true, updatable = false)
    private Timestamp created_at;

    @Column(name = "updated _at", nullable = true)
    private Timestamp updated_at;

    @PrePersist
    public void prePersist() {
        Timestamp now = Timestamp.from(Instant.now());
        this.created_at = now;
        this.updated_at = now;
    }

    @PreUpdate
    public void preUpdate() {
        this.updated_at = Timestamp.from(Instant.now());
    }


}
