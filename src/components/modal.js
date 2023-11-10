import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import FocusTrap from 'focus-trap-react';

const Modal = () => {
  const [show, setShow] = useState(false);
  const modalRef = useRef();

  const style = {
    position: 'absolute',
    top: '30%',
    left: '30%',
    background: 'black',
  };

  return <>
    <button type="button" aria-label="show modal button" onClick={() => {
      setShow(true);
      if(modalRef.current) {
        setTimeout(() => {
          console.log(modalRef.current.querySelector('a, button, input'))
          modalRef.current.querySelector('a, button, input')?.focus();
          document.body.querySelector('#root').setAttribute("inert", "true");
        }, 300)
      }
    }}
    >Show Modal</button>

    {
      createPortal(
        // <FocusTrap active focusTrapOptions={{
        //   tabbableOptions: {
        //     displayCheck: 'full',
        //   },
        // }}>
          <div id="modal-id" ref={modalRef} className="modal-1" role="dialog" aria-modal="true" style={{display: show ? 'block' : 'none', ...style}}>
            <button type="button" aria-label="close modal button" onClick={() => {
              setShow(false);
              setTimeout(() => {
                document.body.querySelector('#root').removeAttribute("inert");
              }, 300)
            }}>Close Modal</button>
            <div>
              <ul>
                <li>first text here first</li>
                <li>2 text here 2</li>
                <li>3 text here 3</li>
                <li>4 text here 4</li>
                <li>last text here last</li>
              </ul>
            </div>
          </div>
        // </FocusTrap>
        ,
        document.body
      )
    }
    
  </>
}

export default Modal;