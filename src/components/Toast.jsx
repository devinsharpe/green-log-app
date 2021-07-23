import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { Transition } from "@headlessui/react";

import { toastMessageState } from "../atoms/toastMessages";

const Toast = () => {
  const [isShowing, setIsShowing] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [toastTimeout, setToastTimeout] = useState(null);
  const [messages, setMessages] = useRecoilState(toastMessageState);

  useEffect(() => {
    if (messages.length && currentMessage === null) {
      setCurrentMessage(messages[0]);
      setMessages(messages.slice(1));
    }
  }, [messages]);

  useEffect(() => {
    if (currentMessage) {
      setIsShowing(true);
      setToastTimeout(
        setTimeout(
          () => {
            setIsShowing(false);
            setTimeout(() => setCurrentMessage(null), 400);
          },
          currentMessage.timeout ? currentMessage.timeout * 1000 : 5000
        )
      );
    } else {
      if (messages.length) {
        setCurrentMessage(messages[0]);
        setMessages(messages.slice(1));
      }
    }
  }, [currentMessage]);

  const dismissToast = () => {
    clearTimeout(toastTimeout);
    setToastTimeout(null);
    setIsShowing(false);
    setTimeout(() => setCurrentMessage(null), 400);
  };

  return (
    <Transition
      show={isShowing}
      enter="transition duration-150"
      enterFrom="opacity-0 -translate-y-32"
      enterTo="opacity-100"
      leave="transition duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0 translate-y-16"
    >
      {currentMessage && (
        <div className="fixed top-8 left-1/2 w-72 p-4 transform -translate-x-1/2 bg-white dark:bg-gray-900 border border-gray-700 dark:border-gray-300 shadow rounded font-serif dark:text-white">
          {(currentMessage.dismissable ||
            currentMessage.dismissable === undefined) && (
            <button
              className="pb-1 px-2 text-2xl absolute top-2  right-2 rounded hover:border-black dark:hover:border-white"
              onClick={dismissToast}
            >
              &times;
            </button>
          )}
          <p className="font-semibold text-lg">{currentMessage.title}</p>
          <p>{currentMessage.message}</p>
        </div>
      )}
    </Transition>
  );
};

export default Toast;
