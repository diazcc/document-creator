<template>
  <div>
    <label>
      <input type="checkbox" v-model="isDrawingEnabled" />
      Habilitar Dibujo
    </label>
    <button @click="downloadImage">Descargar Imagen</button>

    <div
      ref="draggable"
      class="draggable-box"
      :style="{
        width: `${boxWidth}px`,
        height: `${boxHeight}px`,
        top: position.y + 'px',
        left: position.x + 'px',
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }"
    >
      <canvas
        ref="canvas"
        class="drawing-canvas"
        :width="boxWidth"
        :height="boxHeight"
        @mousedown="startDrawing"
        @mouseup="stopDrawing"
        @mousemove="draw"
      ></canvas>
       
      <p>{{ isDrawingEnabled ? 'Dibuja':'Haz clic' }}</p>
      <div ref="rotationHandle" class="rotation-handle"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import interact from 'interactjs';

const boxWidth = ref(200); // Ancho inicial de la caja arrastrable
const boxHeight = ref(65); // Altura inicial de la caja arrastrable
const position = ref({ x: 200, y: 200 }); // Posición inicial de la caja
const rotation = ref(0); // Ángulo de rotación inicial de la caja
const isDrawingEnabled = ref(false); // Indica si el dibujo en el canvas está habilitado
const isDrawing = ref(false); // Estado de dibujo activo o inactivo
const lastX = ref(0); // Última posición X del dibujo en el canvas
const lastY = ref(0); // Última posición Y del dibujo en el canvas
const draggable = ref(null); // Referencia a la caja arrastrable
const rotationHandle = ref(null); // Referencia al controlador de rotación
const canvas = ref(null); // Referencia al canvas de dibujo

onMounted(() => {
  // Configura el arrastre utilizando interact.js
  interact(draggable.value)
    .draggable({
      listeners: {
        move(event) {
          if (!isDrawingEnabled.value) {
            position.value.x += event.dx;
            position.value.y += event.dy;
          }
        },
        end(event) {
          handleDrop(event); // Llama a `handleDrop` al finalizar el arrastre
        },
      },
    })
    .resizable({
      edges: { left: true, right: true, bottom: true, top: true },
      listeners: {
        move(event) {
          boxWidth.value = event.rect.width;
          boxHeight.value = event.rect.height;
        },
      },
      modifiers: [
        interact.modifiers.aspectRatio({ ratio: 3 }), // Mantiene una proporción de aspecto 3:1
        interact.modifiers.restrictSize({
          min: { width: 50, height: 50 },
          max: { width: 300, height: 300 },
        }),
      ],
    });

  // Configura la rotación utilizando interact.js
  interact(rotationHandle.value).draggable({
    listeners: {
      move(event) {
        const box = draggable.value.getBoundingClientRect();
        const center = {
          x: box.left + box.width / 2,
          y: box.top + box.height / 2,
        };
        const angle = Math.atan2(event.clientY - center.y, event.clientX - center.x);
        rotation.value = angle * (180 / Math.PI); // Convierte el ángulo a grados
      },
    },
  });
});

// Maneja el evento de soltar el elemento sobre un área objetivo
function handleDrop(event) {
  const dropX = position.value.x + boxWidth.value / 2;
  const dropY = position.value.y + boxHeight.value / 2;
  const elementsAtPoint = document.elementsFromPoint(dropX, dropY);
  const droppedOnSquare = elementsAtPoint.find((el) =>
    el.classList.contains('seccion-con-scroll__square')
  );

  if (droppedOnSquare) {
    console.log('Elemento soltado sobre un .seccion-con-scroll__square');
    appendToDropTarget(droppedOnSquare);
  } else {
    console.log('Elemento no fue soltado sobre un .seccion-con-scroll__square');
  }
}

// Anexa el elemento arrastrable al área de destino
function appendToDropTarget(targetElement) {
  if (targetElement) {
    targetElement.appendChild(draggable.value);
    position.value = { x: 0, y: 0 };
  }
}

// Funciones de dibujo
const startDrawing = (event) => {
  if (isDrawingEnabled.value) {
    isDrawing.value = true;
    const rect = canvas.value.getBoundingClientRect();
    lastX.value = event.clientX - rect.left;
    lastY.value = event.clientY - rect.top;
  }
};

const stopDrawing = () => {
  isDrawing.value = false;
  const ctx = canvas.value.getContext('2d');
  ctx.beginPath(); // Termina la ruta actual
};

const draw = (event) => {
  if (!isDrawing.value || !isDrawingEnabled.value) return;

  const ctx = canvas.value.getContext('2d');
  const rect = canvas.value.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  ctx.beginPath();
  ctx.moveTo(lastX.value, lastY.value); // Mueve a la última posición
  ctx.lineTo(x, y); // Dibuja una línea a la nueva posición
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  lastX.value = x;
  lastY.value = y;
};

// Descarga el contenido del canvas como imagen
const downloadImage = () => {
  const link = document.createElement('a');
  link.download = 'dibujo.png';
  link.href = canvas.value.toDataURL('image/png');
  link.click();
};
</script>


<style scoped lang="scss">
.draggable-box {
  background-color: white;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: move;
  user-select: none;
  position: absolute;
  border: 3px dashed blue;
  transition: box-shadow 0.2s;
  min-width: 200px;
  max-width: 300px;
  min-height: 65px;
  max-height: 100px;
  z-index: 1;
}

.draggable-box:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.rotation-handle {
  width: 10px;
  height: 10px;
  background-color: red;
  position: absolute;
  top: -15px;
  right: -15px;
  border-radius: 50%;
  cursor: pointer;
}

.drawing-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
