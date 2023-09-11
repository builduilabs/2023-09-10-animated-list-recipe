"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArchiveBoxIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
// let i = 0;

export default function Email() {
  let [id, setId] = useState(0);
  const [messages, setMessages] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);
  console.log({ id });

  function addMessage() {
    setMessages((messages) => [id, ...messages]);
    setId((id) => id + 1);
  }

  function toggleMessage(mid) {
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

  return (
    <div className="flex h-screen flex-col items-center justify-center overscroll-y-contain px-6 py-8 text-slate-600">
      <div className="flex h-full w-full max-w-md flex-1 flex-col rounded-2xl bg-white py-2">
        <div className="border-b px-5">
          <div className="flex justify-between py-2 text-right">
            <button
              onClick={addMessage}
              className="-mx-2 flex items-center gap-1 rounded px-2 py-1 text-sm font-medium text-slate-400 hover:text-slate-500 active:bg-slate-100"
            >
              <EnvelopeIcon className="h-5 w-5 " />
              Refresh
            </button>
            <button
              onClick={archiveSelectedMessages}
              className="-mx-2 flex items-center gap-1 rounded px-2 py-1 text-sm font-medium text-slate-400 hover:text-slate-500 active:bg-slate-100"
            >
              <ArchiveBoxIcon className="h-5 w-5" />
              Archive
            </button>
          </div>
        </div>
        <ul className="overflow-y-scroll px-3 pt-3">
          <AnimatePresence initial={false}>
            {messages.map((mid) => (
              <motion.li
                // initial={{ opacity: 1, height: 0, y: "-100%" }}
                // animate={{ opacity: 1, height: "auto", y: "0%" }}
                // initial={{ opacity: 1, height: 0, y: -48 }}
                // animate={{ opacity: 1, height: "auto", y: 0 }}
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{
                  opacity: 0.5,
                  height: 0,
                  overflow: "hidden",
                  // justifyContent: "center",
                }}
                // transition={{ opacity: { duration: 0.2 } }}
                // transition={{ duration: 3 }}
                transition={{ ease: [0.32, 0.72, 0, 1] }}
                // transition={{ ease: [0.32, 0.72, 0, 1], duration: 5 }}
                // transition={{ type: "tween" }}
                key={mid}
                data-id={mid}
                className={`relative flex flex-col justify-end`}
              >
                <div className="my-4">
                  <button
                    onClick={() => toggleMessage(mid)}
                    className={`${
                      selectedMessages.includes(mid)
                        ? "bg-blue-500"
                        : "hover:bg-slate-200"
                    }
                    block w-full cursor-pointer truncate rounded px-3 py-3 text-left`}
                  >
                    <p
                      className={`${
                        selectedMessages.includes(mid)
                          ? "text-white"
                          : "text-slate-500"
                      } truncate text-sm font-medium`}
                    >
                      Email {mid}
                    </p>
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
