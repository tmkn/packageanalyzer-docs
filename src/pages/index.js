import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className={styles.badgeContainer}>
          <Badge img="https://img.shields.io/npm/v/@tmkn/packageanalyzer" link="https://www.npmjs.com/package/@tmkn/packageanalyzer" />
          <Badge img="https://codecov.io/gh/tmkn/packageanalyzer/branch/master/graph/badge.svg" link="https://codecov.io/gh/tmkn/packageanalyzer" />
          <Badge img="https://sonarcloud.io/api/project_badges/measure?project=tmkn_packageanalyzer&metric=sqale_rating" link="https://sonarcloud.io/dashboard?id=tmkn_packageanalyzer" />
          <Badge img="https://sonarcloud.io/api/project_badges/measure?project=tmkn_packageanalyzer&metric=sqale_index" link="ttps://sonarcloud.io/dashboard?id=tmkn_packageanalyzer" />
        </p>
        <img class={styles.heroimg} src={'./img/hero.png'} />
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Documentation
          </Link>
        </div>
      </div>
    </header>
  );
}

function Badge({img, link}) {
  return <a href={link} target="_blank"><img src={img} /></a>
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} Documentation`}
      description="packageanalyzer documentation">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
