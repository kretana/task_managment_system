import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Attachment {
    id: string;
    filename: string;
    url: string;
}

interface AttachmentsSectionProps {
    attachments: Attachment[];
    addAttachments: (newAttachments: Attachment[]) => void;
}

const AttachmentsSection: React.FC<AttachmentsSectionProps> = ({ attachments, addAttachments }) => {
    const [newFiles, setNewFiles] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setNewFiles(Array.from(e.target.files));
        }
    };

    useEffect(() => {
        if (newFiles.length > 0) {
            const newFileObjs = newFiles.map(file => ({
                id: uuidv4(),
                filename: file.name,
                url: URL.createObjectURL(file)
            }));

                addAttachments([...attachments, ...newFileObjs]);
        }
    }, [newFiles]);

    const handleDelete = (id: string) => {
        const updatedAttachments = attachments.filter(attachment => attachment.id !== id);
        addAttachments(updatedAttachments);
    };

    return (
        <div className="mb-4">
            <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded"
                multiple
            />
            <div className="mt-4">
                <ul>
                    {attachments?.map((attachment) => (
                        <li key={attachment.id} className="flex items-center justify-between mb-2">
                            <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                {attachment.filename}
                            </a>
                            <button
                                onClick={() => handleDelete(attachment.id)}
                                className="ml-2 bg-red-500 text-white px-2 py-1 rounded text-sm"
                            >
                                Delete attachment
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AttachmentsSection;