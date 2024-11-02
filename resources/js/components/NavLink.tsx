import React from 'react'

function NavLink({children,path = "#", isActive = false}: {children:React.ReactNode, isActive: boolean, path:string}) {
  return (
    <li className='hidden md:block'>
        <a href={path} className={`p-2 ${isActive ? "text-orange": "text-white hover:border-b-2 hover:border-orange"}`}>
            {children}
        </a>
    </li>
  )
}

export default NavLink
