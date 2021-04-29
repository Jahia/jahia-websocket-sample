package org.jahia.module.websocket.sample;

import org.json.JSONException;
import org.json.JSONObject;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

public class FigureDecoder implements Decoder.Text<Figure>{
    @Override
    public Figure decode(String string) throws DecodeException {
        JSONObject jsonObject;
        try {
            jsonObject = new JSONObject(string);
        } catch (JSONException e) {
            throw new DecodeException(string, e.getMessage(), e);
        }
        return new Figure(jsonObject);
    }

    @Override
    public boolean willDecode(String string) {
        try {
            new JSONObject(string);
            return true;
        } catch (JSONException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public void init(EndpointConfig ec) {
        System.out.println("init");
    }

    @Override
    public void destroy() {
        System.out.println("destroy");
    }
}
