/**
 * Optimiza la distribución de piezas en un rollo de tela
 * Usa algoritmo de bin packing 2D para minimizar desperdicio
 */

export function optimizeFabricCutting(rollWidth, rollLength, pieceWidth, pieceHeight, pieceCount, margin = 0, cuttingTableLength = 0, foldWaste = 5) {
  // Convertir todo a centímetros para facilitar cálculos
  const rollWidthCm = rollWidth * 100;
  const rollLengthCm = rollLength * 100;
  const pieceWidthCm = pieceWidth;
  const pieceHeightCm = pieceHeight;
  const marginCm = margin;
  const cuttingTableLengthCm = cuttingTableLength * 100;
  const foldWasteCm = foldWaste;

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

  // Calcular longitud de tela necesaria (sin considerar dobleces aún)
  const fabricLengthNeeded = rowsNeeded * totalPieceHeight;

  // Calcular desperdicio por dobleces si se especifica una mesa de corte
  let foldsNeeded = 0;
  let totalFoldWaste = 0;
  let fabricLengthWithFolds = fabricLengthNeeded;

  if (cuttingTableLengthCm > 0 && fabricLengthNeeded > cuttingTableLengthCm) {
    // Número de dobleces necesarios (restar 1 porque el primer tramo no es un doblez)
    foldsNeeded = Math.ceil(fabricLengthNeeded / cuttingTableLengthCm) - 1;
    // Desperdicio total por todos los dobleces
    totalFoldWaste = foldsNeeded * foldWasteCm;
    // Longitud total incluyendo desperdicio
    fabricLengthWithFolds = fabricLengthNeeded + totalFoldWaste;
  }

  const fabricLengthNeededMeters = fabricLengthNeeded / 100;
  const fabricLengthWithFoldsMeters = fabricLengthWithFolds / 100;

  // Verificar si cabe en el rollo disponible
  const fitsInRoll = fabricLengthWithFolds <= rollLengthCm;

  // Calcular eficiencia (basado en longitud sin dobleces)
  const usedArea = pieceCount * (pieceWidthCm * pieceHeightCm);
  const totalArea = rollWidthCm * fabricLengthNeeded;
  const efficiency = (usedArea / totalArea) * 100;
  const wastedArea = totalArea - usedArea;
  const foldWasteArea = (rollWidthCm * totalFoldWaste) / 10000; // en m²

  // Generar layout para visualización
  const layout = generateLayout(piecesPerRow, rowsNeeded, pieceCount,
                                pieceWidthCm, pieceHeightCm, marginCm);

  // Calcular cuántos rollos se necesitan si no cabe en uno
  const rollsNeeded = Math.ceil(fabricLengthWithFolds / rollLengthCm);

  return {
    success: true,
    piecesPerRow,
    rowsNeeded,
    fabricLengthNeeded,
    fabricLengthNeededMeters,
    fabricLengthWithFolds,
    fabricLengthWithFoldsMeters,
    foldsNeeded,
    foldWasteCm,
    totalFoldWaste,
    foldWasteArea: foldWasteArea.toFixed(2),
    totalPiecesPlaced: pieceCount,
    efficiency: efficiency.toFixed(2),
    wastedArea: (wastedArea / 10000).toFixed(2), // en metros cuadrados
    fitsInRoll,
    rollsNeeded,
    layout,
    rollWidthCm,
    pieceWidthCm,
    pieceHeightCm,
    marginCm,
    cuttingTableLengthCm,
    hasFolds: foldsNeeded > 0
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
