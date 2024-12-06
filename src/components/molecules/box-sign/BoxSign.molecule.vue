<!--
    
        todo  COMPONENT BOX SIGN

        ? This component must be modified with supervision


        !       IF YOU DON'T GOOD EXPERIENCE WITH THIS STRUCTURE CODE, DON'T THE COMPONENT.


        const dataBoxSign: any = { //Define interface 
            config: {
                canSign: false,
                canDraw: false,
                canMove: false,
                canRotate: false,
                canDefineSign: false,
                canDuplicate: false,
                canDelete: false,
                canResize: false,
            },
            data: {
                width: 200,
                height: 65,
                userEmail: '@email',
                imgUserSign: 'base:64 / url',
                userName: 'base:64 / url',
                imgDraw: 'base:64 / url',
                rotation: 0,
                position: {
                    x: 0,
                    y: 0
                },
            },
            typeOfSign: 'name',
            state: 'free'
        }
 -->
<template>
    <section class="box-sign" :style="{
        top: dataBoxSign.data.position.y + 'px',
        left: dataBoxSign.data.position.x + 'px',
        transform: `translate(-50%, -50%) rotate(${dataBoxSign.data.rotation}deg)`,
        zIndex: `${isDragging ? 9999 : 2}`,
        /*  width: `${dataBoxSign.data.width}px`,
         maxWidth: `${dataBoxSign.data.width}px`, */
    }">
        <ul class="box-sign__asignator" :style="{
            opacity: `${isDragging ? 0 : 1}`,
            transition: `${isDragging ? 'all ease-out 0.2s' : 'none'}`
        }">
            <li>
                hola
            </li>
        </ul>
        <ul class="box-sign__options" :style="{
            opacity: `${isDragging ? 0 : 1}`,
            transition: `${isDragging ? 'all ease-out 0.2s' : 'none'}`
        }">
            <img src="/reload.svg" alt="">
            <img src="/reload.svg" alt="">
            <img src="/reload.svg" alt="">
            <img src="/reload.svg" alt="" @click="setStateDraw">

        </ul>
        <article class="box-sign__content" :style="{
            width: `${dataBoxSign.data.width}px`,
            height: `${dataBoxSign.data.height}px`,
        }" ref="elementSign">

            <canvas ref="canvas" class="box-sign__content__canvas" :width="dataBoxSign.data.width"
                :height="dataBoxSign.data.height" @mousedown="startDrawing" @mouseup="stopDrawing"
                @mousemove="draw"></canvas>


            <p>{{ props.dataBoxSign.canDraw ? 'Dibuja' : 'Haz clic' }}</p>

        </article>
        <article class="box-sign__buttons" :style="{
            opacity: `${isDragging ? 0 : 1}`,
            transition: `${isDragging ? 'all ease-out 0.2s' : 'none'}`
        }">

            <img src="/reload.svg" ref="rotationHandle" alt="" class="box-sign__buttons__rotation">
            <button class="box-sign__buttons__gray">
                Cancelar
            </button>
            <button class="box-sign__buttons__blue">
                Guardar
            </button>
            <button class="box-sign__buttons__delete">
                x
            </button>
        </article>
    </section>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { Ref } from 'vue';
import interact from 'interactjs';
const canvas: any = ref(null); // Referencia al canvas de dibujo
const lastX = ref(0); // Última posición X del dibujo en el canvas
const lastY = ref(0); // Última posición Y del dibujo en el canvas
const rotationHandle: any = ref(null); // Referencia al controlador de rotación
const draggable = ref(null); // Referencia a la caja arrastrable

const isDrawingEnabled = ref(false); // Indica si el dibujo en el canvas está habilitado
const isDrawing = ref(false); // Estado de dibujo activo o inactivo
const elementBox: Ref<any> = ref(null);
const elementSign: Ref<any> = ref(null);
const isDragging: Ref<boolean> = ref(false);
const props: any = defineProps([
    'dataBoxSign'
]);
const rotation = ref(0); // Ángulo de rotación inicial de la caja
const lastPosition: any = reactive({
    x: 0,
    y: 0
})


// LISTS OR TYPES ---------------------------------------------

const statesSign: Ref<any[]> = ref([
    'signed',
    'defined',
    'free',
]);

const typesSigns: Ref<any[]> = ref([
    'graph',
    'initials',
    'img',
    'name',
]);
// ---------------------------------------------------------------

onMounted(() => {
    getValidationBox();
    getValidationRotation()
})

//This function found for set position dinamically
function setPositionSign(x: number | string, y: number | string): void {
    props.dataBoxSign.x = x;
    props.dataBoxSign.y = y;
}

function setStateDraw() {
    props.dataBoxSign.canDraw = !props.dataBoxSign.canDraw;
}
function handleDrop(event: any) {
    const dropX = props.dataBoxSign.data.position.x / 2;
    const dropY = props.dataBoxSign.data.position.y + props.dataBoxSign.data.height / 2;
    const elementsAtPoint = document.elementsFromPoint(dropX, dropY);
    const droppedOnSquare = elementsAtPoint.find((el) => {
        console.log(el.classList);
        return el.classList.contains('home__wrapper__document__square')
    }
    );

    if (droppedOnSquare) {
        console.log('Elemento soltado sobre un .home__wrapper__document__square');
        appendToDropTarget(droppedOnSquare);
    } else {
        console.log('Elemento no fue soltado sobre un .home__wrapper__document__square');
        props.dataBoxSign.x = lastPosition.x;
        props.dataBoxSign.y = lastPosition.y;

    }
}
function appendToDropTarget(targetElement: any) {
    if (targetElement) {
        targetElement.appendChild(draggable.value);
        props.dataBoxSign.data.position = { x: 0, y: 0 };
    }
}
function getValidationBox() {
    interact(elementSign.value)
        .draggable({
            listeners: {
                move(event) {
                    if (!props.dataBoxSign.canDraw) {
                        const x = props.dataBoxSign.data.position.x += event.dx;
                        const y = props.dataBoxSign.data.position.y += event.dy;
                        setPositionSign(x, y)
                        isDragging.value = true;
                    } else { //For get last position
                        lastPosition.x = props.dataBoxSign.data.position.x += event.dx;
                        lastPosition.y = props.dataBoxSign.data.position.y += event.dy;
                    }
                },
                end(event) {
                    isDragging.value = false;
                    handleDrop(event);
                    lastPosition.x = props.dataBoxSign.data.position.x += event.dx;
                    lastPosition.y = props.dataBoxSign.data.position.y += event.dy;
                },
            },
        })
        .resizable({
            edges: { left: true, right: true, bottom: true, top: true },
            listeners: {
                move(event) {
                    props.dataBoxSign.data.width = event.rect.width;
                    props.dataBoxSign.data.height = event.rect.height;
                },
            },
            modifiers: [
                interact.modifiers.aspectRatio({ ratio: 3 }),
                interact.modifiers.restrictSize({
                    min: { width: 200, height: 65 },
                    max: { width: 300, height: 100 },
                }),
            ],
        });
}
function getValidationRotation() {
    interact(rotationHandle.value).draggable({
        listeners: {
            move(event) {
                const box = elementSign.value.getBoundingClientRect();
                const center = {
                    x: box.left + box.width / 2,
                    y: box.top + box.height / 2,
                };
                const angle = Math.atan2(event.clientY - center.y, event.clientX - center.x);
                props.dataBoxSign.data.rotation = angle * (180 / Math.PI);
            },
        },
    });
}

const draw = (event: any) => {
    if (!isDrawing.value || !props.dataBoxSign.canDraw) return;

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

const startDrawing = (event: any) => {
    if (props.dataBoxSign.canDraw) {
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
</script>
<style scoped src="./BoxSign.molecule.scss"></style>