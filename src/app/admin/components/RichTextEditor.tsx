'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false }
);

interface RichTextEditorProps {
  id?: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  minHeight?: number;
}

export default function RichTextEditor({
  id,
  name,
  defaultValue = '',
  placeholder,
  minHeight = 200,
}: RichTextEditorProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="w-full relative rounded-lg overflow-hidden border border-gray-300 focus-within:border-black focus-within:ring-2 focus-within:ring-black transition-all bg-white" data-color-mode="light">
      <input type="hidden" name={name} id={id} value={value} />
      <MDEditor
        value={value}
        onChange={(val) => setValue(val || '')}
        height={minHeight}
        preview="edit"
        className="w-full !border-0 !shadow-none !rounded-none"
        textareaProps={{
          placeholder: placeholder,
        }}
      />
    </div>
  );
}
