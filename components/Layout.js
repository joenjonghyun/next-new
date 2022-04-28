import style from "@/styles/Layout.module.css";
import {Nav, Footer, Header, Table, Pagination, Modal} from "@/components";
export function Layout({children}) {
    return (
        <div className={style.container}>
            <main className={style.main}>{children}</main>
            {children}
            <Table/>
            <Pagination/>
            <Modal/>
        </div>

    );
}
