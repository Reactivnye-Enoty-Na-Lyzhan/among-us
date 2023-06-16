import { useMemo, useRef } from 'react';

export function useMemorizationSequence() {
  const memorizationSequenceRef = useRef<number[]>([]);

  return useMemo(() => {
    const expandMemorizationSequence = () => {
      const memorizationSequence = memorizationSequenceRef.current;

      expandSequenceWithRandomFragment(memorizationSequence);
    };

    return {
      memorizationSequenceRef,
      expandMemorizationSequence,
    };
  }, []);
}

const vacantFragmentsSet = new Set([...Array(9).keys()]);

function getNextRandomFragment() {
  const randomFragment = [...vacantFragmentsSet][
    Math.floor(Math.random() * vacantFragmentsSet.size)
  ];

  vacantFragmentsSet.delete(randomFragment);

  return randomFragment;
}

function expandSequenceWithRandomFragment(memorizationSequence: number[]) {
  const nextFragment = getNextRandomFragment();
  memorizationSequence.push(nextFragment);

  console.log(`NEXT SEQUENCE: ${JSON.stringify(memorizationSequence)}`);
}
