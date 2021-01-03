import Link from "next/link"
import Layout from "../../components/Layout"
import client from "../../components/ApolloClient"
import style from "../../styles/SectionScience.module.css"
import graphql from "graphql-tag"

const news = graphql`
query MyQuery {
    posts(where: {categoryName: "Ciencia"}) {
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

export default function Index(props) {
    const { scienceNews } = props
    return(
        <Layout>
            <section id={style.sectionScience}>
                <div className="container">
                    <h1 className={style.title}>Notícias relacionadas a Ciência</h1>
                    <div className="row">
                        {scienceNews ? (
                            scienceNews.map(news => (        
                                <div className="col-6 col-sm-4 col-md-4">
                                    <div className="card mb-2" key={news.node.id}>
                                        <img src={news.node.featuredImage.node.sourceUrl} alt="Imagem da notícia" id={style.imageNews}></img>
                                        <div className="card-body">
                                            <p className={style.cardParagraph}>{news.node.content.slice(0, 60).replace(/(<([^>]+)>)/ig, "")}</p>
                                            <Link href={`/ciencia${news.node.uri}`}>
                                                <a>
                                                    <button className="btn btn-link btn-block" id={style.readMore}>Leia mais</button>
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

Index.getInitialProps = async function() {
    const scienceNews = await client.query({query: news})
    return {
        scienceNews: scienceNews.data.posts.edges
    }
}