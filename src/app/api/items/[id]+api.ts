import { deleteGroceryItem, setGroceryItemPurchased, updateGroceryItemQuantity } from "@/lib/server/db-actions"

export const PATCH = async (request:Request, {id}:{id:string}) => {
    try {
        const body = await request.json()
        const {quantity, purchased} = body
        const item = quantity ? await updateGroceryItemQuantity(id, quantity) : await setGroceryItemPurchased(id, purchased ?? true)
        if (!item) return Response.json({error:"Item not found"}, {status:404})
            return Response.json({item})
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to update item"
        return Response.json({error:message}, {status:500})
    }
}

export const DELETE = async (_request:Request, {id}:{id:string}) => {
    try {
        await deleteGroceryItem(id)
        return Response.json({ok:true})
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to delete item"
        return Response.json({error:message}, {status:500})
    }
}