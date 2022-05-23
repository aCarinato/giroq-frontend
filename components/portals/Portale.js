import React, { useEffect, useState } from 'react';
// import { createPortal } from 'react-dom';
import ReactDOM from 'react-dom';

function Portale({ show, onClose, children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // return () => setMounted(false);
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div>
      <div>
        <a href="#" onClick={handleClose}>
          <button>Close</button>
        </a>
      </div>
      <div>{children}</div>{' '}
    </div>
  ) : null;

  if (mounted) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('overlays')
    );
  } else {
    return null;
  }

  //   return mounted
  //     ? createPortal(children, document.querySelector(selector))
  //     : null;
}

export default Portale;
