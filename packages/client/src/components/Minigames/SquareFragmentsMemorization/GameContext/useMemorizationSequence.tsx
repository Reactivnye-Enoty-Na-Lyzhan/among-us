import { useMemo, useRef } from 'react';

export function useMemorizationSequence() {
  const memorizationSequenceRef = useRef<number[]>([]);
  const vacantFragmentsSetRef = useRef<Set<number>>(
    new Set([...Array(9).keys()])
  );

  return useMemo(() => {
    const expandMemorizationSequence = () => {
      const memorizationSequence = memorizationSequenceRef.current;
      const vacantFragmentsSet = vacantFragmentsSetRef.current;

      expandSequenceWithRandomFragment(
        memorizationSequence,
        vacantFragmentsSet
      );
    };

    return {
      memorizationSequenceRef,
      expandMemorizationSequence,
    };
  }, []);
}

function getNextRandomFragment(vacantFragmentsSet: Set<number>) {
  const randomFragment = [...vacantFragmentsSet][
    Math.floor(Math.random() * vacantFragmentsSet.size)
  ];

  vacantFragmentsSet.delete(randomFragment);
  console.log(
    `VACANT FRAGMENTS: ${JSON.stringify(Array.from(vacantFragmentsSet))}`
  );

  return randomFragment;
}

function expandSequenceWithRandomFragment(
  memorizationSequence: number[],
  vacantFragmentsSet: Set<number>
) {
  const nextFragment = getNextRandomFragment(vacantFragmentsSet);
  memorizationSequence.push(nextFragment);

  console.log(`NEXT SEQUENCE: ${JSON.stringify(memorizationSequence)}`);
}
