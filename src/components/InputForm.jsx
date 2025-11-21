import { useState } from 'react';
import './InputForm.css';

function InputForm({ onCalculate }) {
  const [rollWidth, setRollWidth] = useState(1.4);
  const [rollLength, setRollLength] = useState(50);
  const [pieceWidth, setPieceWidth] = useState(30);
  const [pieceHeight, setPieceHeight] = useState(34);
  const [pieceCount, setPieceCount] = useState(100);
  const [margin, setMargin] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate({
      rollWidth: parseFloat(rollWidth),
      rollLength: parseFloat(rollLength),
      pieceWidth: parseFloat(pieceWidth),
      pieceHeight: parseFloat(pieceHeight),
      pieceCount: parseInt(pieceCount),
      margin: parseFloat(margin)
    });
  };

  return (
    <div className="input-form">
      <h2>Calculadora de Tela</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Dimensiones del Rollo</h3>
          <div className="form-group">
            <label>
              Ancho del rollo (metros)
              <input
                type="number"
                step="0.01"
                min="0.1"
                value={rollWidth}
                onChange={(e) => setRollWidth(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Largo del rollo (metros)
              <input
                type="number"
                step="0.5"
                min="1"
                value={rollLength}
                onChange={(e) => setRollLength(e.target.value)}
                required
              />
            </label>
          </div>
        </div>

        <div className="form-section">
          <h3>Dimensiones de la Pieza</h3>
          <div className="form-group">
            <label>
              Ancho de la pieza (cm)
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={pieceWidth}
                onChange={(e) => setPieceWidth(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Alto de la pieza (cm)
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={pieceHeight}
                onChange={(e) => setPieceHeight(e.target.value)}
                required
              />
            </label>
          </div>
        </div>

        <div className="form-section">
          <h3>Configuración</h3>
          <div className="form-group">
            <label>
              Cantidad de piezas
              <input
                type="number"
                min="1"
                value={pieceCount}
                onChange={(e) => setPieceCount(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Margen entre piezas (cm)
              <input
                type="number"
                step="0.1"
                min="0"
                value={margin}
                onChange={(e) => setMargin(e.target.value)}
                required
              />
            </label>
          </div>
        </div>

        <button type="submit" className="calculate-btn">
          Calcular
        </button>
      </form>
    </div>
  );
}

export default InputForm;
