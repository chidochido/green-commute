package com.group5.greencommute.api.model;
public class Transcript {

    private String id;
    private String type;
    private String electricity_unit;
    private String country;
    private String state;
    private String distance_unit;
    private String vehicle_model_id;
    private double electricity_value, carbon_kg,distance_value;

    public String getDistance_unit() {
        return distance_unit;
    }

    public void setDistance_unit(String distance_unit) {
        this.distance_unit = distance_unit;
    }

    public String getVehicle_model_id() {
        return vehicle_model_id;
    }

    public void setVehicle_model_id(String vehicle_model_id) {
        this.vehicle_model_id = vehicle_model_id;
    }

    public double getDistance_value() {
        return distance_value;
    }

    public void setDistance_value(double distance_value) {
        this.distance_value = distance_value;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }
    public double getCarbon_kg() {
        return carbon_kg;
    }

    public void setCarbon_kg(double carbon_kg) {
        this.carbon_kg = carbon_kg;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getElectricity_unit() {
        return electricity_unit;
    }

    public void setElectricity_unit(String electricity_unit) {
        this.electricity_unit = electricity_unit;
    }

    public double getElectricity_value() {
        return electricity_value;
    }

    public void setElectricity_value(double electricity_value) {
        this.electricity_value = electricity_value;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }


}
