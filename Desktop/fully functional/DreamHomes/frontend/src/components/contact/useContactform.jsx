import { useMemo, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 1) Prefer ENV in .env  ->  VITE_BACKEND_URL=http://localhost:5000
//    If you use a Vite dev proxy for /api, you can leave this empty.
const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

export default function useContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Single axios instance (baseURL optional; works with proxy too)
  const api = useMemo(
    () =>
      axios.create({
        baseURL: API_BASE || undefined, // if empty, relative '/api' will hit same-origin (proxy in dev)
        headers: { 'Content-Type': 'application/json' },
        timeout: 15000,
        withCredentials: false, // set true only if your API uses cookies
      }),
    []
  );

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      // If API_BASE is set -> hits `${API_BASE}/api/forms/submit`
      // If not set and you configured a dev proxy -> hits '/api/forms/submit' on same origin
      const url = '/api/forms/submit';
      const { data } = await api.post(url, formData);

      toast.success(data?.message || 'Form submitted successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      let msg = 'Submission failed';
      if (error?.response) {
        msg = error.response.data?.message || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error?.code === 'ERR_NETWORK') {
        msg = 'Network error: backend unreachable';
      }
      toast.error(msg);
      console.error('Form submit error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return { formData, errors, submitting, handleChange, handleSubmit };
}
