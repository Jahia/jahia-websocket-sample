<%@ taglib prefix="jcr" uri="http://www.jahia.org/tags/jcr" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="utility" uri="http://www.jahia.org/tags/utilityLib" %>
<%@ taglib prefix="template" uri="http://www.jahia.org/tags/templateLib" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<template:addResources type="css" resources="article.css"/>
<template:addResources type="javascript" resources="websocket.js"/>
<%--@elvariable id="currentNode" type="org.jahia.services.content.JCRNodeWrapper"--%>
<%--@elvariable id="renderContext" type="org.jahia.services.render.RenderContext"--%>

<h1>Collaborative Whiteboard App</h1>

<table>
    <tr>
        <td>
            <canvas id="myCanvas" width="150" height="150" style="border:1px solid #000000;"></canvas>
        </td>
        <td>
            <form name="inputForm">
                <table>
                    <tr>
                        <th>Color</th>
                        <td><input type="radio" name="color" value="#FF0000" checked="true">Red</td>
                        <td><input type="radio" name="color" value="#0000FF">Blue</td>
                        <td><input type="radio" name="color" value="#FF9900">Orange</td>
                        <td><input type="radio" name="color" value="#33CC33">Green</td>
                    </tr>

                    <tr>
                        <th>Shape</th>
                        <td><input type="radio" name="shape" value="square" checked="true">Square</td>
                        <td><input type="radio" name="shape" value="circle">Circle</td>
                        <td> </td>
                        <td> </td>
                    </tr>
                </table>
            </form>
        </td>
    </tr>
</table>

<div id="output"></div>