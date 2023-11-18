import React, {useState, ChangeEvent, FormEvent} from 'react';
import './ResourceLibrary.css';
import {database, firestore, storage} from "../firebaseConfig";

interface FormFields {
    text?: string;
    image?: File | null;
    files?: File | null;
}

function ResourceLibrary() {
    const [formFields, setFormFields] = useState<FormFields>({
        text: '',
        image: null,
        files: null,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value});
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormFields({...formFields, image: file});
    };

    const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files?.[0] || null;
        setFormFields({...formFields, files: files});
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const newResourceRef = await database.collection('resources').add({
                text: formFields.text,
                createdAt: firestore.FieldValue.serverTimestamp(),
            });

            const imageId = newResourceRef.id;

            if (formFields.image) {
                const imageRef = storage.ref().child(`images/${imageId}`);
                await imageRef.put(formFields.image);
                const imageUrl = await imageRef.getDownloadURL();

                await newResourceRef.update({
                    imageUrl,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                });
            }

            const fileId = newResourceRef.id;
            if (formFields.files) {
                const filesRef = storage.ref().child(`files/${fileId}`);
                await filesRef.put(formFields.files);
                const filesUrl = await filesRef.getDownloadURL();

                await newResourceRef.update({
                    filesUrl,
                    createdAt: firestore.FieldValue.serverTimestamp(),
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
        </div>
    );
}

export default ResourceLibrary;
