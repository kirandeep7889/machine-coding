import { useState } from "react";
import "./App.css";
import explorer from "./data/Folder";
import Folder from "./components/Folder";
import { useInsertNode } from "./hooks/useInsertNode";
function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode } = useInsertNode();

  function handleInsertNode(folderId, item, isFolder) {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  }

  return (
    <>
      <Folder handleInsertNode={handleInsertNode} explorerData={explorerData} />
    </>
  );
}

export default App;
