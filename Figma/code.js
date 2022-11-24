"use strict";
// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    const nodes = [];
    console.log(msg.colors[0]);
    for (let i = 0; i < msg.numberOfColors; i++) {
        const circle = figma.createEllipse();
        circle.resize(80, 80);
        circle.x = i * 100;
        circle.fills = [{
                type: 'SOLID',
                color: {
                    r: msg.colors[i].r / 255,
                    g: msg.colors[i].g / 255,
                    b: msg.colors[i].b / 255
                }
            }];
        figma.currentPage.appendChild(circle);
        nodes.push(circle);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
};
