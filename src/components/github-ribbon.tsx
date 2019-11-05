import React from 'react';

export function GitHubRibbon() {
  return (
    <a href='https://github.com/AlphaHydrae/asap' rel='noopener noreferrer' target='_blank'>
      <img
        width='149'
        height='149'
        style={{ position: 'fixed', top: 0, right: 0, zIndex: 10000 }}
        src='https://github.blog/wp-content/uploads/2008/12/forkme_right_red_aa0000.png?resize=149%2C149'
        className='attachment-full size-full'
        alt='Fork me on GitHub'
        data-recalc-dims='1'
      />
    </a>
  );
}