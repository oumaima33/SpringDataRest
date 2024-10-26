package org.cours.springdatarest.web;

import org.cours.springdatarest.modele.Voiture;
import org.cours.springdatarest.modele.VoitureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class VoitureController {

    @Autowired
    private VoitureRepo voitureRepo;

    @GetMapping("/voitures")
    public Iterable<Voiture> getVoitures() {
        return voitureRepo.findAll();
    }

    @PostMapping("/voitures")
    public Voiture createVoiture(@RequestBody Voiture voiture) {
        return voitureRepo.save(voiture);  // Save the new car to the database
    }

    @DeleteMapping("/voitures/{id}")
    public void deleteVoiture(@PathVariable Long id) {
        voitureRepo.deleteById(id);  // Delete the car with the given ID
    }
    @PutMapping("/voitures/{id}")
    public Voiture updateVoiture(@PathVariable Long id, @RequestBody Voiture voiture) {
        Voiture existingVoiture = voitureRepo.findById(id).orElseThrow(() -> new RuntimeException("Voiture not found"));
        existingVoiture.setMarque(voiture.getMarque());
        existingVoiture.setModele(voiture.getModele());
        existingVoiture.setCouleur(voiture.getCouleur());
        existingVoiture.setImmatricule(voiture.getImmatricule());
        existingVoiture.setAnnee(voiture.getAnnee());
        existingVoiture.setPrix(voiture.getPrix());

        return voitureRepo.save(existingVoiture);  // Save the updated car
    }
    @GetMapping("/voitures/{id}")
    public Voiture getVoiture(@PathVariable Long id) {
        return voitureRepo.findById(id).orElseThrow(() -> new RuntimeException("Voiture not found"));
    }

}
