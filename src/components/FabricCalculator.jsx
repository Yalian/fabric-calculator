import { useState } from 'react';
import InputForm from './InputForm';
import FabricVisualizer from './FabricVisualizer';
import ResultsPanel from './ResultsPanel';
import { optimizeFabricCutting } from '../utils/fabricOptimizer';
import './FabricCalculator.css';

function FabricCalculator() {
  const [result, setResult] = useState(null);

  const handleCalculate = (data) => {
    const calculationResult = optimizeFabricCutting(
      data.rollWidth,
      data.rollLength,
      data.pieceWidth,
      data.pieceHeight,
      data.pieceCount,
      data.margin
    );
    setResult(calculationResult);
  };

  return (
    <div className="fabric-calculator">
      <header className="app-header">
        <h1>📏 Calculadora de Tela para Cortes</h1>
        <p>Optimiza el uso de tela calculando la distribución perfecta de tus piezas</p>
      </header>

      <div className="calculator-container">
        <div className="left-panel">
          <InputForm onCalculate={handleCalculate} />
        </div>

        <div className="right-panel">
          <ResultsPanel result={result} />
          <FabricVisualizer result={result} />
        </div>
      </div>
    </div>
  );
}

export default FabricCalculator;
