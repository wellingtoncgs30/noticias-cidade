import Layout from "../../components/Layout"
import client from "../../components/ApolloClient"
import style from "../../styles/SectionInternational.module.css"
import graphql from "graphql-tag"
import Link from "next/link"

const international = graphql`
query MyQuery {
    posts(where: {categoryName: "Internacional"}) {
      edges {
        node {
          databaseId
          id
          title
          date
          content
          uri
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`

export default function International(props) {
    const { internationalNews } = props
    return(
        <Layout>
            <section id={style.sectionInternational}>
                <div className="container">
                    <h1 className={style.title}>Notícias relacionadas a notícias internacionais</h1>
                    <div className="row">
                        {internationalNews ? (
                            internationalNews.map(news => (
                                <div className="col-6 col-sm-4 col-md-4">
                                    <div className="card mb-2" key={news.node.id}>
                                        <img src={news.node.featuredImage.node.sourceUrl} alt="Imagem da notícia" id={style.imageNews}></img>
                                        <div className="card-body">
                                            <p className={style.cardParagraph}>{news.node.content.slice(0, 60).replace(/(<([^>]+)>)/ig, "")}</p>
                                            <Link href={`/internacional${news.node.uri}`}>
                                                <a>
                                                    <button className="btn btn-block btn-link" id={style.readMore}>Leia mais</button>
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : ""}
                    </div>
                </div>
            </section>
        </Layout>
    )
}

International.getInitialProps = async function() {
    const internationalNews = await client.query({query: international})
    return {
        internationalNews: internationalNews.data.posts.edges
    }
}