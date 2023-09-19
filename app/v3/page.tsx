"use client";

import { motion } from "framer-motion";
import { CSSProperties, useState } from "react";

export default function Page() {
  let x = range(20);

  let [on, setOn] = useState(false);

  return (
    <motion.div
      // animate={
      //   {
      //     "--foo": on ? "300px" : "0px",
      //     // "--foo": on ? "100%" : "0%",
      //   } as CSSProperties
      // }
      transition={{ type: "spring", bounce: 0.75, duration: 4 }}
      className="relative mx-auto mt-12 max-w-md"
    >
      <button onClick={() => setOn(!on)}>click</button>

      {x.map((i) => (
        <motion.div
          key={`f-${i}`}
          className="bg-red-500 py-2"
          // transition={{ duration: 10 }}
          // style={{ opacity: "var(--foo)" }}
          // style={{ y: "var(--foo)" }}
          animate={{ y: "var(--foo)" }}
          // animate={{ opacity: on ? 1 : 0 }}
          // animate={{ y: on ? 300 : 0 }}
        >
          Item {i}
        </motion.div>
      ))}
    </motion.div>
  );
}

function range(number: number) {
  return Array.apply(null, Array(number)).map(function (_, i) {
    return i + 1;
  });
}
