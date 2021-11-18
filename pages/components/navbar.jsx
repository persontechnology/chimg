import Link from 'next/link'

export default function Navbar(){
    return(
        <>
        <div className="navbar navbar-expand-lg navbar-dark bg-indigo navbar-static shadow-none px-lg-0">
            <div className="d-flex flex-1 flex-wrap container-boxed">
            <div className="navbar-brand wmin-0 mr-lg-5 order-1 order-lg-0">
                <Link href="/">
                    <a className="d-inline-block">
                        <img src="/chimg.png" className="d-none d-sm-block" alt=""/>
                        <img src="/chimg.png" className="d-sm-none" alt=""/>
                    </a>
                </Link>
            </div>
            <div className="d-flex flex-1 order-0 order-lg-1">
                <ul className="navbar-nav flex-row">
                <li className="nav-item">
                    <a
                    href="#"
                    className="navbar-nav-link navbar-nav-link-toggler"
                    data-toggle="dropdown"
                    >
                    <span><strong>Transporte CHIMG</strong> control vehícular</span>
                    </a>
                </li>
                </ul>
            </div>
            <ul className="navbar-nav flex-row flex-1 justify-content-end align-items-center order-2">
                
                <li className="nav-item">
                    <a href="#" className="navbar-nav-link navbar-nav-link-toggler" data-toggle="dropdown">
                        <i className="icon-envelop" />
                    </a>
                </li>
                <li className="nav-item nav-item-dropdown-lg dropdown dropdown-user h-100">
                    <a
                        href="#"
                        className="navbar-nav-link navbar-nav-link-toggler d-inline-flex align-items-center h-100 dropdown-toggle"
                        data-toggle="dropdown"
                    >
                        <img src="/user.png" className="rounded-pill mr-lg-2" height="34" alt="" />
                        <span className="d-none d-lg-inline-block">admin@gmail.com</span>
                    </a>
                <div className="dropdown-menu dropdown-menu-right">
                    <a href="#" className="dropdown-item">
                    Perfil
                    </a>
                    <div className="dropdown-divider" />
                    <Link href="/api/logout">
                        <a  className="dropdown-item">
                        Salir
                        </a>
                    </Link>
                </div>
                </li>
            </ul>
            </div>
        </div>

        <div className="navbar navbar-expand navbar-light bg-primary px-lg-0 navbar-static">
            <div className="overflow-auto overflow-lg-visible scrollbar-hidden container-boxed flex-1">
            <ul className="navbar-nav navbar-nav-underline flex-row text-nowrap">
                <li className="nav-item">
                <Link href="/">
                    <a className="navbar-nav-link active">
                        Principal
                    </a>
                </Link>
                </li>
                
                <li className="nav-item">
                <Link href="/usuarios">
                    <a className="navbar-nav-link">
                        Usuarios
                    </a>
                </Link>
                </li>
                <li className="nav-item">
                    <a href="#" className="navbar-nav-link">
                        Choferes
                    </a>
                </li>
                
                <li className="nav-item">
                    <a href="#" className="navbar-nav-link">
                        Vehículos
                    </a>
                </li>

                <li className="nav-item">
                    <a href="#" className="navbar-nav-link">
                        Combustible
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="navbar-nav-link">
                        Entregas
                    </a>
                </li>
                
                <li className="nav-item">
                    <a href="#" className="navbar-nav-link">
                        Mantenimiento
                    </a>
                </li>

                <li className="nav-item">
                    <a href="#" className="navbar-nav-link">
                        Reportes
                    </a>
                </li>

                <li className="nav-item">
                    <a href="#" className="navbar-nav-link">
                        Mapa
                    </a>
                </li>
            </ul>
            </div>
        </div>
        </>
    )
}