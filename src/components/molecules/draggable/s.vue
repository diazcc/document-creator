<template>
    <div
      ref="draggable"
      class="draggable-box"
      :style="{
        width: `${boxWidth}px`,
        height: `${boxHeight}px`,
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
      }"
    >
      <p>Haz click</p>
      <!-- Agrega el controlador de rotación en la esquina superior derecha -->
      <div ref="rotationHandle" class="rotation-handle"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import interact from 'interactjs';
  
  // Estado de tamaño inicial del cuadro
  const boxWidth = ref(200);
  const boxHeight = ref(65);
  
  // Posición inicial del cuadro
  const position = ref({ x: 0, y: 0 });
  
  // Rotación inicial del cuadro
  const rotation = ref(0);
  
  // Relación de aspecto fija
  const aspectRatio = 3;
  
  const draggable = ref(null);
  const rotationHandle = ref(null);
  
  onMounted(() => {
    // Hacer que el elemento sea "draggable" o arrastrable
    interact(draggable.value)
      .draggable({
        listeners: {
          move(event) {
            // Actualizar posición en el arrastre
            position.value.x += event.dx;
            position.value.y += event.dy;
          },
        },
      })
      .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        listeners: {
          move(event) {
            // Actualizar dimensiones del cuadro durante la redimensión
            boxWidth.value = event.rect.width;
            boxHeight.value = event.rect.height;
          },
        },
        modifiers: [
        interact.modifiers.aspectRatio({
            ratio: aspectRatio, // Definir la relación de aspecto fija (proporcional)
          }),
          interact.modifiers.restrictSize({
            min: { width: 50, height: 50 },
            max: { width: 300, height: 300 },
          }),
        ],
      });
  
    // Configuración para rotar usando el controlador de rotación
    interact(rotationHandle.value).draggable({
      listeners: {
        move(event) {
          // Obtener el centro del cuadro para calcular la rotación
          const box = draggable.value.getBoundingClientRect();
          const center = {
            x: box.left + box.width / 2,
            y: box.top + box.height / 2,
          };
          // Calcular el ángulo basado en el movimiento del controlador
          const angle = Math.atan2(event.clientY - center.y, event.clientX - center.x);
          rotation.value = (angle * (180 / Math.PI));
        },
      },
    });
  });
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
    border: 3px dashed $blue;
    transition: box-shadow 0.2s;
    min-width:200px;
    max-width:300px;
    min-height: 65px;
    max-height:100px;
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
  </style>
  