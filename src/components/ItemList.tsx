import { Hadist } from "@/Entities/Hadist"

const ItemList = ({ data } : { data: Hadist }) => {
    return (
        <>
            <div style={{ padding: 10, border: 2, borderColor: '#252525', borderRadius: 10 }}>
                <p>{data?.arabic}</p>
                <p>{data.terjemahan}</p>
            </div>
            <hr />
        </>
    )
}

export default ItemList