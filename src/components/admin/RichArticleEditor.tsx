"use client";

import { useState, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  Heading2,
  Heading3,
  Quote,
  Code,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
  Eye,
  Edit3,
  Upload,
} from "lucide-react";

interface RichArticleEditorProps {
  content: string;
  onChange: (newContent: string) => void;
  onImageUploaded?: (url: string) => void;
}

export default function RichArticleEditor({
  content,
  onChange,
  onImageUploaded,
}: RichArticleEditorProps) {
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [uploading, setUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to insert tags around selected text or at cursor
  const insertFormatting = (before: string, after: string = "", defaultText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || defaultText;
    const replacement = `${before}${selectedText}${after}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    onChange(newContent);

    // Reposition cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 10);
  };

  const handleLink = () => {
    const url = prompt("Enter the destination URL (e.g. https://...):");
    if (url) {
      insertFormatting(`<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-[#C7102E] underline">`, "</a>", "link text");
    }
  };

  const handleInsertImageFromPrompt = () => {
    const url = prompt("Enter the image URL:");
    if (url) {
      insertFormatting(`\n<figure class="my-6">\n  <img src="${url}" alt="Article illustration" class="w-full rounded-md shadow-sm" />\n  <figcaption class="text-xs text-gray-500 mt-1.5 italic text-center">Illustration</figcaption>\n</figure>\n`);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      // Insert image tag in content
      insertFormatting(`\n<figure class="my-6">\n  <img src="${data.url}" alt="${file.name}" class="w-full rounded-md shadow-sm" />\n  <figcaption class="text-xs text-gray-500 mt-1.5 italic text-center">Uploaded illustration</figcaption>\n</figure>\n`);

      if (onImageUploaded) {
        onImageUploaded(data.url);
      }
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-2xs">
      {/* Hidden file input for direct upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Toolbar & Mode Switcher */}
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap items-center justify-between gap-2">
        {/* Formatting Buttons */}
        <div className="flex items-center flex-wrap gap-1 text-gray-700">
          <button
            type="button"
            onClick={() => insertFormatting("<strong>", "</strong>", "bold text")}
            className="p-1.5 hover:bg-gray-200 rounded text-xs transition"
            title="Bold"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("<em>", "</em>", "italic text")}
            className="p-1.5 hover:bg-gray-200 rounded text-xs transition"
            title="Italic"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("<u>", "</u>", "underlined text")}
            className="p-1.5 hover:bg-gray-200 rounded text-xs transition"
            title="Underline"
          >
            <Underline className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-4 bg-gray-300 mx-1"></span>

          <button
            type="button"
            onClick={() => insertFormatting("\n<h2 class=\"text-xl font-bold font-serif text-[#111111] mt-6 mb-2\">", "</h2>\n", "Section Heading")}
            className="p-1.5 hover:bg-gray-200 rounded text-xs font-serif font-bold transition"
            title="Heading 2"
          >
            <Heading2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("\n<h3 class=\"text-lg font-bold font-serif text-[#111111] mt-4 mb-1.5\">", "</h3>\n", "Sub-section")}
            className="p-1.5 hover:bg-gray-200 rounded text-xs font-serif font-bold transition"
            title="Heading 3"
          >
            <Heading3 className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-4 bg-gray-300 mx-1"></span>

          <button
            type="button"
            onClick={() => insertFormatting("\n<blockquote class=\"border-l-4 border-[#C7102E] pl-4 my-4 italic text-gray-700\">\n  ", "\n</blockquote>\n", "Notable quote or pull-quote")}
            className="p-1.5 hover:bg-gray-200 rounded text-xs transition"
            title="Blockquote"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("\n<pre class=\"bg-gray-900 text-gray-100 p-4 rounded-md text-xs font-mono my-4 overflow-x-auto\"><code>", "</code></pre>\n", "// Code block")}
            className="p-1.5 hover:bg-gray-200 rounded text-xs transition"
            title="Code Block"
          >
            <Code className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-4 bg-gray-300 mx-1"></span>

          <button
            type="button"
            onClick={() => insertFormatting("\n<ul class=\"list-disc pl-5 my-3 space-y-1\">\n  <li>", "</li>\n</ul>\n", "Bullet point item")}
            className="p-1.5 hover:bg-gray-200 rounded text-xs transition"
            title="Bullet List"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("\n<ol class=\"list-decimal pl-5 my-3 space-y-1\">\n  <li>", "</li>\n</ol>\n", "Numbered step")}
            className="p-1.5 hover:bg-gray-200 rounded text-xs transition"
            title="Numbered List"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-4 bg-gray-300 mx-1"></span>

          <button
            type="button"
            onClick={handleLink}
            className="p-1.5 hover:bg-gray-200 rounded text-xs transition"
            title="Insert Hyperlink"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleInsertImageFromPrompt}
            className="p-1.5 hover:bg-gray-200 rounded text-xs transition"
            title="Insert Image URL"
          >
            <ImageIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded text-xs font-medium text-gray-700 transition"
            title="Upload Image File"
          >
            <Upload className="w-3 h-3 text-[#C7102E]" />
            <span>{uploading ? "Uploading..." : "Upload Pic"}</span>
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("\n<hr class=\"my-6 border-gray-200\" />\n")}
            className="p-1.5 hover:bg-gray-200 rounded text-xs transition"
            title="Horizontal Divider"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* View Mode Toggle & Metrics */}
        <div className="flex items-center gap-3">
          <div className="text-[11px] text-gray-400 font-mono hidden sm:block">
            {wordCount} words &bull; ~{readTime} min read
          </div>

          <div className="flex items-center bg-gray-200 p-0.5 rounded text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewMode("edit")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded transition ${
                viewMode === "edit" ? "bg-white text-gray-900 shadow-2xs" : "text-gray-600 hover:text-black"
              }`}
            >
              <Edit3 className="w-3 h-3" />
              <span>Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("preview")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded transition ${
                viewMode === "preview" ? "bg-white text-gray-900 shadow-2xs" : "text-gray-600 hover:text-black"
              }`}
            >
              <Eye className="w-3 h-3 text-[#C7102E]" />
              <span>Preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Editor Content Area */}
      {viewMode === "edit" ? (
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onChange(e.target.value)}
          rows={16}
          placeholder="Compose your article body here... Use formatting buttons above for rich headings, blockquotes, code blocks, lists, and images."
          className="w-full text-xs font-mono p-4 focus:outline-none bg-white text-gray-900 leading-relaxed resize-y"
        />
      ) : (
        <div className="p-6 bg-white min-h-[300px] overflow-y-auto max-h-[500px]">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-4 border-b pb-2">
            Live Reader View Preview
          </div>
          <div
            className="prose prose-sm max-w-none text-gray-900 leading-relaxed font-sans"
            dangerouslySetInnerHTML={{
              __html:
                content ||
                '<p class="text-gray-400 italic">No content yet. Switch to Editor mode to write.</p>',
            }}
          />
        </div>
      )}
    </div>
  );
}
