import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import cloudinaryUpload from '../utils/cloudinaryUpload';

export const useImageUploader = () => {
  const [files, setFiles] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

  const onDrop = useCallback(async acceptedFiles => {
    const url = await cloudinaryUpload(acceptedFiles[0]);
    setImageUrl(url);
    setFiles(
      acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files, imageUrl],
  );

  return {
    files,
    setFiles,
    imageUrl,
    getRootProps,
    getInputProps,
  };
};
