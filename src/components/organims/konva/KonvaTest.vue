<template>
    <div>
      <div
        v-for="(square, index) in squares"
        :key="square.id"
        class="square"
        :style="{
          top: square.y + 'px',
          left: square.x + 'px',
          transform: `translate(-50%, -50%)`,
          backgroundColor: square.isOpen ? 'lightgray' : 'red'
        }"
        @click="toggleList(index)"
        @mousedown="startDrag(index, $event)"
        @mouseup="stopDrag"
        @mousemove="onMouseMove"
      >
        <div v-if="square.isOpen" class="list">
          <ul>
            <li v-for="name in square.names" :key="name">{{ name }}</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  const props :any = defineProps(['dataKonva']);
  
  const squares = ref([]);
  let currentDragIndex = ref(null);
  let offsetX = ref(0);
  let offsetY = ref(0);
  
  props.dataKonva.addSquare = () => {
    const newSquare = {
      id: Date.now(),
      x: Math.random() * (window.innerWidth - 100), // Genera una posición aleatoria dentro de la ventana
      y: Math.random() * (window.innerHeight - 100),
      isOpen: false,
      names: [`Nombre 1`, `Nombre 2`, `Nombre 3`]
    };
    squares.value.push(newSquare);
  };
  
  const toggleList = (index) => {
    squares.value[index].isOpen = !squares.value[index].isOpen;
  };
  
  const startDrag = (index, event) => {
    currentDragIndex.value = index;
    offsetX.value = event.clientX - squares.value[index].x;
    offsetY.value = event.clientY - squares.value[index].y;
  };
  
  const stopDrag = () => {
    currentDragIndex.value = null;
  };
  
  const onMouseMove = (event) => {
    if (currentDragIndex.value !== null) {
      squares.value[currentDragIndex.value].x = event.clientX - offsetX.value;
      squares.value[currentDragIndex.value].y = event.clientY - offsetY.value;
    }
  };
  
  // Gestionar eventos globales para el drag
  const onMouseUp = () => stopDrag();
  const onMouseMoveGlobal = (event) => onMouseMove(event);
  


  
  onMounted(() => {
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMoveGlobal);
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('mousemove', onMouseMoveGlobal);
  });
  </script>
  
  <style>
  .square {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: grab;
    border: 2px solid darkred;
    z-index: 1;
  }
  
  .square:hover {
    background-color: darkred; /* Cambia el color al pasar el ratón */
  }
  
  .list {
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 10; /* Asegúrate de que el listado esté por encima de otros elementos */
  }
  </style>
  