import Layout from "../../components/Layout"
import client from "../../components/ApolloClient"
import style from "../../styles/SectionHealth.module.css"
import graphql from "graphql-tag"
import Link from "next/link"

const news = graphql`
query MyQuery {
    posts(where: {categoryName: "Saúde", orderby: {field: DATE, order: DESC}}) {
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

export default function Health(props) {
    const { healthNews } = props
    return(
        <Layout>
            <section id={style.sectionHealth}>
                <div className="container">
                    <h1 className={style.title}>Notícias relacionadas a Saúde</h1>
                    <div className="row">
                        {healthNews ? (
                            healthNews.map(news => (
                                <div className="col-6 col-sm-4 col-md-4">
                                    <div className="card mb-2" key={news.node.id}>
                                        <img src={news.node.featuredImage.node.sourceUrl} alt="Imagem da notícia" id={style.imageNews}></img>
                                        <div className="card-body">
                                            <p className={style.cardParagraph}>{news.node.content.slice(0, 60).replace(/(<([^>]+)>)/ig, "")}</p>
                                            <Link href={`/saude${news.node.uri}`}>
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

Health.getInitialProps = async function() {
    const healthNews = await client.query({query: news})
    return {
        healthNews: healthNews.data.posts.edges
    }
}