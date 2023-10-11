package com.group5.greencommute.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.group5.greencommute.api.model.CarbonEmit;

@RestController
@RequestMapping("/emissionCalc")
public class CO2EmissionController {
    
    @GetMapping("/gas-car")
    public double getGasCarEmission(@RequestParam double distance, @RequestParam int passengers) throws Exception {
        return CarbonEmit.carbonCar(distance, passengers);
    }

    @GetMapping("/electric-car")
    public double getElectricCarEmission(@RequestParam double distance, @RequestParam int passengers) throws Exception {
        return CarbonEmit.carbonElectCar(distance, passengers);
    }

    @GetMapping("/electric-scooter")
    public double getElectricScooterEmission(@RequestParam double distance) throws Exception {
        return CarbonEmit.carbonElectScoot(distance);
    }

    @GetMapping("/public-transport")
    public double getPublicTransportEmission(@RequestParam double distance, @RequestParam int passengers) throws Exception {
        return CarbonEmit.carbonPublicTrans(distance, passengers);
    }
}
