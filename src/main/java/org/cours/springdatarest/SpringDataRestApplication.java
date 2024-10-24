package org.cours.springdatarest;

import org.cours.springdatarest.modele.ProprietaireRepo;
import org.cours.springdatarest.modele.Voiture;
import org.cours.springdatarest.modele.Proprietaire;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.cours.springdatarest.modele.VoitureRepo; // Adjust the package based on your structure
import springfox.documentation.swagger2.annotations.EnableSwagger2;
@SpringBootApplication

public class SpringDataRestApplication {

	@Autowired
	private VoitureRepo repository;
	@Autowired
	ProprietaireRepo proprietaireRepo;

	public static void main(String[] args) {

		SpringApplication.run(SpringDataRestApplication.class, args);
	}
	@Bean
	CommandLineRunner runner(){
		return args -> {
			repository.save(new Voiture("Toyota", "Corolla", "Grise", "A-1-9090", 2018, 95000));
			repository.save(new Voiture("Ford", "Fiesta", "Rouge", "A-2-8090", 2015, 90000));
			repository.save(new Voiture("Honda", "CRV", "Bleu", "A-3-7090", 2016, 140000));
			// Create Proprietaires
			Proprietaire proprietaire1 = new Proprietaire("Ali", "Hassan");
			Proprietaire proprietaire2 = new Proprietaire("Najat", "Bani");
			proprietaireRepo.save(proprietaire1);
			proprietaireRepo.save(proprietaire2);

			// Save Voitures with assigned Proprietaires
			repository.save(new Voiture("Toyota", "Corolla", "Grise", "A-1-9090", 2018, 95000, proprietaire1));
			repository.save(new Voiture("Ford", "Fiesta", "Rouge", "A-2-8090", 2015, 90000, proprietaire1));
			repository.save(new Voiture("Honda", "CRV", "Bleu", "A-3-7090", 2016, 140000, proprietaire2));
		};
	}

}
