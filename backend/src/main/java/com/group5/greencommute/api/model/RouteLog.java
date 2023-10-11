package com.group5.greencommute.api.model;

public class RouteLog {
    private int dist;
    private String start;
    private String destination;
    
    enum TransportMethod {
        GAS_CAR,
        ELECTRIC_CAR,
        WALK,
        BIKE,
        E_SCOOTER,
        PUBLIC_TRANSPORT,
        CARPOOL
    }
    private TransportMethod method;

    public RouteLog(int dist, String start, String destination, TransportMethod method) {
        this.dist = dist;
        this.start = start;
        this.destination = destination;
        this.method = method;
    }

    public int getDist() {
        return this.dist;
    }

    public String getStart() {
        return this.start;
    }

    public String getDestination() {
        return this.destination;
    }

    public String getMethod() {
        return this.method.toString();
    }
}
