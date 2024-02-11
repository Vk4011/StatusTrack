// App.js
import React from "react";
import { Route, Routes, BrowserRouter } from 'react-router-dom';;
import Login from "./Login";
import TextEditor from "./TextEditor";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/text-editor" element={<TextEditor/>} />
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
