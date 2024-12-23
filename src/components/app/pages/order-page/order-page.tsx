import { useParams } from "react-router-dom";

export function OrderPage() {
    const { id } = useParams();
    
    return <div>Show order detail ID: {id}</div>;
}
