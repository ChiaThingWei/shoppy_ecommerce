export const logout = () => {
    localStorage.removeItem('token');
    // 如果你使用 cookie 保存，也清除：
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/login'; // 或 useNavigate('/login') if in React Router
    alert('Log out successfully')
  };