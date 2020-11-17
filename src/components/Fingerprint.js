import React, {useState, useEffect} from "react";
import FingerprintService from "../services/FingerprintService";

const Fingerprint = props => {
    const initFingerprintState = {
        id: '',
        serialNumber: '',
        name: '',
    };
    const [fingerprint, setFingerprint] = useState(initFingerprintState);
    const [message, setMessage] = useState("");

    const getFingerprint = id => {
        FingerprintService.get(id)
            .then(response => {
                setFingerprint(response.data);
            })
    };

    useEffect(() => {
        getFingerprint(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = e => {
        const {name, value} = e.target;
        setFingerprint({...fingerprint, [name]: value});
    };

    const updateFingerprint = () => {
        FingerprintService.update(fingerprint.id, fingerprint)
            .then(response => {
                setMessage("Bạn đã thay đổi thành công");
            });
    }

    const deleteFingerprint = () => {
        FingerprintService.remove(fingerprint.id)
            .then(response => {
                props.history.push("/fingerprint");
            })
    };
    return (
        <div>
            {fingerprint ? (
                <div className="edit-form">
                    <h4>Tutorial</h4>
                    <form>
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
                    </form>

                    <button className="badge badge-danger mr-2" onClick={deleteFingerprint}>
                        Xóa
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateFingerprint}>
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Fingerprint</p>
                </div>
            )}
        </div>
    );
};

export default Fingerprint;