import { Layout, Pagination, Table, Modal, } from '@/components'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Layout>
      <Table/>
      <Pagination/>
      <Modal/>
    </Layout>
  )
}
