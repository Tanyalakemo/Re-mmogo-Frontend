import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api";

function RegisterGroup() {
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [status, setStatus] = useState("active");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!groupName.trim()) {
      newErrors.groupName = "Group name is required";
    }

    if (!startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!status) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) {
      return;
    }

    const groupData = {
      group_name: groupName,
      start_date: startDate,
      status,
    };

    try {
      setLoading(true);
      await API.post("/groups", groupData);