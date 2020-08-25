import React, { useState, useCallback } from 'react';
import { WithChildren, WithNav } from '.';
import { language } from '../../lib';

export const WithApp = ({ children, ...props }) => {
  const [ lang, setLang ] = useState('en');

  const translate = useCallback((key) => {
    const data = language[lang];
    const parts = key.split('.');
    let pointer = data;

    if (!data) {
      throw new Error(`Invalid language: ${lang}`);
    }

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      if (pointer[part]) {
        pointer = pointer[part];
      }
    }

    return pointer;
  }, [ lang ]);

  const appProps = {
    languages: Object.keys(language),
    lang,
    setLang,
    translate,
  };

  return (
    <WithNav {...props} {...appProps}>
      <WithChildren children={children} {...props} {...appProps} />
    </WithNav>
  );
};
