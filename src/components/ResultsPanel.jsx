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
          <div className="result-label">Tela Necesaria</div>
          <div className="result-value">
            {result.fabricLengthNeededMeters.toFixed(2)} m
          </div>
          <div className="result-detail">
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
            <strong>Largo:</strong> {result.fabricLengthNeededMeters.toFixed(2)} metros
            {result.rollsNeeded > 1 &&
              ` (o ${result.rollsNeeded} rollos completos)`}
          </li>
          <li>
            <strong>Total:</strong> {((result.rollWidthCm / 100) * result.fabricLengthNeededMeters).toFixed(2)} m²
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ResultsPanel;
