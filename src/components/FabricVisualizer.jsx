import { useEffect, useRef } from 'react';
import './FabricVisualizer.css';

function FabricVisualizer({ result }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!result || !result.success || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Configurar tamaño del canvas
    const padding = 40;
    const containerWidth = canvas.parentElement.clientWidth;
    const availableWidth = containerWidth - padding * 2;

    // Calcular escala basada en el ancho (siempre usar el ancho completo disponible)
    const scale = Math.min(availableWidth / result.rollWidthCm, 1);

    const displayWidth = result.rollWidthCm * scale;
    const displayHeight = result.fabricLengthNeeded * scale;

    canvas.width = containerWidth;
    canvas.height = displayHeight + padding * 2;

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar fondo del rollo
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(padding, padding, displayWidth, displayHeight);

    // Dibujar borde del rollo
    ctx.strokeStyle = '#495057';
    ctx.lineWidth = 2;
    ctx.strokeRect(padding, padding, displayWidth, displayHeight);

    // Dibujar piezas
    result.layout.forEach((piece, index) => {
      const x = padding + piece.x * scale;
      const y = padding + piece.y * scale;
      const width = piece.width * scale;
      const height = piece.height * scale;

      // Dibujar pieza
      ctx.fillStyle = '#4CAF50';
      ctx.fillRect(x, y, width, height);

      // Dibujar borde de pieza
      ctx.strokeStyle = '#2E7D32';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, width, height);

      // Dibujar número de pieza si el tamaño es suficiente
      if (width > 20 && height > 20) {
        ctx.fillStyle = 'white';
        ctx.font = `${Math.min(width / 3, height / 3, 12)}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(index + 1, x + width / 2, y + height / 2);
      }

      // Dibujar márgenes si existen
      if (result.marginCm > 0) {
        const marginWidth = result.marginCm * scale;
        ctx.strokeStyle = '#FF9800';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        ctx.strokeRect(x, y, width + marginWidth, height + marginWidth);
        ctx.setLineDash([]);
      }
    });

    // Dibujar leyenda de dimensiones
    ctx.fillStyle = '#212529';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Ancho: ${(result.rollWidthCm / 100).toFixed(2)}m`, padding, padding - 5);
    ctx.textAlign = 'right';
    ctx.fillText(`Largo necesario: ${(result.fabricLengthNeeded / 100).toFixed(2)}m`,
                 canvas.width - padding, padding - 5);

  }, [result]);

  if (!result) {
    return (
      <div className="visualizer-placeholder">
        <p>Ingresa los datos y haz clic en "Calcular" para ver la distribución</p>
      </div>
    );
  }

  if (!result.success) {
    return (
      <div className="visualizer-error">
        <p>❌ {result.error}</p>
      </div>
    );
  }

  return (
    <div className="fabric-visualizer">
      <h3>Distribución de Piezas</h3>
      <div className="canvas-container">
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className="legend">
        <div className="legend-item">
          <span className="legend-color piece"></span>
          <span>Pieza de tela</span>
        </div>
        {result.marginCm > 0 && (
          <div className="legend-item">
            <span className="legend-color margin"></span>
            <span>Margen de corte</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default FabricVisualizer;
