const API_URL = import.meta.env.VITE_API_URL;

export async function login({ email, password }) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method:'POST', headers:{'Content-Type':'application/json'},
    body:JSON.stringify({email,password})
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error||'Login failed');
  return data;
}

export async function signup({ email, password }) {
  const res = await fetch(`${API_URL}/api/auth/signup`, {
    method:'POST', headers:{'Content-Type':'application/json'},
    body:JSON.stringify({email,password})
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error||'Signup failed');
  return data;
}
