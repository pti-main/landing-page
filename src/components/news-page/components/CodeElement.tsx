import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { xcode } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeBlock = (props:any) => {

  const { language, value } = props;
  return (
    <SyntaxHighlighter language={language} style={xcode}> 
      {value}
    </SyntaxHighlighter>
  );
}

export default CodeBlock;