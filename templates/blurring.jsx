import React from 'react';

export default function Blurring({ replacedEl, _button, onClick }) {
  return (
    <>
      <button onClick={onClick}>
        <span className='btn-bg'></span>
        <span className='btn-label' aria-label={_button.ariaLabel}>
          {_button.buttonText}
        </span>
      </button>
      <div className='is-blurring'>
        <div className='blur'></div>
        <div className='' dangerouslySetInnerHTML={{ __html: replacedEl }} />
      </div>
    </>
  );
}
