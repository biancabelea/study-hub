import React, {useState, ChangeEvent, FormEvent} from 'react';
import './AddResource.css';
import {database, firestore, storage} from "../firebaseConfig";

interface FormFields {
    title?: string;
    description?: string;
    files?: File | null;
}

function AddResource() {
    const [formFields, setFormFields] = useState<FormFields>({
        title: '',
        description:'',
        files: null,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value});
    };

    const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files?.[0] || null;
        setFormFields({...formFields, files: files});
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const newResourceRef = await database.collection('resources').add({
                title: formFields.title,
                description: formFields.description
            });

            const fileId = newResourceRef.id;
            if (formFields.files) {
                const filesRef = storage.ref().child(`files/${fileId}`);
                await filesRef.put(formFields.files);
                const filesUrl = await filesRef.getDownloadURL();

                await newResourceRef.update({
                    filesUrl,
                });
            }
            console.log('Resource added successfully');
        } catch (error) {
            console.error('Error adding resource', error);
        }
    };

    return (
        <div className="body-resources">
            <form onSubmit={handleSubmit}>
                <div className="title">Add a resource</div>
                <div>
                    <label htmlFor="text">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formFields.title}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="text">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formFields.description}
                        onChange={handleChange}
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
        </div>
    );
}

export default AddResource;
