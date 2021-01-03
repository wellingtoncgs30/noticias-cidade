import Head from "next/head"
import "@fortawesome/fontawesome-free"
import Link from "next/link"

export default function Header() {
    return(
        <>
            <Head>
                <meta name="viewport" charSet="utf-8" lang="pt-BR" content="initial-scale=1.0, width=device-width"></meta>
                <title>Notícias cidade - Seu site de notícias</title>
                <link rel="icon" href="../../images/detalhe-topo.png"></link>
            </Head>
            <header className="header">
                <nav className="navbar navbar-expand">
                    <div className="container">
                        <a className="navbar-brand">
                            <img src="../../images/logo.png" alt="Logotipo do Notícias Brasil" id="logo"></img>
                        </a>
                        <div className="collapse navbar-collapse" id="navbar">
                            <ul className="navbar-nav ml-auto">
                                <Link href="/">
                                    <li className="nav-item">
                                        <a className="nav-link" id="first">Home</a>
                                    </li>
                                </Link>
                                <Link href="/brasil/">
                                    <li className="nav-item">
                                        <a className="nav-link">Brasil</a>
                                    </li>
                                </Link>
                                <Link href="/internacional/">
                                    <li className="nav-item">
                                        <a className="nav-link">Internacional</a>
                                    </li>
                                </Link>
                                <Link href="/economia/">
                                    <li className="nav-item">
                                        <a className="nav-link">Economia</a>
                                    </li>
                                </Link>
                                <Link href="/saude/">
                                    <li className="nav-item">
                                        <a className="nav-link">Saúde</a>
                                    </li>
                                </Link>
                                <Link href="/ciencia/">
                                    <li className="nav-item">
                                        <a className="nav-link">Ciência</a>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}