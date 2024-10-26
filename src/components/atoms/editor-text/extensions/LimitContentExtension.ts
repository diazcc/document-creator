import { Extension } from '@tiptap/core';
import { Plugin } from '@tiptap/pm/state';

/* 

editor.commands.insertInput({
                     type: 'text',
                     placeholder: 'Enter your name',
                     value: '',
                     id: 'input-1',
                 })
 */
export const LimitContentExtension = Extension.create({
  addProseMirrorPlugins() {
    console.log('Plugin loaded');  // Añade esta línea
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            beforeinput: (view, event) => {
                console.log('sabino');
                const contentHeight = view.dom.scrollHeight;
              const containerHeight = 400; // El límite que quieras poner
              if (contentHeight >= containerHeight && event.inputType === 'insertText') {
                console.log('hola');
                event.preventDefault();
                return true;
              } else {
                console.log('adios');
              }

              return false;
            }
          }
        }
      })
    ];
  }
});
