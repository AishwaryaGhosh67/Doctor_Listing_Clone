import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import styles from '../styles/AddDoctor.module.css';

export default function AddDoctor() {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    experience: '',
    location: '',
    rating: '',
  });

  const router = useRouter();

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/doctors', formData);
    router.push('/doctors');
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Add Doctor</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input className={styles.input} name="name" placeholder="Name" onChange={handleChange} required />
          <input className={styles.input} name="specialty" placeholder="Specialty" onChange={handleChange} required />
          <input className={styles.input} name="experience" type="number" placeholder="Experience (years)" onChange={handleChange} required />
          <input className={styles.input} name="location" placeholder="Location" onChange={handleChange} required />
          <input className={styles.input} name="rating" type="number" placeholder="Rating (0 - 5)" onChange={handleChange} step="0.1" min="0" max="5" required />
          <button className={styles.button} type="submit">Add Doctor</button>
        </form>
      </div>
    </div>
  );
}
