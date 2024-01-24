/* eslint-disable jsx-a11y/anchor-is-valid */
// TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com
import { useEffect } from "react";
import Nav from "./components/Nav";
import TodoList from "./components/TodoList";

const App = () => {
  useEffect(() => {
    const init = async () => {
      const { Ripple, Dropdown, Input, initTE } = await import("tw-elements");
      initTE({ Ripple, Dropdown, Input });
    };
    init();
  }, []);

  return (
    <div>
      <Nav />
      <TodoList />
    </div>
  );
};

export default App;
