import React, {useState} from "react";
import FingerprintService from "../services/FingerprintService";

const AddFingerprint = () => {
    const initFingerprintState = {
        id: null,
        serialNumber: '',
        name: ''
    };
    const [fingerprint, setFingerprint] = useState(initFingerprintState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setFingerprint({...fingerprint, [name]: value});
    };

    const saveFingerprint = () => {
        let data = {
            serialNumber: fingerprint.serialNumber,
            name: fingerprint.name
        };
        FingerprintService.create(data)
            .then(response => {
                setFingerprint({
                    id: response.data.id,
                    serialNumber: response.data.serialNumber,
                    name: response.data.name,
                });
                setSubmitted(true);
            })
    };

    const newTutorial = () => {
        setFingerprint(initFingerprintState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newTutorial}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Serial Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="serialNumber"
                            name="serialNumber"
                            value={fingerprint.serialNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Tên</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={fingerprint.name}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button onClick={saveFingerprint} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddFingerprint;
