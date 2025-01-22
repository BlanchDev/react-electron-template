import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CounterContext } from "./appLayoutContext";

function CounterProvider({ children }) {
  const [reactCount, setReactCount] = useState(0);
  const [electronCount, setElectronCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getCounter = async () => {
    try {
      setIsLoading(true);
      const count = await window.Electron.counter.get();
      setElectronCount(count);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncrement = useCallback(async () => {
    try {
      const count = await window.Electron.counter.increment();
      setElectronCount(count);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleDecrement = useCallback(async () => {
    try {
      const count = await window.Electron.counter.decrement();
      setElectronCount(count);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleReset = useCallback(async () => {
    try {
      const count = await window.Electron.counter.reset();
      setElectronCount(count);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getCounter();
  }, []);

  const value = useMemo(
    () => ({
      reactCount,
      setReactCount,
      electronCount,
      isLoading,
      handleIncrement,
      handleDecrement,
      handleReset,
    }),
    [
      reactCount,
      electronCount,
      isLoading,
      handleIncrement,
      handleDecrement,
      handleReset,
    ],
  );

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
}

CounterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CounterProvider;
