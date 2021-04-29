window.addEventListener("DOMContentLoaded", (event) => {
    let wsUri = "ws://" + window.location.host + "/websocket/sample";
    let websocket = new WebSocket(wsUri);
    websocket.onerror = function(evt) { onError(evt) };
    websocket.onopen = function(evt) { onOpen(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };

    let output = document.getElementById("output");
    let canvas = document.getElementById("myCanvas");
    let context = canvas.getContext("2d");
    canvas.addEventListener("click", defineImage, false);

    // Websocket
    function writeToScreen(message) {
        output.innerHTML += message + "<br>";
    }

    function onOpen() {
        writeToScreen("Connected to " + wsUri);
    }

    function onError(evt) {
        writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
    }

    function sendText(json) {
        console.log("sending text: " + json);
        websocket.send(json);
    }

    function onMessage(evt) {
        console.log("received: " + evt.data);
        drawImageText(evt.data);
    }

    // Canvas
    function getCurrentPos(evt) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    function defineImage(evt) {
        let currentPos = getCurrentPos(evt);

        let color;
        for (i = 0; i < document.inputForm.color.length; i++) {
            if (document.inputForm.color[i].checked) {
                color = document.inputForm.color[i];
                break;
            }
        }

        let shape;
        for (i = 0; i < document.inputForm.shape.length; i++) {
            if (document.inputForm.shape[i].checked) {
                shape = document.inputForm.shape[i];
                break;
            }
        }

        let json = JSON.stringify({
            "shape": shape.value,
            "color": color.value,
            "coords": {
                "x": currentPos.x,
                "y": currentPos.y
            }
        });
        drawImageText(json);
        sendText(json);
    }

    function drawImageText(image) {
        console.log("drawImageText");
        let json = JSON.parse(image);
        context.fillStyle = json.color;
        switch (json.shape) {
            case "circle":
                context.beginPath();
                context.arc(json.coords.x, json.coords.y, 5, 0, 2 * Math.PI, false);
                context.fill();
                break;
            case "square":
            default:
                context.fillRect(json.coords.x, json.coords.y, 10, 10);
                break;
        }
    }
});

