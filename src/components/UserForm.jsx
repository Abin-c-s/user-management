import { useEffect, useState } from "react";
import { calculateAge } from "../utils/AgeCalculation";
import Dialog from "./Dialog";

function UserForm({ addUser, updateUser, editingUser }) {
    // Country and State Data
    const countryData = {
        India: ["Kerala", "Tamil Nadu", "Karnataka"],
        USA: ["California", "Texas", "Florida"],
        Canada: ["Ontario", "Quebec", "Alberta"],
    };

    // Department List
    const departmentsList = [
        "General Medicine",
        "Dental",
        "Orthopedic",
        "Ophthalmology",
    ];

    // Initial Form State
    const initialForm = {
        id: "",
        firstName: "",
        lastName: "",
        dob: "",
        age: "",
        phone: "",
        email: "",
        gender: "",
        address: "",
        country: "",
        state: "",
        departments: [],
    };

    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState({});

    const [showDialog, setShowDialog] = useState(false);

    // Populate form when editing
    useEffect(() => {
        if (editingUser) {
            setFormData(editingUser);
            setErrors({});
        } else {
            setFormData(initialForm);
            setErrors({});
        }
    }, [editingUser]);

    // Handle all input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Phone Number
        if (name === "phone") {
            // Check if the value is not a number or contains a space
            if (isNaN(value) || value.includes(" ")) {
                return;
            }

            const phone = value.slice(0, 10);

            setFormData({
                ...formData,
                phone,
            });

            return;
        }

        // Date of Birth
        if (name === "dob") {
            setFormData({
                ...formData,
                dob: value,
                age: calculateAge(value),
            });

            return;
        }

        // Country Change
        if (name === "country") {
            setFormData({
                ...formData,
                country: value,
                state: "",
            });

            return;
        }

        // Normal Inputs
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Department Selection
    const handleDepartmentChange = (department) => {
        const selectedDepartments = [...formData.departments];

        if (selectedDepartments.includes(department)) {
            const updatedDepartments = selectedDepartments.filter(
                (item) => item !== department
            );

            setFormData({
                ...formData,
                departments: updatedDepartments,
            });
        } else {
            setFormData({
                ...formData,
                departments: [...selectedDepartments, department],
            });
        }
    };
    // Validate Form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First Name is required";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last Name is required";
        }

        if (!formData.dob) {
            newErrors.dob = "Date of Birth is required";
        }

        if (!formData.age) {
            newErrors.age = "Age is required";
        }

        if (!formData.gender) {
            newErrors.gender = "Gender is required";
        }

        if (formData.phone && formData.phone.length !== 10) {
            newErrors.phone = "Phone number must be 10 digits";
        }

        if (formData.email) {
            const hasAtSymbol = formData.email.includes("@");
            const hasDot = formData.email.includes(".");
            if (!hasAtSymbol || !hasDot) {
                newErrors.email = "Enter a valid email";
            }
        }

        if (!formData.country) {
            newErrors.country = "Country is required";
        }

        if (!formData.state) {
            newErrors.state = "State is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Save Button Click
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setShowDialog(true);
    };

    // Reset Form
    const resetForm = () => {
        setFormData(initialForm);
        setErrors({});
    };

    // Save or Update User
    const saveUser = () => {
        if (editingUser) {
            updateUser(formData);
        } else {
            const newUser = {
                ...formData,
                id: "USR" + Math.floor(10000 + Math.random() * 90000),
            };

            addUser(newUser);
        }

        resetForm();
        setShowDialog(false);
    };

    // Close Confirmation Dialog
    const closeDialog = () => {
        setShowDialog(false);
    };
    return (
        <>
            <div className="card">
                <h2>{editingUser ? "Update User" : "User Registration Form"}</h2>

                <form onSubmit={handleSubmit}>

                    {/* First Name & Last Name */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>First Name *</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && (
                                <small className="error">{errors.firstName}</small>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Last Name *</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName && (
                                <small className="error">{errors.lastName}</small>
                            )}
                        </div>
                    </div>

                    {/* DOB & Age */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Date of Birth *</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                            />
                            {errors.dob && (
                                <small className="error">{errors.dob}</small>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Age *</label>
                            <input
                                type="text"
                                name="age"
                                value={formData.age}
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Phone & Email */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                maxLength={10}
                            />
                            {errors.phone && (
                                <small className="error">{errors.phone}</small>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && (
                                <small className="error">{errors.email}</small>
                            )}
                        </div>
                    </div>

                    {/* Gender */}
                    <div className="form-group">
                        <label>Gender *</label>

                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={formData.gender === "Male"}
                                    onChange={handleChange}
                                />
                                Male
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={formData.gender === "Female"}
                                    onChange={handleChange}
                                />
                                Female
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Other"
                                    checked={formData.gender === "Other"}
                                    onChange={handleChange}
                                />
                                Other
                            </label>
                        </div>

                        {errors.gender && (
                            <small className="error">{errors.gender}</small>
                        )}
                    </div>

                    {/* Address */}
                    <div className="form-group">
                        <label>Address</label>

                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Country & State */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Country *</label>

                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                            >
                                <option value="">Select Country</option>

                                {Object.keys(countryData).map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>

                            {errors.country && (
                                <small className="error">{errors.country}</small>
                            )}
                        </div>

                        <div className="form-group">
                            <label>State *</label>

                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                            >
                                <option value="">Select State</option>

                                {formData.country &&
                                    countryData[formData.country].map((state) => (
                                        <option key={state} value={state}>
                                            {state}
                                        </option>
                                    ))}
                            </select>

                            {errors.state && (
                                <small className="error">{errors.state}</small>
                            )}
                        </div>
                    </div>

                    {/* Departments */}
                    <div className="form-group">
                        <label>Departments</label>

                        <div className="checkbox-group">
                            {departmentsList.map((department) => (
                                <label key={department}>
                                    <input
                                        type="checkbox"
                                        checked={formData.departments.includes(department)}
                                        onChange={() =>
                                            handleDepartmentChange(department)
                                        }
                                    />
                                    {department}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button className="btn" type="submit">
                        {editingUser ? "Update User" : "Save User"}
                    </button>

                </form>
            </div>

            <Dialog
                isOpen={showDialog}
                title={editingUser ? "Update User" : "Save User"}
                message={
                    editingUser
                        ? "Are you sure you want to update this user?"
                        : "Are you sure you want to save this user?"
                }
                onConfirm={saveUser}
                onCancel={closeDialog}
            />
        </>
    );
}

export default UserForm;
