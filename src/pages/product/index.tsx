import Head from "next/head";
import Navbar from "@/components/Navbar";
import { WebResponseEntity } from "@/Entities/WebResponse";
import { NextRequest, NextResponse } from "next/server";
import { fetchWrapper } from "@/Helpers/fetchWrapper";

export const getServerSideProps = async ({req, res} : {req: NextRequest, res: NextResponse}) => {
    const data: WebResponseEntity = await fetchWrapper.get('/product', req.cookies.nextjs_asyncawait)
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
