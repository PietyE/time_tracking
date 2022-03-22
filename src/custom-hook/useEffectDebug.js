import React, {useRef, useEffect} from "react";
const usePrevious = (value, initialValue) => {
    const ref = useRef(initialValue);
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
};

 export const useEffectDebugger = (effectHook, dependencies, dependencyNames = []) => {
    const previousDeps = usePrevious(dependencies, []);
  
    const changedDeps = dependencies.reduce((accum, dependency, index) => {
      if (dependency !== previousDeps[index]) {
        const keyName = dependencyNames[index] || index;
        return {
          ...accum,
          [keyName]: {
            before: previousDeps[index],
            after: dependency
          }
        };
      }
  
      return accum;
    }, {});
  
    if (Object.keys(changedDeps).length) {
      console.log('[use-effect-debugger] ', changedDeps);
    }
  
    useEffect(effectHook, dependencies);
};
  
// Before:
// useEffect(() => {
//   // useEffect code here...
// }, [dep1, dep2])

// After:
// useEffectDebugger(() => {
//   // useEffect code here...
// }, [dep1, dep2])

// Console output:
// {
//   1: {
//     before: 'foo',
//     after: 'bar'
//   }
// }
// The object key '1' represents the index of the dependency that changed.
// Here, dep1 changed and is the 2nd item in the dependency, or index 1