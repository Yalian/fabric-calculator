# 📏 Calculadora de Tela para Cortes

Una aplicación web que optimiza el uso de tela calculando la distribución perfecta de piezas para confección de prendas.

## 🌟 Características

- **Optimización Inteligente**: Algoritmo de bin packing 2D que minimiza el desperdicio de tela
- **Cálculo de Dobleces**: Considera el desperdicio al doblar la tela sobre la mesa de corte
- **Márgenes Configurables**: Define espacios entre piezas para el corte
- **Visualización Gráfica**: Representación visual con Canvas de cómo se distribuyen las piezas
- **Resultados Detallados**: Muestra eficiencia, desperdicio, número de dobleces y más
- **Diseño Responsivo**: Funciona en desktop y móvil
- **Interfaz Intuitiva**: Fácil de usar con formularios claros y ayuda contextual

## 🚀 Demo en Vivo

👉 [https://yalian.github.io/fabric-calculator/](https://yalian.github.io/fabric-calculator/)

## 💻 Instalación Local

```bash
# Clonar el repositorio
git clone git@github.com:Yalian/fabric-calculator.git
cd fabric-calculator

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Build para producción
npm run build
```

## 🎯 Cómo Usar

1. **Dimensiones del Rollo**: Ingresa el ancho y largo del rollo de tela disponible
2. **Dimensiones de la Pieza**: Define las medidas de cada pieza a cortar (en cm)
3. **Configuración**: Especifica la cantidad de piezas y márgenes de corte
4. **Mesa de Corte**: Si tu mesa es más corta que la tela, configura su largo y el desperdicio por doblez
5. **Calcular**: Obtén resultados detallados y visualización gráfica

## 🔧 Tecnologías

- React + Vite
- Canvas API para visualización
- CSS moderno con gradientes
- Algoritmo de optimización 2D personalizado
- Playwright para testing visual

## 📊 Ejemplo de Cálculo

Para 100 piezas de 30cm × 34cm en un rollo de 1.4m × 50m:
- **Piezas por fila**: 4 (en el ancho del rollo)
- **Filas necesarias**: 25
- **Tela necesaria**: 8.75m
- **Con mesa de 2m**: 4 dobleces → 8.95m total (incluye 0.20m de desperdicio)
- **Eficiencia**: 83.27%

## 📝 Licencia

MIT

## 👤 Autor

Yalian García
