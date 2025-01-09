import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex justify-between items-center">
      {/* Logo */}
      <div className="text-lg font-bold">
        <NavLink to="/" className="hover:text-blue-300">
          My React App
        </NavLink>
      </div>

      {/* Navigation Links */}
      <div className="space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive
            ? 'text-blue-300 font-semibold'
            : 'text-white hover:text-blue-300')}
        >
          Home
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
