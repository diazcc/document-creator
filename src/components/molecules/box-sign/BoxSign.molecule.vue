<!--
    
        todo  COMPONENT BOX SIGN

        ? This component must be modified with supervision


        !       IF YOU DON'T GOOD EXPERIENCE WITH THIS STRUCTURE CODE, DON'T THE COMPONENT.


        const dataBoxSign: any = { //Define interface 
            config: { if not define on componente extern, must be added on componente page on structure dataBoxSign
                canSign: false or null,
                canDraw: false or null,
                canMove: false or null,
                canRotate: false or null,
                canDefineSign: false or null,
                canDuplicate: false or null,
                canDelete: false or null,
                canResize: false or null,
            },
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
        }
 -->
<template>
    <section class="box-sign" ref="boxElement" :style="{
        top: dataBoxSign.position.y + 'px',
        left: dataBoxSign.position.x + 'px',
        transform: `translate(-50%, -50%) rotate(${dataBoxSign.rotation}deg)`,
        zIndex: `${isDragging ? 9999 : 3}`,
        /*  width: `${dataBoxSign.width}px`,
         maxWidth: `${dataBoxSign.width}px`, */
    }">
        <ul class="box-sign__asignator" :style="{
            opacity: `${isDragging ? 0 : 1}`,
            transition: `${isDragging ? 'all ease-out 0.2s' : 'none'}`
        }">
            <li class="box-sign__asignator__title">
                {{ dataBoxSign.name }}
            </li>
        </ul>
        <ul class="box-sign__options" :style="{
            opacity: `${isDragging ? 0 : 1}`,
            transition: `${isDragging ? 'all ease-out 0.2s' : 'none'}`
        }">
            <img class="box-sign__options__icon" src="/reload.svg" alt="">
            <img class="box-sign__options__icon" src="/reload.svg" alt="">
            <img class="box-sign__options__icon" src="/reload.svg" alt="">
            <img :class="'box-sign__options__icon box-sign__options__icon--'+(dataBoxSign.config.canDraw ? 'active': '')" src="/reload.svg" alt="" @click="setStateDraw">

        </ul>
        <article class="box-sign__content" :style="{
            width: `${dataBoxSign.width}px`,
            height: `${dataBoxSign.height}px`,
        }" ref="elementSign">

            <canvas ref="canvas" :class="'box-sign__content__canvas box-sign__content__canvas--'+(props.dataBoxSign.config.canDraw ?  'active':'' )" :width="dataBoxSign.width"
                :height="dataBoxSign.height" @mousedown="startDrawing" @mouseup="stopDrawing"
                @mousemove="draw"></canvas>


            <p class="box-sign__content__text" v-if="!isDrawing">{{ props.dataBoxSign.config.canDraw ? 'Dibuja' : 'Haz clic' }}</p>

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
const boxElement  :any= ref(null); // Referencia a la caja arrastrable

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
 props.dataBoxSign.position.y = y;
 props.dataBoxSign.position.x = x;
}

function setStateDraw() {
    props.dataBoxSign.config.canDraw = !props.dataBoxSign.config.canDraw;
}
function handleDrop(event: any) {
    event.preventDefault();

    // Obtener las coordenadas del punto de soltar
    const dropX = event.clientX;
    const dropY = event.clientY;

    // Buscar elementos en el punto de soltar
    const elementsAtPoint = document.elementsFromPoint(dropX, dropY);

    // Encontrar el contenedor `.page` más cercano
    const droppedOnSquare = elementsAtPoint.find((el) => {
        const closestPage = el.closest('.page');
        return closestPage !== null; // Devuelve true si encuentra algo
    });

    if (droppedOnSquare) {
        console.log('Elemento soltado sobre o cerca de un .page');
        const closestPage = droppedOnSquare.closest('.page') as HTMLElement;

        if (closestPage) {
            // Obtener las dimensiones de `.page`
            const pageRect = closestPage.getBoundingClientRect();

            // Validar si el punto de soltar está dentro de las dimensiones de `.page`
            const isWithinPage =
                dropX >= pageRect.left &&
                dropX <= pageRect.right &&
                dropY >= pageRect.top &&
                dropY <= pageRect.bottom;

            if (isWithinPage) {
                console.log('El punto de soltar está dentro de las dimensiones de .page');

                // Validar si ya está contenido en `.page`
                const isAlreadyInside = closestPage.contains(event.target as Node);

                if (!isAlreadyInside) {
                    appendToDropTarget(closestPage);
                } else {
                    console.log('El elemento ya está dentro de .page, no se realizará ningún cambio.');
                }
            } else {
                console.log('El punto de soltar está fuera de las dimensiones de .page');
                setPositionSign(0, 0); // Restaurar a posición predeterminada
            }
        }
    } else {
    console.log('Elemento no fue soltado sobre o cerca de un .page');

    // Validar si ya está contenido en cualquier `.page`
    const isContainedInAnyPage = Array.from(document.querySelectorAll('.page')).some((page: Element) => 
        page.contains(event.target as Node)
    );

    setPositionSign(0, 0); // Restaurar a posición predeterminada si no está contenido en ninguna página
    
}
}




function appendToDropTarget(targetElement: any) {
    if (targetElement) {
        targetElement.appendChild(boxElement.value);
        props.dataBoxSign.position = { x: 100, y: 50 };
    }
}
function getValidationBox() {
    interact(elementSign.value)
        .draggable({
            listeners: {
                move(event) {

                        console.log(props.dataBoxSign.config.canDraw);
                        
                        if (!props.dataBoxSign.config.canDraw) {
                            const x = props.dataBoxSign.position.x += event.dx;
                            const y = props.dataBoxSign.position.y += event.dy;
                            setPositionSign(x, y)
                            isDragging.value = true;
                        } else { //For get last position
                            lastPosition.x = props.dataBoxSign.position.x + event.dx;
                            lastPosition.y = props.dataBoxSign.position.y + event.dy;
                        }
                        
                },
                end(event) {
                    isDragging.value = false;
                    handleDrop(event);
                },
            },
        })
        .resizable({
            edges: { left: true, right: true, bottom: true, top: true },
            listeners: {
                move(event) {
                    props.dataBoxSign.width = event.rect.width;
                    props.dataBoxSign.height = event.rect.height;
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
                props.dataBoxSign.rotation = angle * (180 / Math.PI);
            },
        },
    });
}

const draw = (event: any) => {
    if (!isDrawing.value || !props.dataBoxSign.config.canDraw) return;

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
    if (props.dataBoxSign.config.canDraw) {
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