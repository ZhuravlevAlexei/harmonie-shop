import React from 'react';
import css from './Container.module.css';

export const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={css.container}>{children}</div>;
};
