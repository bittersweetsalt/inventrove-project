import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { login } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

  const [formLoginData, setFormLoginData] = useState({
    email: '',
    password: '',    
  });

  const [formRegisterData, setFormRegisterData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    position: '',
    department: '',
    phone: '',
    hireDate: '',
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formLoginData),
    });
    console.log(res);

    if (res.ok) {
      const { token } = await res.json();
      // Store token and user info in context
      login({ token });
      // Optionally redirect to a dashboard or another page
    } else {
      const error = await res.json();
      alert(error.error);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setFormLoginData({ ...formLoginData, [name]: value });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setFormRegisterData({ ...formRegisterData, [name]: value });
  };

  const handleRegSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send form data to the register API using fetch
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formRegisterData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('User registered successfully!');
        console.log('Success:', data);
      } else {
        const errorData = await response.json();
        console.error('Error registering user:', errorData);
        alert('There was an error registering the user.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('There was a network error.');
    }
  };



  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <div>
            <label>Email:</label>
            <input type="email" name="email" value={formLoginData.email} onChange={handleLoginChange} required />
            </div>
        <div>
            <label>Password:</label>
            <input type="password" name="password" value={formLoginData.password} onChange={handleLoginChange} required />
        </div>
        <button type="submit">Login</button>
      </form>

      <div>
        <h1>Register</h1>
        <form onSubmit={handleRegSubmit}>
            <div>
            <label>Email:</label>
            <input type="email" name="email" value={formRegisterData.email} onChange={handleRegisterChange} required />
            </div>
            <div>
            <label>Password:</label>
            <input type="password" name="password" value={formRegisterData.password} onChange={handleRegisterChange} required />
            </div>
            <div>
            <label>First Name:</label>
            <input type="text" name="firstName" value={formRegisterData.firstName} onChange={handleRegisterChange} required />
            </div>
            <div>
            <label>Last Name:</label>
            <input type="text" name="lastName" value={formRegisterData.lastName} onChange={handleRegisterChange} required />
            </div>
            <div>
            <label>Position:</label>
            <input type="text" name="position" value={formRegisterData.position} onChange={handleRegisterChange} required />
            </div>
            <div>
            <label>Department:</label>
            <input type="text" name="department" value={formRegisterData.department} onChange={handleRegisterChange} required />
            </div>
            <div>
            <label>Phone:</label>
            <input type="text" name="phone" value={formRegisterData.phone} onChange={handleRegisterChange} />
            </div>
            <div>
            <label>Hire Date:</label>
            <input type="date" name="hireDate" value={formRegisterData.hireDate} onChange={handleRegisterChange} />
            </div>
            <button type="submit">Register</button>
        </form>
        </div>
    </div>
  );
}
