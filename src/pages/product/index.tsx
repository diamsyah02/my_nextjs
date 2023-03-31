import Head from "next/head";
import Navbar from "@/components/Navbar";
import { WebResponseEntity } from "@/Entities/WebResponse";
import { NextRequest, NextResponse } from "next/server";
import { fetchWrapper } from "@/Helpers/fetchWrapper";
import { KEY_COOKIE } from "@/Helpers/constant";

export const getServerSideProps = async ({req, res} : {req: NextRequest, res: NextResponse}) => {
    const cookie = req.cookies[KEY_COOKIE]
    if(cookie == undefined) {
        return {
            redirect: {
                permanent: true,
                destination: `/`,
            },
        };
    }
    const data: WebResponseEntity = await fetchWrapper.get('/product', req.cookies[KEY_COOKIE])
    if (data.statusCode !== 200) {
        return {
            redirect: {
                permanent: true,
                destination: `/`,
            },
        };
    }
    return {
        props: { data },
    };
}

export default function Product({ data } : { data: WebResponseEntity }) {
    return (
        <>
            <Head>
                <title>All Products</title>
            </Head>
            <main>
                <Navbar />
                <h1>Product</h1>
            </main>
        </>
    );
}
