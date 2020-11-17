import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FingerprintService from "../services/FingerprintService";

const FingerprintsList = () => {
    const [fingerprints, setFingerprints] = useState([]);
    const [fingerprint, setFingerprint] = useState("");
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchId, setSearchId] = useState("");

    useEffect(() => {
        retrieveTutorials();
    }, []);

    const onChangeSearchId = e => {
        const searchId = e.target.value;
        setSearchId(searchId);
    };

    const retrieveTutorials = () => {
        FingerprintService.getAll()
            .then(response => {
                setFingerprints(response.data);
            })
    };

    const refreshList = () => {
        retrieveTutorials();
        setFingerprint(null);
        setCurrentIndex(-1);
    };

    const setActiveTutorial = (tutorial, index) => {
        setFingerprint(tutorial);
        setCurrentIndex(index);
    };

    const removeAllFingerprints = () => {
        FingerprintService.removeAll()
            .then(response => {
                refreshList();
            })
    };

    const findById = () => {
        FingerprintService.findById(searchId)
            .then(response => {
                setFingerprints(response.data);
            })
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tìm kiếm theo id"
                        value={searchId}
                        onChange={onChangeSearchId}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findById}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Danh sách các máy chấm công</h4>

                <ul className="list-group">
                    {fingerprints &&
                    fingerprints.map((fingerprint, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveTutorial(fingerprint, index)}
                            key={index}
                        >
                            {fingerprint.serialNumber}
                        </li>
                    ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllFingerprints}>
                    Xóa
                </button>

                <button className="m-3 btn btn-sm btn-danger">
                    <a href={"/add"}>Thêm mới</a>
                </button>

            </div>
            <div className="col-md-6">
                {fingerprint ? (
                    <div>
                        <h4>Name</h4>
                        <div>
                            <label>
                                <strong>Số serial:</strong>
                            </label>{" "}
                            {fingerprint.serialNumber}
                        </div>
                        <div>
                            <label>
                                <strong>Tên máy:</strong>
                            </label>{"  "}
                            {fingerprint.name}
                        </div>
                        <Link
                            to={"/fingerprint/" + fingerprint.id}
                            className="badge badge-warning"
                        >
                            Sửa
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please click to continue...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FingerprintsList;
