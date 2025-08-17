import { useState } from 'react';
import axios from 'axios';

export const useForm = (initialValues = {}) => {
  const [data, setDataState] = useState(initialValues);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  // Set single field or entire object
  const setData = (key, value) => {
    if (typeof key === 'string') {
      setDataState(prev => ({ ...prev, [key]: value }));
    } else if (typeof key === 'object') {
      setDataState(key);
    }
  };

  const reset = (fields) => {
    if (!fields) {
      setDataState(initialValues);
    } else {
      setDataState(prev => {
        const copy = { ...prev };
        fields.forEach(field => {
          copy[field] = initialValues[field] ?? '';
        });
        return copy;
      });
    }
    setErrors({});
  };

  const request = async (method, url, payload = {}) => {
    setProcessing(true);
    setErrors({});
    try {
      const res = await axios({ method, url, data: payload });
      return res.data;
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
      throw err;
    } finally {
      setProcessing(false);
    }
  };

  return {
    data,
    setData,
    reset,
    processing,
    errors,
    post: (url) => request('post', url, data),
    patch: (url) => request('patch', url, data),
    delete: (url) => request('delete', url, data),
    get: (url) => request('get', url),
  };
}

export const useFormData = (initialValues = {}) => {
  const [data, setDataState] = useState(initialValues);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  // Set single field or entire object
  const setData = (key, value) => {
    if (typeof key === 'string') {
      setDataState(prev => ({ ...prev, [key]: value }));
    } else if (typeof key === 'object') {
      setDataState(key);
    }
  };

  const reset = (fields) => {
    if (!fields) {
      setDataState(initialValues);
    } else {
      setDataState(prev => {
        const copy = { ...prev };
        fields.forEach(field => {
          copy[field] = initialValues[field] ?? '';
        });
        return copy;
      });
    }
    setErrors({});
  };

  // Convert data object to FormData
  const toFormData = (dataObj) => {
    const formData = new FormData();
    
    Object.keys(dataObj).forEach(key => {
      const value = dataObj[key];
      
      if (value === null || value === undefined) {
        return; // Skip null/undefined values
      }
      
      if (value instanceof File || value instanceof Blob) {
        // Handle file uploads
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        // Handle arrays
        value.forEach((item, index) => {
          if (item instanceof File || item instanceof Blob) {
            formData.append(`${key}[${index}]`, item);
          } else {
            formData.append(`${key}[${index}]`, String(item));
          }
        });
      } else if (typeof value === 'object') {
        // Handle nested objects
        Object.keys(value).forEach(nestedKey => {
          formData.append(`${key}[${nestedKey}]`, String(value[nestedKey]));
        });
      } else {
        // Handle primitive values
        formData.append(key, String(value));
      }
    });
    
    return formData;
  };

  const request = async (method, url, payload = {}) => {
    setProcessing(true);
    setErrors({});
    
    try {
      const formData = toFormData(payload);
      
      const res = await axios({
        method,
        url,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return res.data;
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
      throw err;
    } finally {
      setProcessing(false);
    }
  };

  const requestGet = async (url) => {
    setProcessing(true);
    setErrors({});
    
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
      throw err;
    } finally {
      setProcessing(false);
    }
  };

  return {
    data,
    setData,
    reset,
    processing,
    errors,
    toFormData: () => toFormData(data), // Utility method to get FormData
    post: (url) => request('post', url, data),
    patch: (url) => request('patch', url, data),
    put: (url) => request('put', url, data),
    delete: (url) => request('delete', url, data),
    get: (url) => requestGet(url),
  };
};