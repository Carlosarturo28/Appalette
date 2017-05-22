@import 'lib/util.js'
@import 'lib/colors.js'

// Hue Palette
function addHuePalette(groupIndex, hexColor, isWhite, valueIndex) {

  var swatchGroup = createGroup({
    parent: swatchesGroups[groupIndex],
    name: 'color',
    x: 0, y: valueIndex * 50,
    width: 200, height: 50
  });

  var colorBlock = createRectangle({
    parent: swatchGroup,
    name: hexColor,
    x: 0, y: 0,
    width: 200, height: 50
  });
  var colorBlockFill = colorBlock.style().addStylePartOfType(0);
  colorBlockFill.color = MSImmutableColor.colorWithSVGString(hexColor).newMutableCounterpart();

  var textColor = (isWhite === 1) ? '#FFF' : '#6d6d6d';

//NOMBRE PARA EL COLOR, PRÓXIMAMENTE :)
  /*var colorName = createText({
    parent: swatchGroup,
    stringValue: COLORS[valueIndex],
    name: COLORS[valueIndex],
    fontPostscriptName: 'Helvetica Neue Medium',
    fontSize: 14,
    textColor: MSImmutableColor.colorWithSVGString(textColor).newMutableCounterpart(),
    x: 10, y: 17
  });*/

  var colorText = createText({
    parent: swatchGroup,
    stringValue: hexColor,
    name: hexColor,
    fontPostscriptName: 'Helvetica Neue',
    fontSize: 14,
    textColor: MSImmutableColor.colorWithSVGString(textColor).newMutableCounterpart(),
    x: 130, y: 17
  });

}

