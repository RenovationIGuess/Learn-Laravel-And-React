import React, { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider'

const DefaultLayout = () => {
  const { user, token, notification, setUser, setToken } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data);
      })
  }, [])

  const onLogout = (e) => {
    e.preventDefault();

    axiosClient.post('/logout')
      .then(() => {
        setUser({});
        setToken(null);
      })
  }

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className='content'>
        <header>
          <div>
            Header
          </div>
          <div>
            {user.name}
            <a className='btn-logout' href="#" onClick={onLogout}>
              Logout
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>

      {notification && 
        <div className='notification'>
          {notification}
        </div>
      }
    </div>
  )
}

export default DefaultLayout