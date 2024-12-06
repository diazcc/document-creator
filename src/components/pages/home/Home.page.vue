<template>
    <HomeTemplate :dataHome="dataHome" />
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, Ref } from 'vue';
import HomeTemplate from '../../templates/home/Home.template.vue';
import { InputDataEx } from '../../../interfaces/InputDataEx.interface';
import documentPdf  from '../../../assets/files/pdf.pdf';
const urlPdf: any = ref();
const signs: Ref<any[]> = ref([]);

const dataEntry: InputDataEx = reactive({
    posicionator: true,
    users: [
        {
            name: "Luis Gerdez",
            email: "lgerdez@suntic.co",
            document: "7532238",
            font: "Tangerinessr",
            type: "firma",
            graph: "iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAddJREFUOI21VT1rFFEUPfe9YXmCQSsLE9JpERD8ALEQxGZh4M4W4oI/ILERtLARsbKykYCNWFml0I0se2cyAwphi6Txq7C2VCsbs+juDpO9NgphfPMgag685hzOeefC+yAReQ/gDfZAVaXT6WwggOFw6Eaj0UMAUU06AxF5pKr4X0tEVk2ozd+iXv0PDAaDU9bau6pKACIi2mDmpyFPsGmWZeeNMbdardZykiTXkiS5CqDMsux+MJSInjeJqno7iqIb7Xb7+2+Omddms5nL8/ykz0NELwwzb/nEXq93GMBOHMdTz2Yvq6q66PMx81Zo/LGqHvIJ1to5IvrWZGwM7Xa7u0RUFkWx4Gl6xRiz2eQlVW2smmXZvKo+VtXV6XS67ZybB3CHiF4x8/q+mwIAM39W1XvGmDXn3EcAHwB8HY/HEvIFQ0VkhYiWy7I8lyTJ4mQyOUpE2865Z/1+/1ijMXDdLonIA5+W5/mCiKw3eUNNbxKR95DHcfxJVV+LyOX9jE8AlJl/BDbdBHDBG5qm6fU6WRTFnIaOBYAoinaMMcfrvIisRES0VBestbtVVZ1O0/RJIPcIgC91koiWvK/Ur7t+ItQ0hAN5Tw8klETkHYC3e8l//KPO/gSRmCU1mYFEcgAAAABJRU5ErkJggg==",
            img: "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JUusoqLCKioqrLKyMv6+oqLCrr76auqxGdi1a5d++ctfWjQatc2bN9uePXvM5/NRhkAS0NBzPtcdnGzKouHinHwuuLlyPHfunI4dO2bHjx+31tbWeNDb3t5uo6OjU/5OTk6OVVdXW3l5uVVVVVl5eblVVlZaeXm5lZeXm9/vd2VZpdLo6KgeffRRe+mll8zr9VpdXZ1t27aNcgWQ1agEAczKqVOndPz4cYsFvbGvp06dmvZ3lixZYtdff70tX758wtclS5ZkVF3U3NysDz74wD744ANraGiw4eHhOf09n89nDz74oG3cuNFuu+22hGdo+/v79eMf/9j++c9/Wl5enr322mv2ox/9KKPKHACSgYoQwLS6urp04sQJC4VCFgqF7MSJE9bR0WFHjx6ddpCaz+ezysrK+FLB1113XTzgzeRlevv7+/XnP//ZfvOb3yRkgN50rrjiCtuwYYPdd999dvvtt885KO7s7NR1111n/f39dtVVV9lbb71lNTU1GXscACCRsrYyZJYA4IKuri7Fgtz29nZra2uLB70DAwPT/p7P57ObbropHujGgt5ly5ZZbm6uq66tkZERFRUV2eDgoJmZzZs3z+677z5bs2aNrVmzxm644YZZ7a+iUiQasffee88aGhrs1Vdftd7e3vj/L1iwwFpaWmY9m0NbW5tuu+02C4fDFggE7Pjx47Z06VJXHRsAcDQ3rMrDRONwmw8//FCbN29WTk7OlMsEx14FBQX69re/rQ0bNmj79u16+eWX9eGHH6qrqyurrolt27bJzOTz+fT73/9e/f39Sdn/0dFRvf3223r44Yfjx6akpERNTU0z/rz//Oc/KikpkZlp5cqVOnv2bFYdMwAAgLjW1lZt375dS5cunbRiWk1NTdYHu9N56623ZGYqLi5WOBxOWZkMDg6qtrY2vuzx7t27L/uz33//feXn58vM9P3vf1+Dg4McSwAAkF1Onz6tF154QTU1NROC3/nz52vjxo1qbGx0xTLByRIOh1VcXCwz01hAnHK7du2KZ4dra2v19ddfX3Q7GhoalJubKzPTvffey/EFAADZo7+/X3/729+0bt26CV0fcnJytG7dOv39739P2qN9N+no6IgHwWNdI9Lm3Xff1cKFC2VmWrBggbq7u6fcnr1798rj8cjMtHnzZkWjUY4zAABwt5GRETU2Nqq2tlbz58+f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"
        },
         {
            name: "Luis Gerdez",
            email: "lgerdez@suntic.co",
            document: "7532238",
            font: "Tangerinessr",
            type: "firma",
            graph: "iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAddJREFUOI21VT1rFFEUPfe9YXmCQSsLE9JpERD8ALEQxGZh4M4W4oI/ILERtLARsbKykYCNWFml0I0se2cyAwphi6Txq7C2VCsbs+juDpO9NgphfPMgag685hzOeefC+yAReQ/gDfZAVaXT6WwggOFw6Eaj0UMAUU06AxF5pKr4X0tEVk2ozd+iXv0PDAaDU9bau6pKACIi2mDmpyFPsGmWZeeNMbdardZykiTXkiS5CqDMsux+MJSInjeJqno7iqIb7Xb7+2+Omddms5nL8/ykz0NELwwzb/nEXq93GMBOHMdTz2Yvq6q66PMx81Zo/LGqHvIJ1to5IvrWZGwM7Xa7u0RUFkWx4Gl6xRiz2eQlVW2smmXZvKo+VtXV6XS67ZybB3CHiF4x8/q+mwIAM39W1XvGmDXn3EcAHwB8HY/HEvIFQ0VkhYiWy7I8lyTJ4mQyOUpE2865Z/1+/1ijMXDdLonIA5+W5/mCiKw3eUNNbxKR95DHcfxJVV+LyOX9jE8AlJl/BDbdBHDBG5qm6fU6WRTFnIaOBYAoinaMMcfrvIisRES0VBestbtVVZ1O0/RJIPcIgC91koiWvK/Ur7t+ItQ0hAN5Tw8klETkHYC3e8l//KPO/gSRmCU1mYFEcgAAAABJRU5ErkJggg==",
            img: "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JUusoqLCKioqrLKyMv6+oqLCrr76auqxGdi1a5d++ctfWjQatc2bN9uePXvM5/NRhkAS0NBzPtcdnGzKouHinHwuuLlyPHfunI4dO2bHjx+31tbWeNDb3t5uo6OjU/5OTk6OVVdXW3l5uVVVVVl5eblVVlZaeXm5lZeXm9/vd2VZpdLo6KgeffRRe+mll8zr9VpdXZ1t27aNcgWQ1agEAczKqVOndPz4cYsFvbGvp06dmvZ3lixZYtdff70tX758wtclS5ZkVF3U3NysDz74wD744ANraGiw4eHhOf09n89nDz74oG3cuNFuu+22hGdo+/v79eMf/9j++c9/Wl5enr322mv2ox/9KKPKHACSgYoQwLS6urp04sQJC4VCFgqF7MSJE9bR0WFHjx6ddpCaz+ezysrK+FLB1113XTzgzeRlevv7+/XnP//ZfvOb3yRkgN50rrjiCtuwYYPdd999dvvtt885KO7s7NR1111n/f39dtVVV9lbb71lNTU1GXscACCRsrYyZJYA4IKuri7Fgtz29nZra2uLB70DAwPT/p7P57ObbropHujGgt5ly5ZZbm6uq66tkZERFRUV2eDgoJmZzZs3z+677z5bs2aNrVmzxm644YZZ7a+iUiQasffee88aGhrs1Vdftd7e3vj/L1iwwFpaWmY9m0NbW5tuu+02C4fDFggE7Pjx47Z06VJXHRsAcDQ3rMrDRONwmw8//FCbN29WTk7OlMsEx14FBQX69re/rQ0bNmj79u16+eWX9eGHH6qrqyurrolt27bJzOTz+fT73/9e/f39Sdn/0dFRvf3223r44Yfjx6akpERNTU0z/rz//Oc/KikpkZlp5cqVOnv2bFYdMwAAgLjW1lZt375dS5cunbRiWk1NTdYHu9N56623ZGYqLi5WOBxOWZkMDg6qtrY2vuzx7t27L/uz33//feXn58vM9P3vf1+Dg4McSwAAkF1Onz6tF154QTU1NROC3/nz52vjxo1qbGx0xTLByRIOh1VcXCwz01hAnHK7du2KZ4dra2v19ddfX3Q7GhoalJubKzPTvffey/EFAADZo7+/X3/729+0bt26CV0fcnJytG7dOv39739P2qN9N+no6IgHwWNdI9Lm3Xff1cKFC2VmWrBggbq7u6fcnr1798rj8cjMtHnzZkWjUY4zAABwt5GRETU2Nqq2tlbz58+f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"
        }
    ]
});
const dataHome: any = reactive({
    signs: [],
    addNewSign: () => {
    },
    dataPdfViewer: {
        urlPdf: urlPdf.value,
        toolbar: {
            toolbar: false
        },
        onClose: () => {

        }
    }
});

onMounted(() => {
    getInputDataExWeb(dataEntry);
    getFile();
})

function getInputDataExWeb(data: InputDataEx): void {
    data.users = data.users.map((user: any) => {
        addNewSign({
            ...user,
            config: user.config ?? {
                canSign: false, //canMove:true Need move 
                canDraw: false, //canMove:true Need move
                canMove: true,
                canRotate: false , //canMove:true Need move
                canDefineSign: false, //canMove:true Need move
                canDuplicate: false,//free
                canDelete: true,//free
                canResize: true,//free
            },
            position: user.position ?? { x: 200, y: 200 },
            rotation: user.rotation ?? 0,
            width: user.width ?? 200,
            height: user.height ?? 65,
        })
    });

    console.log(dataHome.signs)
}


function addNewSign(userSign: any) {
    console.log('hola');
    dataHome.signs.push(userSign)
    console.log(dataHome.signs);
}

async function getFile(){
  try {
    const base64String = await getFileBase64(documentPdf);
    console.log("Base64 Data:", base64String);
  } catch (error:any) {
    console.error("Error:", error.message);
  }
}
async function getFileBase64(fileUrl: string): Promise<string> {
  try {
    // Fetch the file as a Blob
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    const blob = await response.blob();

    // Convert the Blob to Base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result?.toString().split(",")[1]; // Extract Base64 part
        if (base64Data) {
          resolve(base64Data);
        } else {
          reject("Failed to convert file to Base64.");
        }
      };
      reader.onerror = () => reject("Failed to read the file.");
      reader.readAsDataURL(blob); // Read the Blob as DataURL
    });
  } catch (error:any) {
    throw new Error(`Error processing file: ${error.message}`);
  }
}

</script>
<style scoped></style>