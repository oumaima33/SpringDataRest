package org.cours.springdatarest;

import static org.assertj.core.api.Assertions.assertThat;
import org.cours.springdatarest.modele.Voiture;
import org.cours.springdatarest.modele.VoitureRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

@DataJpaTest
// Si le test concerne uniquement les composantes JPA
// Lorsque cette annotation est utilisée, H2, Hibernate et Spring Data sont configurés
// automatiquement pour le test.
public class VoitureRepoTest {

    @Autowired
    private TestEntityManager entityManager; // TestEntityManager pour manipuler les entités persistantes

    @Autowired
    private VoitureRepo voitureRepo;

    @Test
    public void ajouterVoiture() {
        Voiture voiture = new Voiture("MiolaCar", "Uber", "Blanche", "M-2020", 2021, 180000);
        entityManager.persistAndFlush(voiture);
        // permet de faire persister ce tuple de l’entité Voiture
        assertThat(voiture.getId()).isNotNull();
        // permet de tester qu'un tuple de Voiture a bien été ajouté en mémoire H2
    }

    @Test
    public void supprimerVoiture() {
        entityManager.persistAndFlush(new Voiture("MiolaCar", "Uber", "Blanche", "M-2020", 2021, 180000));
        entityManager.persistAndFlush(new Voiture("MiniCooper", "Uber", "Rouge", "C-2020", 2021, 180000));
        voitureRepo.deleteAll();
        assertThat(voitureRepo.findAll()).isEmpty();
        // permet de tester si tous les tuples ont été supprimés
    }
}
