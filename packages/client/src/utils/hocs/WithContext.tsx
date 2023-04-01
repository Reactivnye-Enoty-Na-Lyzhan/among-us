import React from 'react';

export function WithContext<
  P extends object,
  C extends React.Context<unknown>
>({
  WrappedComponent,
  context,
}: {
  WrappedComponent: React.FC<P>;
  context: React.Context<C>;
}) {
  return function (props: P) {
    return <WrappedComponent {...props} context={context} />;
  };
}
