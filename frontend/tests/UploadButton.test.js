import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddInvoce from './AddInvoce';

test('uploading a file triggers the upload process', () => {
  render(<AddInvoce />);

  // Mock a file selection
  const file = new File(['file contents'], 'file.pdf', { type: 'application/pdf' });
  const input = screen.getByLabelText('Images');
  fireEvent.change(input, { target: { files: [file] } });

  // Click the upload button
  const uploadButton = screen.getByText('Upload');
  fireEvent.click(uploadButton);

  // Check if the upload was successful
  expect(screen.getByText('Successfully Uploaded')).toBeInTheDocument();
});
