import styles from '../styles/Doctors.module.css';

const DoctorCard = ({ doctor }) => {
  return (
    <div className={styles.card}>
      <h3>{doctor.name}</h3>
      <p><strong>Specialty:</strong> {doctor.specialty}</p>
      <p><strong>Experience:</strong> {doctor.experience} years</p>
      <p><strong>Location:</strong> {doctor.location}</p>
      <p><strong>Rating:</strong> {doctor.rating} ⭐</p>
      <button className={styles.consultButton}>Consult</button>
    </div>
  );
};

export default DoctorCard;
