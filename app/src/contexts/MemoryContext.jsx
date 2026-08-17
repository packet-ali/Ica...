import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";


/* =========================================================
   MEMORY TYPES
========================================================= */

const MEMORY_KEYS = [
  "letter",
  "timeline",
  "music",
  "gifts",
];


const STORAGE_KEY =
  "our-little-universe-memories";


/* =========================================================
   CONTEXT
========================================================= */

const MemoryContext =
  createContext(null);


/* =========================================================
   DEFAULT STATE
========================================================= */

const defaultMemories = {
  letter: false,
  timeline: false,
  music: false,
  gifts: false,
};


/* =========================================================
   PROVIDER
========================================================= */

export function MemoryProvider({
  children,
}) {

  const [memories, setMemories] =
    useState(defaultMemories);


  /* =======================================================
     LOAD SAVED MEMORIES
  ======================================================= */

  useEffect(() => {

    try {

      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );


      if (!saved) {
        return;
      }


      const parsed =
        JSON.parse(saved);


      setMemories({
        ...defaultMemories,
        ...parsed,
      });

    } catch (error) {

      console.warn(
        "Unable to load memories.",
        error
      );

    }

  }, []);


  /* =======================================================
     SAVE MEMORIES
  ======================================================= */

  useEffect(() => {

    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(memories)
      );

    } catch (error) {

      console.warn(
        "Unable to save memories.",
        error
      );

    }

  }, [memories]);


  /* =======================================================
     COMPLETE MEMORY
  ======================================================= */

  function completeMemory(
    memoryKey
  ) {

    if (
      !MEMORY_KEYS.includes(
        memoryKey
      )
    ) {

      console.warn(
        `Unknown memory: ${memoryKey}`
      );

      return;
    }


    setMemories(
      (previous) => {

        if (
          previous[memoryKey]
        ) {

          return previous;

        }


        return {
          ...previous,
          [memoryKey]: true,
        };

      }
    );

  }


  /* =======================================================
     RESET
  ======================================================= */

  function resetMemories() {

    setMemories(
      defaultMemories
    );

  }


  /* =======================================================
     CALCULATE PROGRESS
  ======================================================= */

  const memoryCount =
    MEMORY_KEYS.reduce(
      (count, key) => {

        return (
          count +
          (
            memories[key]
              ? 1
              : 0
          )
        );

      },
      0
    );


  const allMemoriesCollected =
    memoryCount ===
    MEMORY_KEYS.length;


  /* =======================================================
     MEMOIZED VALUE
  ======================================================= */

  const value = useMemo(
    () => ({

      memories,

      memoryCount,

      totalMemories:
        MEMORY_KEYS.length,

      allMemoriesCollected,

      completeMemory,

      resetMemories,

    }),

    [
      memories,
      memoryCount,
      allMemoriesCollected,
    ]
  );


  return (
    <MemoryContext.Provider
      value={value}
    >

      {children}

    </MemoryContext.Provider>
  );

}


/* =========================================================
   HOOK
========================================================= */

export function useMemory() {

  const context =
    useContext(
      MemoryContext
    );


  if (!context) {

    throw new Error(
      "useMemory must be used inside MemoryProvider."
    );

  }


  return context;

}