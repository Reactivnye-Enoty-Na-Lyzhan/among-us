import React, { useRef } from 'react';

export function WithRendersCounter<P extends object>(
  WrappedComponent: React.FC<P>
) {
  return function (props: P) {
    const rendersCounter = useRef(0);
    rendersCounter.current += 1;
    console.log(
      `${props.displayName ?? WrappedComponent.name} renders: ${
        rendersCounter.current
      }`
    );

    return <WrappedComponent {...props} />;
  };
}
