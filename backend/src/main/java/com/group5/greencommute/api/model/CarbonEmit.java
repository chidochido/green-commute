package com.group5.greencommute.api.model;
import com.google.gson.Gson;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class CarbonEmit {
    public static double carbonElectCar(double distance,int passengers) throws Exception{
        Transcript ele = new Transcript();
        ele.setType("electricity");
        ele.setElectricity_unit("kwh");
        ele.setElectricity_value(0.32*distance);
        ele.setCountry("us");
        ele.setState("ga");
        Gson gson = new Gson();
        String jsonReq = gson.toJson(ele);

        HttpRequest postReq = HttpRequest.newBuilder()
                .uri(new URI("https://www.carboninterface.com/api/v1/estimates"))
                .header("Authorization"," Bearer UEtop2WHO8I36kLTBZqAw")
                .header("Content-Type","application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonReq))
                .build();
        HttpClient httpClient= HttpClient.newHttpClient();
        HttpResponse<String> postResponse = httpClient.send(postReq, HttpResponse.BodyHandlers.ofString());
        String tmp = postResponse.body();
        for( int i = tmp.length()-8;i>0;i--){
            if(tmp.charAt(i)=='c' && tmp.charAt(i+7)=='g'){
                String val = "";
                for(int j = i+10;true;j++){
                    if(tmp.charAt(j)==',')break;
                    val = val+tmp.charAt(j);
                }
                return Double.valueOf(val)/1000.0/(double)passengers;
            }
        }
        return 0.0;
    }

    public static double carbonElectScoot(double distance) throws Exception{
        Transcript ele = new Transcript();
        ele.setType("electricity");
        ele.setElectricity_unit("kwh");
        ele.setElectricity_value(0.0153*distance);
        ele.setCountry("us");
        ele.setState("ga");
        Gson gson = new Gson();
        String jsonReq = gson.toJson(ele);

        HttpRequest postReq = HttpRequest.newBuilder()
                .uri(new URI("https://www.carboninterface.com/api/v1/estimates"))
                .header("Authorization"," Bearer UEtop2WHO8I36kLTBZqAw")
                .header("Content-Type","application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonReq))
                .build();
        HttpClient httpClient= HttpClient.newHttpClient();
        HttpResponse<String> postResponse = httpClient.send(postReq, HttpResponse.BodyHandlers.ofString());
        String tmp = postResponse.body();
        for( int i = tmp.length()-8;i>0;i--){
            if(tmp.charAt(i)=='c' && tmp.charAt(i+7)=='g'){
                String val = "";
                for(int j = i+10;true;j++){
                    if(tmp.charAt(j)==',')break;
                    val = val+tmp.charAt(j);
                }
                return distance*Double.valueOf(val)/1000.0;
            }
        }
        return 0.0;
    }

    public static double carbonCar(double distance,int passengers) throws Exception{
        Transcript ele = new Transcript();
        ele.setType("vehicle");
        ele.setDistance_unit("mi");
        ele.setDistance_value(distance);
        ele.setCountry("us");
        ele.setState("ga");
        ele.setVehicle_model_id("82352d36-c214-4640-8e0a-afb418aa0b93");
        Gson gson = new Gson();
        String jsonReq = gson.toJson(ele);

        HttpRequest postReq = HttpRequest.newBuilder()
                .uri(new URI("https://www.carboninterface.com/api/v1/estimates"))
                .header("Authorization"," Bearer UEtop2WHO8I36kLTBZqAw")
                .header("Content-Type","application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonReq))
                .build();
        HttpClient httpClient= HttpClient.newHttpClient();
        HttpResponse<String> postResponse = httpClient.send(postReq, HttpResponse.BodyHandlers.ofString());
        String tmp = postResponse.body();
        for( int i = tmp.length()-8;i>0;i--){
            if(tmp.charAt(i)=='c' && tmp.charAt(i+7)=='g'){
                String val = "";
                for(int j = i+10;true;j++){
                    if(tmp.charAt(j)==',')break;
                    val = val+tmp.charAt(j);
                }
                return Double.valueOf(val)/1000.0/(double)passengers;
            }
        }
        return 0.0;
    }

    public static double carbonPublicTrans(double distance,int passengers) throws Exception{
        Transcript ele = new Transcript();
        ele.setType("vehicle");
        ele.setDistance_unit("mi");
        ele.setDistance_value(distance);
        ele.setCountry("us");
        ele.setState("ga");
        ele.setVehicle_model_id("08bbf5a3-1181-4a00-8a4e-4f97918c6d35");
        Gson gson = new Gson();
        String jsonReq = gson.toJson(ele);

        HttpRequest postReq = HttpRequest.newBuilder()
                .uri(new URI("https://www.carboninterface.com/api/v1/estimates"))
                .header("Authorization"," Bearer UEtop2WHO8I36kLTBZqAw")
                .header("Content-Type","application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonReq))
                .build();
        HttpClient httpClient= HttpClient.newHttpClient();
        HttpResponse<String> postResponse = httpClient.send(postReq, HttpResponse.BodyHandlers.ofString());
        String tmp = postResponse.body();
        for( int i = tmp.length()-8;i>0;i--){
            if(tmp.charAt(i)=='c' && tmp.charAt(i+7)=='g'){
                String val = "";
                for(int j = i+10;true;j++){
                    if(tmp.charAt(j)==',')break;
                    val = val+tmp.charAt(j);
                }
                return Double.valueOf(val)/1000.0/(double)passengers;
            }
        }
        return 0.0;
    }
}
