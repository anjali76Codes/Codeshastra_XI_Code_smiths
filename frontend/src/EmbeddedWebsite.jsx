import React from 'react';

const EmbeddedWebsite = () => {
  return (
    <div className="relative w-full h-screen">
      <iframe
        src="https://bellard.org/jslinux/vm.html?url=alpine-x86.cfg&mem=192"
        title="Embedded Linux Terminal"
        className="w-full h-full"
        frameBorder="0"
      />
    </div>
  );
};

export default EmbeddedWebsite;
