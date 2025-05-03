import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import DoctorCard from '../components/DoctorCard';
import styles from '../styles/Doctors.module.css';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    specialty: '',
    location: '',
    search: ''
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/doctors', {
          params: { page, ...filters }
        });

        console.log('API response:', response.data); // helpful for debugging

        // Handle both array and object-shaped responses
        const fetchedDoctors = Array.isArray(response.data)
          ? response.data
          : response.data.doctors;

        setDoctors(fetchedDoctors || []);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
        setDoctors([]); // fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [page, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Doctor Listing</h1>

        <div className={styles.filters}>
          <input
            type="text"
            name="search"
            placeholder="Search by name..."
            onChange={handleSearch}
            value={filters.search}
          />
          <input
            type="text"
            name="specialty"
            placeholder="Specialty"
            onChange={handleFilterChange}
            value={filters.specialty}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleFilterChange}
            value={filters.location}
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.doctorList}>
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))
            ) : (
              <p>No doctors found.</p>
            )}
          </div>
        )}

        <div className={styles.pagination}>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page}</span>
          <button onClick={() => setPage(page + 1)} disabled={doctors.length === 0}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
