import React, { useEffect, useRef, useState } from "react";

const Folder = ({ handleInsertNode, explorerData }) => {
  const [expand, setExpand] = useState(false);
  const [inputBox, setInputBox] = useState({
    visibility: false,
    isFolder: null,
  });
  const inputField = useRef(0);

  function handleAddFolderFileClick(e, isFolder) {
    console.log(isFolder);

    e.stopPropagation();
    setExpand(true);
    setInputBox({
      visibility: true,
      isFolder,
    });
  }

  function onAddFolder(e) {
    if (e.keyCode === 13 && inputField.current.value?.length > 0) {
      console.log(inputField.current.value);
      console.log(inputBox);

      handleInsertNode(
        explorerData.id,
        inputField.current.value,
        inputBox.isFolder
      );
      setInputBox({ ...inputBox, visibility: false }); // Hide input after adding
    }
  }

  // Focus on the input field when it becomes visible
  useEffect(() => {
    if (inputBox.visibility && inputField.current) {
      inputField.current.focus();
    }
  }, [inputBox.visibility]);

  if (explorerData?.isFolder) {
    return (
      <div style={{ marginTop: 5, marginLeft: 4 }}>
        <div
          className="folder"
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <span>📁 {explorerData.name}</span>
          <div>
            <button
              onClick={(e) => {
                handleAddFolderFileClick(e, true);
              }}
            >
              {" "}
              ➕ Folder
            </button>
            <button onClick={(e) => handleAddFolderFileClick(e, false)}>
              {" "}
              ➕ File
            </button>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {inputBox.visibility && (
            <div className="inputContainer">
              <span>{inputBox.isFolder ? "📂" : "🗃️"}</span>
              <input
                type="text"
                onKeyDown={onAddFolder}
                onBlur={() => setInputBox({ ...inputBox, visibility: false })}
                ref={inputField}
                className="inputContainer__input"
              />
            </div>
          )}

          {explorerData?.items?.map((exp) => {
            return <Folder explorerData={exp} key={exp.id} />;
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">🗃️ {explorerData.name}</span>;
  }
};

export default Folder;
