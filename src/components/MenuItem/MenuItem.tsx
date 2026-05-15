import type { FC, ReactNode } from "react"
import "./MenuItem.css"
import { Link } from "react-router-dom"

interface MenuItemProps {
    title: string,
    link: string,
    active?: "active" | "",
    icon?: ReactNode
    onClick?: () => void
}

export const MenuItem: FC<MenuItemProps> = ({title, link, active, icon, onClick}) => {
    return(
        <li className={`menu-item ${active}`}>
            {icon && (icon)}
            <Link className="menu-item__link" to={link} onClick={onClick}>{title}</Link>
        </li>
    )
} 