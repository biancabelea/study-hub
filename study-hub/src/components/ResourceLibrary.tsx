import React, {useState, ChangeEvent, FormEvent} from 'react';
import './ResourceLibrary.css';

interface FormFields {
    text?: string;
    image?: File | null;
    files?: File | null;
}

function ResourceLibrary () {
    const [formFields, setFormFields] = useState<FormFields>({
        text: '',
        image: null,
        files: null,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormFields({ ...formFields, image: file });
    };

    const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files?.[0] || null;
        setFormFields({ ...formFields, files: files });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formFields);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="title">Add a resource</div>
            <div>
                <label htmlFor="text">Text:</label>
                <input
                    type="text"
                    id="text"
                    name="text"
                    value={formFields.text}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="image">Image:</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>

            <div>
                <label htmlFor="files">Files:</label>
                <input
                    type="file"
                    id="files"
                    name="files"
                    multiple
                    onChange={handleFilesChange}
                />
            </div>

            <button type="submit">Submit</button>
        </form>
    );
}

export default ResourceLibrary;
