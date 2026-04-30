import React from 'react';
import MultimediaLayout from '@/Layouts/multimedialayout'; // Adjust path if needed
import { useForm } from '@inertiajs/react';

const Upload = () => {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: 'Graphic',
        multimedia_file: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/upload-asset', {
            forceFormData: true,
        });
    };

    return (
        <MultimediaLayout>
            <div className="upload-container">
                <h1>Upload to Selangor Portal</h1>
                <form onSubmit={submit}>
                    <input
                        type="text"
                        value={data.title}
                        onChange={e => setData('title', e.target.value)}
                        placeholder="Asset Title"
                        style={{
                            color: '#000000',           // Forces text to be Black
                            backgroundColor: '#ffffff', // Forces background to be White
                            border: '1px solid #ccc',   // Visible border
                            width: '100%',
                            padding: '10px',
                            marginBottom: '15px',
                            display: 'block'
                        }}
                    />
                    {errors.title && <div>{errors.title}</div>}

                    <select
                        value={data.category}
                            onChange={e => setData('category', e.target.value)}
                            style={{
                                color: '#000000',
                                backgroundColor: '#ffffff',
                                border: '1px solid #ccc',
                                width: '100%',
                                padding: '10px',
                                marginBottom: '15px',
                                display: 'block'
                        }}
                    >
                        <option value="Graphic">Graphic</option>
                        <option value="Video">Video</option>
                    </select>

                    <input
                        type="file"
                        onChange={e => setData('multimedia_file', e.target.files[0])}
                    />
                    {errors.multimedia_file && <div>{errors.multimedia_file}</div>}

                    <button type="submit" disabled={processing}>
                        Submit for Approval
                    </button>
                </form>
            </div>
        </MultimediaLayout>
    );
};

export default Upload;
