// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import styles from './ContactStyles.module.css';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase'; // Assure-toi que le chemin est correct

function Contact() {
  // États pour stocker les données du formulaire
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const [success, setSuccess] = useState(false); // État pour message de confirmation
  const [error, setError] = useState(''); // État pour afficher un message d'erreur

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(''); // Réinitialise l'erreur à chaque soumission

    // Validation des champs
    if (!name || !email || !message) {
      setError("Tous les champs sont obligatoires !");
      setLoading(false);
      return;
    }

    try {
      // Envoi des données dans Firestore
      await addDoc(collection(db, 'contacts'), {
        name,
        email,
        message,
        timestamp: serverTimestamp(),
      });

      // Affichage du message de succès
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données:', error);
      setError('Une erreur est survenue, veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={styles.container}>
      <h1 className="sectionTitle">Contact</h1>

      {/* Message de succès */}
      {success && <p className={styles.successMessage}>✅ Message envoyé avec succès !</p>}

      {/* Message d'erreur */}
      {error && <p className={styles.errorMessage}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Votre nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            placeholder="Votre message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button className="hover btn" type="submit" disabled={loading}>
          {loading ? "Envoi en cours..." : "Envoyer"}
        </button>
      </form>
    </section>
  );
}

export default Contact;
