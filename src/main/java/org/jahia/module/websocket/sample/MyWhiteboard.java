package org.jahia.module.websocket.sample;

import org.osgi.service.component.annotations.Component;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Component(immediate = true, service = Endpoint.class)
@ServerEndpoint(value="/sample", encoders = {FigureEncoder.class}, decoders = {FigureDecoder.class})
public class MyWhiteboard extends Endpoint {
    private static Set<Session> peers = Collections.synchronizedSet(new HashSet<>());

    public MyWhiteboard() {
        System.out.println("blabla");
    }

    @Override
    public void onOpen(Session session, EndpointConfig config) {
        session.addMessageHandler(Figure.class, message -> {
            System.out.println("broadcastFigure: " + message);
            for (Session peer : peers) {
                if (!peer.equals(session)) {
                    try {
                        peer.getBasicRemote().sendObject(message);
                    } catch (IOException | EncodeException e) {
                        e.printStackTrace();
                    }
                }
            }
        });
        peers.add(session);
    }

    @Override
    public void onClose(Session session, CloseReason closeReason) {
        peers.remove(session);
    }
}