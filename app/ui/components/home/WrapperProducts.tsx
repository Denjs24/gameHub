// import { Suspense } from "react";
import { Table } from "./Table";

export default function WrapperProducts(props: {page: string, sort: string, itemsPerPage: string}) {

    return (
        <>
            <Table page={props?.page || '1'} sort={props?.sort || ''} itemsPerPage={props?.itemsPerPage || '20'} />
        </>
    )
}