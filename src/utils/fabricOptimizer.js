/**
 * Optimiza la distribución de piezas en un rollo de tela
 * Usa algoritmo de bin packing 2D para minimizar desperdicio
 */

export function optimizeFabricCutting(rollWidth, rollLength, pieceWidth, pieceHeight, pieceCount, margin = 0) {
  // Convertir todo a centímetros para facilitar cálculos
  const rollWidthCm = rollWidth * 100;
  const rollLengthCm = rollLength * 100;
  const pieceWidthCm = pieceWidth;
  const pieceHeightCm = pieceHeight;
  const marginCm = margin;

  // Dimensiones de pieza con margen
  const totalPieceWidth = pieceWidthCm + marginCm;
  const totalPieceHeight = pieceHeightCm + marginCm;

  // Calcular cuántas piezas caben horizontalmente en el ancho del rollo
  const piecesPerRow = Math.floor(rollWidthCm / totalPieceWidth);

  if (piecesPerRow === 0) {
    return {
      success: false,
      error: 'Las piezas son más anchas que el rollo de tela',
      piecesPerRow: 0,
      rowsNeeded: 0,
      fabricLengthNeeded: 0,
      fabricLengthNeededMeters: 0,
      totalPiecesPlaced: 0,
      efficiency: 0,
      wastedArea: 0,
      layout: []
    };
  }

  // Calcular cuántas filas necesitamos
  const rowsNeeded = Math.ceil(pieceCount / piecesPerRow);

  // Calcular longitud de tela necesaria
  const fabricLengthNeeded = rowsNeeded * totalPieceHeight;
  const fabricLengthNeededMeters = fabricLengthNeeded / 100;

  // Verificar si cabe en el rollo disponible
  const fitsInRoll = fabricLengthNeeded <= rollLengthCm;

  // Calcular eficiencia
  const usedArea = pieceCount * (pieceWidthCm * pieceHeightCm);
  const totalArea = rollWidthCm * fabricLengthNeeded;
  const efficiency = (usedArea / totalArea) * 100;
  const wastedArea = totalArea - usedArea;

  // Generar layout para visualización
  const layout = generateLayout(piecesPerRow, rowsNeeded, pieceCount,
                                pieceWidthCm, pieceHeightCm, marginCm);

  // Calcular cuántos rollos se necesitan si no cabe en uno
  const rollsNeeded = Math.ceil(fabricLengthNeeded / rollLengthCm);

  return {
    success: true,
    piecesPerRow,
    rowsNeeded,
    fabricLengthNeeded,
    fabricLengthNeededMeters,
    totalPiecesPlaced: pieceCount,
    efficiency: efficiency.toFixed(2),
    wastedArea: (wastedArea / 10000).toFixed(2), // en metros cuadrados
    fitsInRoll,
    rollsNeeded,
    layout,
    rollWidthCm,
    pieceWidthCm,
    pieceHeightCm,
    marginCm
  };
}

function generateLayout(piecesPerRow, rowsNeeded, totalPieces, pieceWidth, pieceHeight, margin) {
  const layout = [];
  let pieceIndex = 0;

  for (let row = 0; row < rowsNeeded; row++) {
    for (let col = 0; col < piecesPerRow && pieceIndex < totalPieces; col++) {
      layout.push({
        x: col * (pieceWidth + margin),
        y: row * (pieceHeight + margin),
        width: pieceWidth,
        height: pieceHeight,
        index: pieceIndex
      });
      pieceIndex++;
    }
  }

  return layout;
}

export function convertToMeters(cm) {
  return (cm / 100).toFixed(2);
}

export function convertToCm(meters) {
  return meters * 100;
}
