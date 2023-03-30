import Head from "next/head";
import Navbar from "@/components/Navbar";
import { WebResponseEntity } from "@/Entities/WebResponse";

export async function getServerSideProps() {
    const result = await (
        await fetch(`http://localhost:3000/api/product`)
    ).json();
    if (result.statusCode !== 200) {
        return {
            redirect: {
                permanent: true,
                destination: `/`,
            },
        };
    }
    return {
        props: { data: result },
    };
}

export default function Product({ data }: { data: WebResponseEntity }) {
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
