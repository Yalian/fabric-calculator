import './ResultsPanel.css';

function ResultsPanel({ result }) {
  if (!result) {
    return null;
  }

  if (!result.success) {
    return (
      <div className="results-panel error">
        <h3>Error en el cálculo</h3>
        <p>{result.error}</p>
      </div>
    );
  }

  return (
    <div className="results-panel">
      <h3>Resultados del Cálculo</h3>

      <div className="results-grid">
        <div className="result-card primary">
          <div className="result-label">
            {result.hasFolds ? 'Tela Total (con dobleces)' : 'Tela Necesaria'}
          </div>
          <div className="result-value">
            {result.fabricLengthWithFoldsMeters.toFixed(2)} m
          </div>
          <div className="result-detail">
            {result.hasFolds && (
              <span>{result.fabricLengthNeededMeters.toFixed(2)}m + {(result.totalFoldWaste / 100).toFixed(2)}m desperdicio<br/></span>
            )}
            {result.rollsNeeded > 1
              ? `Requiere ${result.rollsNeeded} rollos`
              : 'Cabe en 1 rollo'}
          </div>
        </div>

        <div className="result-card">
          <div className="result-label">Piezas por Fila</div>
          <div className="result-value">{result.piecesPerRow}</div>
          <div className="result-detail">en el ancho del rollo</div>
        </div>

        <div className="result-card">
          <div className="result-label">Filas Necesarias</div>
          <div className="result-value">{result.rowsNeeded}</div>
          <div className="result-detail">
            para {result.totalPiecesPlaced} piezas
          </div>
        </div>

        {result.hasFolds && (
          <div className="result-card info">
            <div className="result-label">Dobleces de Tela</div>
            <div className="result-value">{result.foldsNeeded}</div>
            <div className="result-detail">
              {result.foldWasteCm}cm por doblez
            </div>
          </div>
        )}

        <div className="result-card">
          <div className="result-label">Eficiencia</div>
          <div className="result-value">{result.efficiency}%</div>
          <div className="result-detail">aprovechamiento de tela</div>
        </div>

        <div className="result-card">
          <div className="result-label">Desperdicio</div>
          <div className="result-value">{result.wastedArea} m²</div>
          <div className="result-detail">área no utilizada</div>
        </div>

        {!result.fitsInRoll && (
          <div className="result-card warning">
            <div className="result-label">⚠️ Advertencia</div>
            <div className="result-detail">
              La cantidad de piezas requiere {result.rollsNeeded} rollos de tela
            </div>
          </div>
        )}
      </div>

      <div className="purchase-recommendation">
        <h4>Recomendación de Compra</h4>
        <p>
          Para realizar {result.totalPiecesPlaced} piezas, necesitas comprar:
        </p>
        <ul>
          <li>
            <strong>Ancho:</strong> {(result.rollWidthCm / 100).toFixed(2)} metros (ancho del rollo)
          </li>
          <li>
            <strong>Largo:</strong> {result.fabricLengthWithFoldsMeters.toFixed(2)} metros
            {result.hasFolds && (
              <span> (incluye {(result.totalFoldWaste / 100).toFixed(2)}m de desperdicio por {result.foldsNeeded} doblez/ces)</span>
            )}
            {result.rollsNeeded > 1 &&
              ` - Requiere ${result.rollsNeeded} rollos`}
          </li>
          <li>
            <strong>Total:</strong> {((result.rollWidthCm / 100) * result.fabricLengthWithFoldsMeters).toFixed(2)} m²
          </li>
        </ul>
        {result.hasFolds && (
          <div className="fold-info">
            ℹ️ La tela se doblará {result.foldsNeeded} vez/ces sobre la mesa de {(result.cuttingTableLengthCm / 100).toFixed(2)}m para facilitar el corte.
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultsPanel;
