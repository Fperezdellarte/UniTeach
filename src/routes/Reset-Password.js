import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../auth/constans';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { token } = useParams(); // Recupera el token de la URL
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/users/reset-password`, { password, token });
            setMessage('Contraseña restablecida con éxito. Redirigiendo...');
            setTimeout(() => navigate('/login'), 3000); // Redirige después de 3 segundos
        } catch (error) {
            setMessage('Error al restablecer contraseña: ' + error.response?.data?.message || 'Error desconocido');
        }
    };

    return (
        <div>
            <h1>Restablece tu contraseña</h1>
            <form onSubmit={handleSubmit}>
                <label>Nueva contraseña</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <label>Confirmar contraseña</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <button type="submit">Enviar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;
