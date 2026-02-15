
import React, { useRef, useState } from 'react';
import { Upload, FileText, Image as ImageIcon, X } from 'lucide-react';
import { FileData } from '../types';
import { fileToBase64, pdfToImage } from '../utils/fileHelpers';

interface Props {
  onFileSelect: (data: FileData) => void;
}

export const FileUploader: React.FC<Props> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    setLoading(true);
    try {
      let fileData: FileData;

      if (file.type === 'application/pdf') {
        // Convert first page of PDF to image for visual analysis
        const imageBase64 = await pdfToImage(file);
        fileData = {
          base64: imageBase64,
          mimeType: 'image/jpeg',
          name: file.name
        };
      } else if (file.type.startsWith('image/')) {
        const base64 = await fileToBase64(file);
        fileData = {
          base64,
          mimeType: file.type,
          name: file.name
        };
      } else {
        alert('Please upload a valid PDF or Image file.');
        return;
      }

      onFileSelect(fileData);
    } catch (error) {
      console.error('File processing error:', error);
      alert('Error processing file. Please try a different one.');
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="w-full">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center transition-all cursor-pointer
          ${isDragging ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-300 hover:border-indigo-400 bg-white shadow-sm'}
          ${loading ? 'opacity-50 pointer-events-none' : ''}
        `}
        onClick={() => inputRef.current?.click()}
      >
        <input
          type="file"
          ref={inputRef}
          onChange={handleChange}
          accept="image/*,application/pdf"
          className="hidden"
        />

        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 text-indigo-600">
          <Upload size={32} />
        </div>

        <h3 className="text-xl font-semibold mb-2">Upload Social Content</h3>
        <p className="text-slate-500 text-center mb-6 max-w-xs">
          Drag and drop your images or PDFs, or click to browse files
        </p>

        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
            <ImageIcon size={14} /> IMAGE
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
            <FileText size={14} /> PDF
          </div>
        </div>

        {loading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-2xl">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      <p className="mt-4 text-xs text-center text-slate-400 uppercase tracking-widest font-semibold">
        Max file size: 10MB
      </p>
    </div>
  );
};
