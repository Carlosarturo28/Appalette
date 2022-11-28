import { getTextColor } from "./contrast";

figma.showUI(__html__, { themeColors: true, height: 300 });

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.

const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16)/255,
    g: parseInt(result[2], 16)/255,
    b: parseInt(result[3], 16)/255
  } : null;
}

figma.ui.onmessage = async msg => {
  await figma.loadFontAsync({ family: "Poppins", style: "Regular" })

  const brandLabel = figma.createText();
  brandLabel.fontName = {family: 'Poppins', style: 'Regular'}
  brandLabel.fontSize = 24
  brandLabel.fills = [{
    type: 'SOLID',
    color: {
      r: 0.3,
      g: 0.3,
      b: 0.3
    }
  }]
  brandLabel.characters = msg.brandName
  brandLabel.y = -40

  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  const nodes: SceneNode[] = [];
  for (let i = 0; i < msg.numberOfColors; i++) {
    const hexValue = msg.colors[i]

    // Label
    const hexLabel = figma.createText();
    hexLabel.fontName = {family: 'Poppins', style: 'Regular'}
    hexLabel.fontSize = 12
    hexLabel.fills = [{
      type: 'SOLID',
      color: getTextColor(hexValue)
    }]
    hexLabel.characters = hexValue.toUpperCase()
    hexLabel.x = (i * 90) + 8
    hexLabel.y = 60

    // Color
    const color = figma.createRectangle();
    color.resize(80, 80)
    color.x = i * 90;
    color.cornerRadius = 8;
    color.cornerSmoothing = 0.6;
    color.fills = [{
      type: 'SOLID',
      color: hexToRgb(hexValue)
    }]

    figma.currentPage.appendChild(color);
    figma.currentPage.appendChild(hexLabel);
    nodes.push(hexLabel, color)
  }

  figma.currentPage.appendChild(brandLabel);

  nodes.push(brandLabel)

  // Create the group with the palette
  figma.group(nodes, figma.currentPage).name = msg.brandName
  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);

  figma.closePlugin();
};
