import React from "react";

export interface Props {
    text: string;
}

const MarkdownTable: React.FC<Props> = ({ text }) => {
    return (
        <div>
            <h1>{text}</h1>
        </div>
    );
};

export default MarkdownTable;
