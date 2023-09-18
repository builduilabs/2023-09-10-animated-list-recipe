"use client";

import { useState } from "react";
import { AnimatePresence, Transition, motion } from "framer-motion";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";

let a = range(15).reverse();
let b = range(5).reverse();

const transition: Transition = {
  // type: "spring",
  // bounce: 0.75,
  duration: 5,
  ease: "linear",
  // duration: 0.2,
  // ease: [0.32, 0.72, 0, 1],
};

export default function Email() {
  let [id, setId] = useState(a.length);
  const [messages, setMessages] = useState(a);
  const [selectedMessages, setSelectedMessages] = useState<number[]>([
    4, 5, 6, 7, 8,
  ]);

  function addMessage() {
    setMessages((messages) => [id, ...messages]);
    setId((id) => id + 1);
  }

  function toggleMessage(mid: number) {
    if (selectedMessages.includes(mid)) {
      setSelectedMessages((messages) => messages.filter((id) => id !== mid));
    } else {
      setSelectedMessages((messages) => [mid, ...messages]);
    }
  }

  function archiveSelectedMessages() {
    setMessages((messages) =>
      messages.filter((id) => !selectedMessages.includes(id)),
    );
    setSelectedMessages([]);
  }

  // console.log(messages, id);

  return (
    <div className="flex h-screen flex-col items-center justify-center overscroll-y-contain px-6 py-8 text-gray-200">
      <div className="flex h-full w-full max-w-md flex-1 flex-col bg-gray-600 py-2 shadow-xl">
        <div className="border-b border-gray-500/40 px-5">
          <div className="flex justify-between py-2 text-right">
            <button
              onClick={addMessage}
              className="-mx-2 flex items-center gap-1 rounded px-2 py-1 text-sm font-medium text-gray-400 hover:text-gray-300 active:text-gray-200"
            >
              <PlusIcon className="h-6 w-6" />
            </button>
            <button
              onClick={archiveSelectedMessages}
              className="-mx-2 flex items-center gap-1 rounded px-2 py-1 text-sm font-medium text-gray-400 hover:text-gray-300 active:text-gray-200"
            >
              <ArchiveBoxIcon className="h-5 w-5" />
              Archive
            </button>
          </div>
        </div>

        <ul className="relative z-20 m-3 overflow-y-scroll">
          <AnimatePresence initial={false}>
            {messages.map((mid) => (
              <motion.li
                initial={
                  {
                    // height: 0
                  }
                }
                animate={
                  {
                    // height: "auto"
                  }
                }
                // layout
                // animate={{ y: 0 }}
                exit={{
                  // height: 0,
                  // zIndex: groupSelectedMessages(messages, selectedMessages)
                  //   .reverse()
                  //   .findIndex((group) => group.includes(mid)),
                  y: -49 * 5,
                  // y:
                  //   -48 *
                  //   getNumberOfSelectedMessagesAfter(
                  //     messages,
                  //     selectedMessages,
                  //     mid,
                  //   ),
                }}
                // transition={transition}
                transition={{
                  type: "spring",
                  bounce: 0.75,
                  duration: 5,
                }}
                key={mid}
                data-id={mid}
                data-selected={selectedMessages.includes(mid) || null}
                className={`oopacity-75 relative z-[1000] flex flex-col justify-end bg-gray-600`}
              >
                <motion.div
                  // exit={{
                  //   y: `-${
                  //     100 *
                  //     getNumberOfSelectedMessagesAfter(
                  //       messages,
                  //       selectedMessages,
                  //       mid,
                  //     )
                  //   }%`,
                  // }}
                  transition={transition}
                >
                  <motion.button
                    transition={transition}
                    exit={
                      {
                        // y:
                        //   -48 *
                        //   getNumberOfSelectedMessagesAfter(
                        //     messages,
                        //     selectedMessages,
                        //     mid,
                        //   ),
                        // y: `-${
                        //   100 *
                        //   getNumberOfSelectedMessagesAfter(
                        //     messages,
                        //     selectedMessages,
                        //     mid,
                        //   )
                        // }%`,
                      }
                    }
                    onClick={() => toggleMessage(mid)}
                    className={`${
                      selectedMessages.includes(mid)
                        ? "bg-blue-500"
                        : "hover:bg-gray-500/50"
                    }
                    ${
                      getNumberOfSelectedMessagesAfter(
                        messages,
                        selectedMessages,
                        mid,
                      ) === 0
                        ? "rounded-b border-transparent"
                        : "border-white/10"
                    }
                    ${
                      getNumberOfSelectedMessagesBefore(
                        messages,
                        selectedMessages,
                        mid,
                      ) === 0
                        ? "rounded-t"
                        : ""
                    }
                    block w-full cursor-pointer truncate border-b-[1px] px-8 py-4 text-left`}
                  >
                    <p
                      className={`${
                        selectedMessages.includes(mid)
                          ? "text-white"
                          : "text-white"
                      } truncate text-xs text-gray-100`}
                    >
                      Todo {mid}
                    </p>
                  </motion.button>
                </motion.div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

function getNumberOfSelectedMessagesAfter(
  messages: number[],
  selectedMessages: number[],
  id: number,
) {
  const startIndex = messages.indexOf(id);

  if (startIndex === -1 || !selectedMessages.includes(id)) {
    return 0;
  }

  let consecutiveCount = 0;

  for (let i = startIndex + 1; i < messages.length; i++) {
    if (selectedMessages.includes(messages[i])) {
      consecutiveCount++;
    } else {
      break;
    }
  }

  return consecutiveCount;
}

function getNumberOfSelectedMessagesBefore(
  messages: number[],
  selectedMessages: number[],
  id: number,
) {
  const endIndex = messages.indexOf(id);

  if (endIndex === -1 || !selectedMessages.includes(id)) {
    return 0;
  }

  let consecutiveCount = 0;

  for (let i = endIndex - 1; i >= 0; i--) {
    if (selectedMessages.includes(messages[i])) {
      consecutiveCount++;
    } else {
      break;
    }
  }

  return consecutiveCount;
}

function groupSelectedMessages(messages: number[], selectedMessages: number[]) {
  const messageGroups = [];
  let currentGroup = [];

  for (let i = 0; i < messages.length; i++) {
    const messageId = messages[i];

    if (selectedMessages.includes(messageId)) {
      currentGroup.push(messageId);
    } else if (currentGroup.length > 0) {
      // If we encounter a non-selected message and there is an active group,
      // push the current group to the result and reset it.
      messageGroups.push(currentGroup);
      currentGroup = [];
    }
  }

  // Check if there's a group remaining after the loop.
  if (currentGroup.length > 0) {
    messageGroups.push(currentGroup);
  }

  return messageGroups;
}

// function getConsecutiveSelectedMessages(messages, selectedMessages, id) {
//   const startIndex = messages.indexOf(id);

//   if (startIndex === -1 || !selectedMessages.includes(id)) {
//     return 0;
//   }

//   const consecutiveMessages = messages
//     .slice(startIndex + 1) // Start from the next message after the passed-in ID
//     .filter((messageID) => selectedMessages.includes(messageID));

//   if (consecutiveMessages.length === 0) {
//     return 0;
//   }

//   let consecutiveCount = 0;
//   for (let i = 0; i < consecutiveMessages.length; i++) {
//     if (consecutiveMessages[i] === selectedMessages[consecutiveCount]) {
//       consecutiveCount++;
//     } else {
//       break;
//     }
//   }

//   return consecutiveCount;
// }

// Now using this test data:

// ```
// let messages = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
// let selectedMessages = [3, 4, 5, 6, 11]
// ```

// you can see that

// ```
// getConsecutiveSelectedMessages(messages, selectedMessages, 6)
// ```

// returns 0, when it should return 3, since the IDs 5, 4 and 3 follow 6 in the original array, and they're all in selectedMessages

function range(number: number) {
  return Array.apply(null, Array(number)).map(function (_, i) {
    return i;
  });
}
