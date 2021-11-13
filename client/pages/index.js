import Head from "next/head";
import PostCreate from "../components/PostCreate";
import PostList from "../components/PostList";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Simple Blog app</title>
        <meta name="description" content="A simple blog app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <PostCreate />
        <hr />
        <PostList />
      </main>
    </div>
  );
}
